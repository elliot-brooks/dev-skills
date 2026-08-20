---
name: visual-plan
description: Create a clear, implementation-ready plan grounded in the current codebase and deliver it as a readable MDX artifact. Use when the user asks to visualize, map, or explain a proposed development change, architecture, workflow, dependency chain, data flow, or rollout before implementation.
---

# Visual Plan

Make the structure and sequence of a development change easy to understand and execute.

## Investigate first

Inspect applicable repository instructions, relevant code, tests, configuration, documentation, and version-control state. Identify the components, boundaries, actors, data, and events that actually participate in the proposed change.

Treat the product code as read-only unless the user also asks for implementation. Creating a requested plan artifact is allowed. Distinguish confirmed repository facts from assumptions and proposed additions.

## Produce the artifact

Always create one `.mdx` plan artifact. Do not offer or ask the user to choose an output format. Use their requested location or a sensible repository location when none is specified.

Follow the repository's existing MDX conventions and available components. Otherwise keep the artifact portable with standard Markdown-compatible MDX. Do not invent imports, components, or build configuration.

## Make the plan readable

Lead with the intended outcome and recommended approach. Organize the rest with descriptive headings, short paragraphs, ordered steps, and compact lists or tables. Make file paths, symbols, boundaries, dependencies, and validation gates easy to scan.

Use a visual only when it materially clarifies a relationship that prose would make harder to follow. Choose the most suitable form, such as a comparison table, dependency map, timeline, sequence, state model, text tree, Mermaid diagram, inline SVG, or an established repository component. Prefer the smallest visual that resolves the ambiguity, and omit diagrams entirely when the plan is already clear.

Clearly distinguish current behavior, proposed changes, external systems, assumptions, and unresolved decisions. Avoid decorative visuals and unsupported JSX. When a visual depends on renderer-specific behavior, include enough adjacent prose for the plan to remain complete without it.

## Connect the plan to execution

The artifact should cover:

1. The outcome, scope, meaningful non-goals, and current behavior.
2. An ordered implementation sequence tied to concrete repository locations when known.
3. Data flow, interfaces, compatibility, migrations, rollout, and rollback where relevant.
4. Validation steps and observable acceptance criteria.
5. Assumptions, risks, dependencies, and open decisions that could alter the approach.

Do not invent paths, APIs, or dependencies. When evidence is missing, label the item as proposed or unresolved rather than presenting it as current behavior.

Find and use an existing MDX preview or build workflow in the repository when available. Otherwise use an available MDX-capable renderer without adding project dependencies solely for preview. Verify that the MDX compiles, its hierarchy is easy to scan, links and visuals work, and the content is legible. If no compatible renderer is available, validate the MDX source and disclose that the rendered artifact could not be verified. Return a link or path to the completed `.mdx` artifact and identify any renderer-specific capabilities it uses.
