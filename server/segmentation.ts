import crypto from "node:crypto";
import sharp from "sharp";
import { storagePut } from "./storage";
import { classifyFeature, getClassColor, SEGMENTATION_MODEL, TERRAIN_CLASSES } from "./segmentationModel";

export type SegmentationResult = {
  analysisId: string;
  model: typeof SEGMENTATION_MODEL;
  sourceUrl: string;
  predictionUrl: string;
  overlayUrl: string;
  width: number;
  height: number;
  classCounts: Array<{ classId: number; className: string; pixels: number; share: number }>;
  disclaimer: string;
};

const TARGET_SIZE = 256;

function parseDataUrl(dataUrl: string) {
  const match = /^data:(image\/(?:png|jpeg|webp));base64,([A-Za-z0-9+/=]+)$/.exec(dataUrl);
  if (!match) throw new Error("Use a PNG, JPG, or WEBP data URL.");
  return { mimeType: match[1], data: Buffer.from(match[2], "base64") };
}

export async function runSegmentation(dataUrl: string, filename: string): Promise<SegmentationResult> {
  const { data, mimeType } = parseDataUrl(dataUrl);
  const normalized = await sharp(data).rotate().resize(TARGET_SIZE, TARGET_SIZE, { fit: "cover" }).png().toBuffer();
  const { data: gray, info } = await sharp(normalized).grayscale().raw().toBuffer({ resolveWithObject: true });
  const squared = Buffer.alloc(gray.length);
  for (let index = 0; index < gray.length; index += 1) {
    const normalizedValue = gray[index] / 255;
    squared[index] = Math.round(normalizedValue * normalizedValue * 255);
  }
  const [blurred, blurredSquared] = await Promise.all([
    sharp(gray, { raw: { width: info.width, height: info.height, channels: 1 } }).blur(2).raw().toBuffer(),
    sharp(squared, { raw: { width: info.width, height: info.height, channels: 1 } }).blur(2).raw().toBuffer(),
  ]);
  const prediction = new Uint8Array(info.width * info.height);
  const rgb = Buffer.alloc(info.width * info.height * 3);
  const counts = [0, 0, 0, 0];
  for (let y = 0; y < info.height; y += 1) {
    for (let x = 0; x < info.width; x += 1) {
      const index = y * info.width + x;
      const center = gray[index] / 255;
      const left = gray[y * info.width + Math.max(0, x - 1)] / 255;
      const right = gray[y * info.width + Math.min(info.width - 1, x + 1)] / 255;
      const top = gray[Math.max(0, y - 1) * info.width + x] / 255;
      const bottom = gray[Math.min(info.height - 1, y + 1) * info.width + x] / 255;
      const gradient = Math.min(1, Math.hypot(right - left, bottom - top));
      const localMean = blurred[index] / 255;
      const localMeanSquare = blurredSquared[index] / 255;
      const localStd = Math.sqrt(Math.max(localMeanSquare - localMean * localMean, 0));
      const topLeft = gray[Math.max(0, y - 1) * info.width + Math.max(0, x - 1)] / 255;
      const topRight = gray[Math.max(0, y - 1) * info.width + Math.min(info.width - 1, x + 1)] / 255;
      const bottomLeft = gray[Math.min(info.height - 1, y + 1) * info.width + Math.max(0, x - 1)] / 255;
      const bottomRight = gray[Math.min(info.height - 1, y + 1) * info.width + Math.min(info.width - 1, x + 1)] / 255;
      const curvature = Math.min(1, Math.abs(2 * (topLeft + topRight + bottomLeft + bottomRight) - 8 * center));
      const classId = classifyFeature(center, gradient, localStd, curvature);
      prediction[index] = classId;
      counts[classId] += 1;
      const color = getClassColor(classId);
      rgb[index * 3] = color[0];
      rgb[index * 3 + 1] = color[1];
      rgb[index * 3 + 2] = color[2];
    }
  }
  const predictionPng = await sharp(rgb, { raw: { width: info.width, height: info.height, channels: 3 } }).png().toBuffer();
  const overlayPng = await sharp(normalized)
    .composite([{ input: predictionPng, blend: "screen" }])
    .png()
    .toBuffer();
  const analysisId = crypto.randomUUID();
  const cleanName = filename.replace(/[^A-Za-z0-9._-]/g, "_").slice(0, 96) || "terrain.png";
  const [source, predictionFile, overlay] = await Promise.all([
    storagePut(`segmentation/${analysisId}/source_${cleanName}`, normalized, mimeType),
    storagePut(`segmentation/${analysisId}/prediction.png`, predictionPng, "image/png"),
    storagePut(`segmentation/${analysisId}/overlay.png`, overlayPng, "image/png"),
  ]);
  const total = info.width * info.height;
  return {
    analysisId,
    model: SEGMENTATION_MODEL,
    sourceUrl: source.url,
    predictionUrl: predictionFile.url,
    overlayUrl: overlay.url,
    width: info.width,
    height: info.height,
    classCounts: TERRAIN_CLASSES.map(item => ({ classId: item.id, className: item.name, pixels: counts[item.id], share: Number((counts[item.id] / total).toFixed(4)) })),
    disclaimer: "This is a transparent multi-prototype classical baseline trained on 82 matched MSL image-label pairs. It is not flight-ready and should be interpreted alongside the visible evidence layers.",
  };
}
