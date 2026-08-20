---
name: visual-plan
description: Create a codebase-grounded implementation plan as a standalone interactive HTML diagram with a free-form canvas, panning, and zooming. Use when the user asks to visualize, map, or explain a proposed development change, architecture, workflow, dependency chain, data flow, or rollout before implementation.
---

# Visual Plan

Make the structure and sequence of a development change explorable before implementation.

## Investigate first

Inspect applicable repository instructions, relevant code, tests, configuration, documentation, and version-control state. Identify the components, boundaries, actors, data, and events that actually participate in the proposed change.

Treat the product code as read-only unless the user also asks for implementation. Creating a requested plan artifact is allowed. Distinguish confirmed repository facts from assumptions and proposed additions.

## Produce an interactive diagram

Always create one standalone `.html` artifact that opens directly in a browser. Do not offer or ask the user to choose an output format. Use their requested location or a sensible repository location when none is specified.

Start from [assets/interactive-plan.html](assets/interactive-plan.html). Copy it to the output location and adapt the scene, labels, legend, title, and visual styling to the investigated change. Keep its pan, zoom, fit-to-view, pointer, touch, and keyboard behavior unless the user requests a different interaction model.

Keep the artifact self-contained: embed its CSS, JavaScript, and SVG rather than adding project dependencies, build configuration, or network-loaded libraries. It must remain usable from a local file and at common desktop and mobile viewport sizes.

## Compose the canvas

Treat the diagram as a free-form spatial canvas, not a document page or a slide. Arrange components, boundaries, actors, data, events, implementation steps, risks, and validation gates wherever their relationships are clearest. SVG groups, paths, cards, labels, badges, and compact callouts may be combined freely.

Use position, containment, connectors, and numbered paths to make structure and sequence visible. Keep labels short enough to scan while preserving concrete file paths, symbols, interfaces, dependencies, and observable validation criteria where known. Dense plans may extend beyond the initial viewport because the canvas can be panned and zoomed; keep each local region readable and use fit-to-view as the overview.

Clearly distinguish current behavior, proposed changes, external systems, assumptions, risks, and unresolved decisions through consistent visual treatment and a visible legend. Use color together with text or shape so meaning does not depend on color alone. Avoid decorative elements that compete with the plan.

## Connect the plan to execution

Represent the relevant parts of the following directly on the canvas:

1. The outcome, scope, meaningful non-goals, and current behavior.
2. An ordered implementation sequence tied to concrete repository locations when known.
3. Data flow, interfaces, compatibility, migrations, rollout, and rollback where relevant.
4. Validation steps and observable acceptance criteria.
5. Assumptions, risks, dependencies, and open decisions that could alter the approach.

Do not invent paths, APIs, or dependencies. When evidence is missing, label the item as proposed or unresolved rather than presenting it as current behavior.

## Verify in a browser

Open the completed local HTML file in an available browser. Check the initial fit, label legibility, connector direction, viewport resizing, and whether overlays obscure content. Exercise drag-to-pan, wheel or trackpad zoom around the pointer, zoom controls, fit-to-view, and keyboard navigation. Inspect both the overview and dense regions at useful zoom levels.

If browser control is unavailable, validate the source and disclose that interaction and visual layout were not verified. Return a link or path to the completed `.html` artifact and briefly state how to navigate it.
