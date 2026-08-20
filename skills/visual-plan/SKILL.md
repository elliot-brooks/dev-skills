---
name: visual-plan
description: Create a diagram-first implementation plan grounded in the current codebase. Use when the user asks to visualize, diagram, map, or explain a proposed development change, architecture, workflow, dependency chain, data flow, or rollout before implementation.
---

# Visual Plan

Make the structure and sequence of a development change visible before describing its implementation.

## Investigate first

Inspect applicable repository instructions, relevant code, tests, configuration, documentation, and version-control state. Identify the components, boundaries, actors, data, and events that actually participate in the proposed change.

Treat the task as read-only unless the user also asks for implementation. Distinguish confirmed repository facts from assumptions and proposed additions.

## Choose the visual

Use the smallest Mermaid diagram that materially explains the change:

- `flowchart` for components, dependencies, ownership, or decision branches;
- `sequenceDiagram` for requests, events, or interactions over time;
- `stateDiagram-v2` for lifecycle and transition behavior.

Include only nodes and edges needed to understand the plan. Clearly mark new or changed elements, external systems, and important boundaries. Keep labels concise, use simple Mermaid syntax, and ensure the diagram is valid in standard Markdown renderers.

If more than one relationship matters, prefer one primary diagram plus a compact secondary diagram only when it removes real ambiguity. Do not add decorative visuals.

## Connect the diagram to execution

After the diagram:

1. Explain how to read it and call out the proposed change.
2. Give an ordered implementation sequence tied to diagram nodes and concrete repository locations when known.
3. Describe validation, acceptance criteria, rollout, and rollback where relevant.
4. Surface assumptions, risks, and open decisions that could alter the diagram or sequence.

Do not invent paths, APIs, or dependencies. When evidence is missing, label the item as proposed or unresolved rather than presenting it as current behavior.

Keep the written plan independently understandable for clients that do not render Mermaid.
