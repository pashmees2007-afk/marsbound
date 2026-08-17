# Evidence-First MARSBOUND Tasks

- [x] Simplify the entry screen into a restrained mission briefing and terrain acquisition interface.
- [x] Center the analysis view on the terrain image, intermediate OpenCV outputs, and computed risk map.
- [x] Present derived hazard, zone, and ranking data as scientific evidence rather than decorative dashboard metrics.
- [x] Elevate the landing recommendation as a compact mission decision with inspectable reasons and report data.
- [x] Retain verified sample data, preserve upload staging, and keep the demo flow explicit about backend limitations.
- [x] Verify the revised desktop and mobile workflow, then save a finished project checkpoint.

## AI4Mars Label Archive Review

- [x] Inventory the archive files, formats, and image-to-label relationships.
- [x] Quantify available terrain classes and annotation geometry relevant to rocks, craters, and safe-zone assessment.
- [x] Compare the label structure with MARSBOUND’s existing classical-vision evidence and risk-grid outputs.
- [x] Recommend immediate evidence-viewer integrations and a longer-term training/evaluation path.
- [x] Acquire matching source images and prepare an MSL-only merged-label seed for evaluation and baseline model development.

## AI4Mars MSL Source Acquisition

- [x] Verify the official merged AI4Mars archive contents, integrity guidance, and storage requirements.
- [x] Retrieve a direct matched MSL seed from the official merged archive without placing large data in the deployed web project.
- [x] Validate image-mask filename pairs and canonical MSL class indices in the retrieved seed.
- [x] Document the prepared subset and recommended backend integration path for MARSBOUND.
- [x] Defer expansion from the 49-pair MSL seed to the full 16,064-pair corpus until dedicated model training begins; the live backend does not require the full corpus.

## Labeled Terrain-Evidence Viewer

- [x] Select representative matched MSL terrain images and prepare colorized semantic-mask overlays.
- [x] Upload compact source, label, and overlay assets for deployment-safe web viewing.
- [x] Add a source/overlay/mask evidence viewer with terrain-class legend and pixel-level inspection.
- [x] Integrate the viewer into MARSBOUND’s evidence workflow without obscuring the existing OpenCV results.
- [x] Verify the viewer’s desktop and mobile controls, then save a project checkpoint.

## Segmentation Backend and Ground-Truth Comparison

- [x] Define the upload, inference, and prediction-versus-ground-truth result contract with clear model provenance.
- [x] Upgrade MARSBOUND for server-side uploads, API routes, and persistent analysis records.
- [x] Implement segmentation inference with a disclosed baseline method for arbitrary terrain uploads.
- [x] Compute class-level comparison metrics and confusion information for matched AI4Mars examples.
- [x] Add a prediction-versus-ground-truth interface with source, prediction, ground truth, and disagreement modes.
- [x] Validate the upload and comparison flows across desktop and mobile, then save a project checkpoint.
- [x] Verify the actual desktop UI upload-to-server-prediction path and persisted analysis result.
- [x] Verify mobile comparison controls and the updated upload workflow on the full-stack build.
- [x] Save the validated full-stack segmentation and comparison update as a project checkpoint.
- [x] Verify the actual mobile upload-to-server-prediction path on the full-stack build.
- [x] Save the verified full-stack segmentation and comparison update as a project checkpoint.
- [x] Save a final project checkpoint containing the verified backend, comparison interface, and responsive upload-flow validations.

## Semantic Segmentation Network

- [x] Confirm available training runtime and define an image-level train/validation/test split from matched MSL pairs.
- [x] Prepare normalized image-mask tensors with ignored unlabeled pixels and class-weighted loss.
- [x] Train a compact semantic segmentation network and save reproducible model artifacts.
- [x] Evaluate the network against the held-out test split and compare it with the prototype baseline.
- [x] Retain the selected evaluated baseline in server-side inference because the candidate did not improve held-out macro F1.
- [x] Verify trained-model evaluation artifacts and preserve the existing validated upload, prediction, comparison, and responsive UI flows.

## Rare-Hazard Segmentation Improvement

 - [x] Measure current big-rock, sand, bedrock, and soil coverage across the matched MSL seed and preserve an image-level held-out test split.
 - [x] Create high-resolution training patches that oversample labelled big-rock and sand regions while retaining regular terrain coverage.
 - [x] Train a class-balanced segmentation network with focal loss and terrain-preserving augmentation.
 - [x] Compare held-out macro F1 and per-class rare-hazard F1 against the original U-Net and server baseline.
 - [x] Promote a model only if it improves the held-out rare-hazard criteria; otherwise retain the current disclosed baseline.
 - [x] Document the experiment and update MARSBOUND only for a validated improvement.
