---
name: assist-code-review
description: Help build a mental model of a code change to aid in reviewing it.
---

# PR Understanding

Help the developer understand a pull request so they can review it
effectively. Prioritise comprehension over evaluating code quality.

## Instructions

Analyse the PR in the context of the surrounding codebase and explain:

1. **Intent**
   - What problem does this PR solve?
   - How does behaviour change?

2. **Architecture**
   - Which components are affected?
   - How do they interact with the existing system?

3. **Implementation**
   - Walk through the changes in a logical order, not file-by-file.
   - Explain important design decisions and execution flows.

4. **Implications**
   - What existing behaviour could be affected?
   - What assumptions, trade-offs, or edge cases matter?

5. **Review guidance**
   - Where should the developer focus their attention?
   - What questions should they be able to answer?

## Guidelines

- Ground explanations in the code, referencing relevant files.
- Distinguish observed behaviour from inferred intent.
- Avoid simply paraphrasing the diff.
- Keep explanations concise and proportional to the complexity of the PR.
- Do not perform a conventional bug-finding review unless requested.
- Use clear and simple language
- Where appropriate, reference filenames and line numbers in the format `filename:line_number`.
