/**
 * A disclosed nearest-prototype baseline trained on the directly retrieved 49-pair
 * AI4Mars MSL seed. It is intentionally transparent and is not a neural model.
 */
export const SEGMENTATION_MODEL = {
  version: "ai4mars-msl-prototype-v1",
  label: "Nearest-prototype intensity + gradient baseline",
  trainingPairs: 49,
  featureMean: [0.2456444501876831, 0.13642370700836182],
  featureScale: [0.10640028119087219, 0.1325310915708542],
  centroids: [
    [-0.03219208866357803, 0.025918403640389442],
    [0.2541062533855438, 0.08823058754205704],
    [0.157705157995224, -0.5244951248168945],
    [-0.9025041460990906, -0.11948280781507492],
  ],
} as const;

export const TERRAIN_CLASSES = [
  { id: 0, name: "soil", color: [183, 133, 84] },
  { id: 1, name: "bedrock", color: [104, 140, 180] },
  { id: 2, name: "sand", color: [221, 186, 77] },
  { id: 3, name: "big_rock", color: [217, 82, 65] },
] as const;

export function classifyFeature(intensity: number, gradient: number) {
  const normalized = [
    (intensity - SEGMENTATION_MODEL.featureMean[0]) / SEGMENTATION_MODEL.featureScale[0],
    (gradient - SEGMENTATION_MODEL.featureMean[1]) / SEGMENTATION_MODEL.featureScale[1],
  ];
  let bestClass = 0;
  let bestDistance = Number.POSITIVE_INFINITY;
  SEGMENTATION_MODEL.centroids.forEach((centroid, classId) => {
    const distance = (normalized[0] - centroid[0]) ** 2 + (normalized[1] - centroid[1]) ** 2;
    if (distance < bestDistance) {
      bestClass = classId;
      bestDistance = distance;
    }
  });
  return bestClass;
}

export function getClassColor(classId: number) {
  return TERRAIN_CLASSES[classId]?.color ?? [0, 0, 0];
}
