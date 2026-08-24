---
name: visualize
description: Turn concepts, systems, processes, code paths, hierarchies, and problem frames into standalone interactive visual explanations. Use when the user asks to visualize, diagram, map, or explain relationships visually. Use visual-plan instead when the requested artifact is specifically an implementation plan.
---

# Visualize

Make the relationships that answer the user's question visible at a glance.

## Understand before drawing

Inspect the information the user placed in scope. For code or repository questions, trace the relevant implementation, configuration, tests, and documentation far enough to identify the real actors, boundaries, calls, data, and events.

Do not invent relationships to make the diagram complete. Visually distinguish confirmed facts from inferred, proposed, or unresolved elements, and state the evidence still needed when uncertainty matters.

## Choose one visual grammar

Choose the grammar from the relationship the user needs to understand, not from the subject's domain:

- containment or ownership: system map;
- parent/child, calls, or dependencies: hierarchy;
- ordered work, branching, or data movement: flow;
- interactions over time: sequence;
- causes, effects, constraints, or problem framing: free-form causal map;
- alternatives or repeated attributes: compact comparison table or matrix;
- change over time: timeline.

Read [references/visual-grammars.md](references/visual-grammars.md) when selecting a grammar or composing the diagram model. Prefer one primary view. If the question genuinely requires two perspectives, use a clear overview plus one focused secondary region rather than combining every relationship into one graph.

## Create the visual artifact

Default to one standalone `.html` artifact that opens directly in a browser. Honor a user-requested output format when one is specified. Use the requested location, or create a descriptive `<subject>-visual.html` in the current workspace without overwriting an existing file.

Start from [assets/interactive-diagram.html](assets/interactive-diagram.html). Copy it to the output location and edit the `diagram-data` JSON block. Keep the rendering and navigation code unchanged unless the requested visual genuinely needs a capability it does not provide.

The template supports `flow`, `hierarchy`, `sequence`, and `map` layouts. Use `map` with explicit coordinates for architecture, causal framing, timelines, or other spatial arrangements. Keep the result self-contained: embed all data, CSS, JavaScript, and SVG; do not add project dependencies or network-loaded resources.

## Compose for visual understanding

Make the title state the question or conclusion the diagram answers. Keep labels brief, place detail inside the relevant node or annotation, and label connectors when their meaning is not obvious.

Aim for 5–12 primary elements in a view. Group larger subjects into named boundaries and expose an overview before local detail. Use position and containment for the main meaning; use color, line style, badges, and shape only as supporting signals. Never make meaning depend on color alone.

Remove decorative elements and prose that do not improve comprehension. Include a visible legend for semantic categories that are not self-explanatory.

## Verify and deliver

Open the artifact in an available browser and inspect the initial fit, hierarchy, label legibility, connector direction, grouping, and viewport resizing. Exercise panning, pointer-centered zoom, controls, and keyboard navigation. Check that the diagram answers the user's question without requiring a separate prose explanation.

If browser control is unavailable, validate the HTML and JSON source and disclose that the rendered layout was not visually verified. Return a link or path to the artifact and one short sentence explaining what the visual emphasizes and how to navigate it.
