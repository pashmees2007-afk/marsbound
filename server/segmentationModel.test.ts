import { describe, expect, it } from "vitest";
import { classifyFeature, SEGMENTATION_MODEL, TERRAIN_CLASSES } from "./segmentationModel";

describe("segmentation prototype baseline", () => {
  it("exposes the four labelled AI4Mars terrain classes", () => {
    expect(TERRAIN_CLASSES.map(item => item.name)).toEqual(["soil", "bedrock", "sand", "big_rock"]);
  });

  it("classifies a centroid back to its own terrain class", () => {
    SEGMENTATION_MODEL.centroids.forEach((centroid, classId) => {
      const intensity = centroid[0] * SEGMENTATION_MODEL.featureScale[0] + SEGMENTATION_MODEL.featureMean[0];
      const gradient = centroid[1] * SEGMENTATION_MODEL.featureScale[1] + SEGMENTATION_MODEL.featureMean[1];
      expect(classifyFeature(intensity, gradient)).toBe(classId);
    });
  });
});
