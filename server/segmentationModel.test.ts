import { describe, expect, it } from "vitest";
import { classifyFeature, SEGMENTATION_MODEL, TERRAIN_CLASSES } from "./segmentationModel";

describe("segmentation prototype baseline", () => {
  it("exposes the four labelled AI4Mars terrain classes", () => {
    expect(TERRAIN_CLASSES.map(item => item.name)).toEqual(["soil", "bedrock", "sand", "big_rock"]);
  });

  it("classifies every learned prototype back to its grouped terrain class", () => {
    SEGMENTATION_MODEL.centroids.forEach((centroid, prototypeIndex) => {
      const feature = centroid.map((value, index) => value * SEGMENTATION_MODEL.featureScale[index] + SEGMENTATION_MODEL.featureMean[index]);
      expect(classifyFeature(feature[0], feature[1], feature[2], feature[3])).toBe(Math.floor(prototypeIndex / SEGMENTATION_MODEL.prototypesPerClass));
    });
  });

  it("records the expanded matched-pair provenance", () => {
    expect(SEGMENTATION_MODEL.trainingPairs).toBe(82);
    expect(SEGMENTATION_MODEL.featureNames).toEqual(["intensity", "gradient", "local_std", "curvature"]);
  });
});
