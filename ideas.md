# Mars Image Analysis Tool — Design Directions

## Three Directions Considered

### 1. Terrain Signal Desk
**Very Brief Intro:** A field-science instrument panel inspired by rover operations, rendered with layered mineral-paper surfaces and rust-red scientific annotation. It makes image analysis feel like a deliberate act of reading a landscape rather than pressing a generic dashboard button.

**Probability:** 0.031

### 2. Orbital Index
**Very Brief Intro:** A clean archive interface with pale spacecraft-paper backgrounds, orbital geometry, and editorial image plates. It would feel like a museum collection system for planetary evidence.

**Probability:** 0.076

### 3. Basalt Night Lab
**Very Brief Intro:** A high-contrast exploration console on near-black basalt with luminous green and red detection traces. It would emphasize the machine-vision layer and make the imagery feel more cinematic.

**Probability:** 0.014

---

## Chosen Direction: Terrain Signal Desk

### Design Movement
**Contemporary scientific field journal** meets a carefully calibrated instrument panel. The visual language favors observation, material texture, and restrained scientific notation over generic software-dashboard tropes.

### Core Principles
1. **The image is evidence.** Photography remains the visual anchor, presented as an oversized field plate rather than a background decoration.
2. **Controls are legible instruments.** Sliders, thresholds, and layer toggles should look measured and deliberate, with immediate visual feedback.
3. **Annotations explain uncertainty.** Numbers and labels contextualize detections without overstating precision.
4. **Material restraint produces hierarchy.** Warm paper, charcoal ink, and mineral tones let the red edge overlay and green circle overlay become meaningful analytical signals.

### Color Philosophy
The base palette uses warm **regolith paper** to echo Martian dust and field notebooks. Charcoal provides the working contrast; a dark iron-red indicates Canny edges, while a signal green identifies Hough-circle candidates. Red and green are reserved primarily for detection layers, so they read as analytical marks rather than decoration.

### Layout Paradigm
An **asymmetric bench layout** replaces a conventional centered dashboard. The main image plate dominates the left two-thirds of the workspace; a narrow analytical control rail runs along the right. The top band carries the project’s statement and mission counters, while a lower evidence strip provides metrics and the method legend.

### Signature Elements
1. **Contour-line field marks:** thin, offset arcs and coordinate ticks quietly frame panels and headings.
2. **Analysis marks:** red edge swatches and green circular rings recur only where they signify visual-processing concepts.
3. **Specimen labels:** monospaced index lines, scale bars, and small field-note captions identify images and settings.

### Interaction Philosophy
Interactions should feel like manipulating a scientific instrument: controls respond directly and quickly, without theatrical effects. Uploading an image becomes a transition from empty specimen tray to live field plate. Toggling detection layers preserves the original imagery as the baseline evidence.

### Animation
Use subtle 160–240 ms transform-and-opacity transitions with a `cubic-bezier(0.23, 1, 0.32, 1)` exit curve. The image plate should fade and translate upward by 6 px on selection; layer toggles should crossfade their overlays; dashboard labels can stagger once on initial load. Avoid infinite motion, glows, and animated charts. Respect `prefers-reduced-motion` by removing non-essential transitions.

### Typography System
**DM Mono** is used for metrics, controls, labels, and file metadata, reinforcing the instrument-panel feel. **Fraunces** is used for the editorial display headline and section titles, bringing the human dimension of field science. Body copy uses a clear system sans stack for readable explanatory text. Headings are large but left-aligned; labels use uppercase tracking rather than oversized weight.

### Brand Essence
**A visual field desk for turning raw Mars imagery into inspectable computer-vision evidence, built for curious experimenters who want to see what the algorithms see.**

**Personality:** observant, grounded, exacting.

### Brand Voice
The voice is concise, observational, and transparent about uncertainty. Headlines should frame analysis as evidence gathering; microcopy should name a real visual action rather than making generic promises.

Example lines:

> Read the terrain, layer by layer.

> Candidate circles are signals to inspect, not confirmed craters.

### Wordmark & Logo
The mark is a **cropped crater ring intersected by three fine contour lines**, suggesting both a circular feature and a scanned landscape. The wordmark uses a custom, tightly tracked serif-and-mono pairing: `TERRAIN / SIGNAL` with the slash aligned to a small coordinate tick.

### Signature Brand Color
**Oxide Vermilion** — `#C84A2C` — serves as the ownable edge-detection and field-annotation color.
