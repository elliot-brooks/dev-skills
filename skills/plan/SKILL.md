---
name: plan
description: Create an implementation-ready Markdown plan grounded in the current codebase. Use when the user asks for a coding plan, implementation plan, task breakdown, migration plan, or a plan before making changes. Do not use when the user wants immediate implementation and a separate planning deliverable would add no value.
---

# Plan

Turn a development request into a plan another engineer or agent can execute without rediscovering the codebase.

## Ground the plan

Inspect the repository before planning. Read applicable agent instructions, relevant code, tests, configuration, documentation, and current version-control state. Trace existing behavior far enough to identify the real integration points and conventions.

Treat the task as read-only unless the user also asks for implementation. Do not create placeholder files or make speculative edits while planning.

Resolve questions from available evidence first. Ask the user only about decisions that materially change the scope or design and cannot be inferred safely. State any remaining assumptions explicitly.

## Build an executable plan

Describe:

- the intended outcome, scope, and meaningful non-goals;
- the current behavior that the change builds on or replaces;
- ordered implementation steps, naming concrete files, modules, symbols, or components when known;
- data flow, interfaces, migrations, compatibility concerns, and rollout or rollback where relevant;
- tests and observable acceptance criteria;
- risks, dependencies, and unresolved decisions that could change the approach.

Explain why each step is needed and how it connects to adjacent work. Prefer coherent vertical slices over a list of disconnected file edits. Do not invent exact paths or APIs when repository evidence is insufficient; name the responsibility and mark it for discovery instead.

Scale the detail to the change. A small fix may need only a few steps. A cross-cutting change should expose sequencing, ownership boundaries, and validation gates.

## Present the result

Lead with the goal and recommended approach. Then provide an ordered plan, validation strategy, and risks or open questions. Omit empty sections and incidental findings.

Make every step specific enough to implement and verify, but do not include implementation code unless a short interface sketch materially clarifies the plan.
