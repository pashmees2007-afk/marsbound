/**
 * Transparent class-balanced multi-prototype terrain model trained on 538
 * matched AI4Mars MSL pairs. Centroids are compact float32 data grouped as
 * 24 prototypes for each of soil, bedrock, sand, and big rock.
 */
const CENTROID_BASE64 = [
  "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",
].join("");

function decodeCentroids(encoded: string) {
  const bytes = Buffer.from(encoded, "base64");
  const values = new Float32Array(bytes.buffer, bytes.byteOffset, bytes.byteLength / 4);
  return Array.from({ length: values.length / 4 }, (_, row) => Array.from(values.slice(row * 4, row * 4 + 4)));
}

export const SEGMENTATION_MODEL = {
  version: "ai4mars-msl-multiprototype-v3",
  label: "Large-corpus balanced multi-prototype intensity + gradient + texture baseline",
  trainingPairs: 538,
  featureNames: ["intensity", "gradient", "local_std", "curvature"],
  featureMean: [0.469021201133728, 0.06816772371530533, 0.04526861384510994, 0.20931150019168854],
  featureScale: [0.1468912959098816, 0.07857014238834381, 0.035068582743406296, 0.2521381378173828],
  prototypesPerClass: 24,
  centroids: decodeCentroids(CENTROID_BASE64),
} as const;

export const TERRAIN_CLASSES = [
  { id: 0, name: "soil", color: [183, 133, 84] },
  { id: 1, name: "bedrock", color: [104, 140, 180] },
  { id: 2, name: "sand", color: [221, 186, 77] },
  { id: 3, name: "big_rock", color: [217, 82, 65] },
] as const;

export function classifyFeature(intensity: number, gradient: number, localStd: number, curvature: number) {
  const input = [intensity, gradient, localStd, curvature];
  const normalized = input.map((value, index) => (value - SEGMENTATION_MODEL.featureMean[index]) / SEGMENTATION_MODEL.featureScale[index]);
  let bestPrototype = 0;
  let bestDistance = Number.POSITIVE_INFINITY;
  SEGMENTATION_MODEL.centroids.forEach((centroid, prototypeIndex) => {
    const distance = normalized.reduce((total, value, index) => total + (value - centroid[index]) ** 2, 0);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestPrototype = prototypeIndex;
    }
  });
  return Math.floor(bestPrototype / SEGMENTATION_MODEL.prototypesPerClass);
}

export function getClassColor(classId: number) {
  return TERRAIN_CLASSES[classId]?.color ?? [0, 0, 0];
}
