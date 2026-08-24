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

Make the title state the question or conclusion in the fewest words that preserve its meaning. Default to a short headline, omit the subtitle unless it adds a necessary scope or evidence boundary, and keep any subtitle to one compact clause. Use compact noun phrases for card titles, two or three phrase-like detail lines at most, and short verbs or payload names for connector labels. Preserve exact technical identifiers when they matter. Move nuance into a focused annotation or secondary view instead of making every card verbose.

Aim for 5–12 primary elements in a view. Group larger subjects into named boundaries and expose an overview before local detail. Use position and containment for the main meaning; use color, line style, badges, and shape only as supporting signals. Never make meaning depend on color alone.

Remove decorative elements and prose that do not improve comprehension. Include a visible legend for semantic categories that are not self-explanatory.

Treat layout safety as an invariant: cards must grow to fit their rendered content, connector gutters must reserve room for labels, connector labels must remain separate from paths and nodes, unrelated connectors must not cross cards, cycle or backward edges must use outside routing channels, and arrowheads must enter their target in the direction of travel. Reserve the title and subtitle region before placing diagram content. When groups surround one or more cards, calculate clearance from the groups' full envelopes, including padding and label space, rather than from card positions alone. Treat node `width` and `height` as minimums, not fixed boxes. Let the renderer measure text, expand cards and map spacing, try obstacle-aware connector routes, and choose path-relative label positions. For dense maps, use `maxWidth`, `mapGapX`, `mapGapY`, `route`, `labelPosition`, or `labelGap` when the automatic result still needs guidance; do not fix density by shrinking text. Use ARIA labels and descriptions for accessibility; do not add SVG `<title>` elements because browsers expose them as hover tooltips over the diagram.

## Verify and deliver

Open the artifact in an available browser and wait for `#diagram[data-layout-valid]` to become `true` or `false`. Treat any `pending` or `false` result as an unfinished artifact. For `false`, inspect every entry in `globalThis.visualizeLayoutReport.issues`, revise coordinates, routing, wording, or label controls, and recheck until it is `true`. Never deliver an artifact while the visible “Layout needs attention” warning is present. Do not hide, disable, or bypass the audit warning.

After the audit passes, inspect the initial fit, hierarchy, label legibility, connector direction, grouping, and viewport resizing. Exercise panning, pointer-centered zoom, controls, and keyboard navigation. Check that the diagram answers the user's question without requiring a separate prose explanation.

If browser control is unavailable, validate the HTML and JSON source and preserve the embedded runtime audit, but do not claim the visual is complete or visually verified. Disclose that the rendered audit result was not observed and ask the user to open the artifact; if it reports layout failure, continue iterating from the reported issues before treating it as delivered. Return a link or path to the artifact and one short sentence explaining what the visual emphasizes and how to navigate it.
