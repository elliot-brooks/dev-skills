---
name: scrutinize
description: Stress-test an existing technical plan, architecture, migration, rollout, or implementation approach before work begins. Use when the user asks to scrutinize, challenge, critique, pressure-test, review, or run a pre-mortem on a development proposal and wants concrete weaknesses, questions, and improvements.
---

# Scrutinize

Review a technical proposal as a constructive adversary. Find the issues most likely to cause rework, failure, or an unverifiable result, then improve the plan.

## Establish the evidence

Read the complete plan and inspect the relevant repository context when available. Identify the stated goal, constraints, success criteria, dependencies, and sequencing. Separate confirmed facts from assumptions and preferences.

Answer questions from the codebase or supplied material before asking the user. Do not criticize a plan for omitting information that is readily discoverable.

## Pressure-test the proposal

Examine the areas that matter for this plan, including:

- whether it solves the stated problem without unnecessary scope;
- hidden assumptions, ambiguous ownership, and missing dependencies;
- ordering mistakes, circular dependencies, and unsafe parallel work;
- failure modes, edge cases, compatibility, migrations, rollback, and partial completion;
- security, privacy, performance, reliability, and operability when relevant;
- test coverage, observability, acceptance criteria, and evidence of success;
- simpler approaches or existing repository patterns the plan overlooks.

Prioritize findings as `blocking`, `important`, or `optional`. Tie each finding to evidence, explain its likely consequence, and recommend a concrete correction. Do not manufacture objections to appear thorough; say when an area is sound.

Ask pointed questions only when the answers could materially change the design or scope. Explain the decision each question unlocks.

## Deliver the review

Lead with a concise verdict on whether the plan is ready to execute. Then present prioritized findings and unresolved questions. Finish with a revised sequence or a small set of amendments that would make the plan implementation-ready.

Review only unless the user also requests implementation. Preserve good decisions and the author's intent while removing ambiguity and avoidable risk.
