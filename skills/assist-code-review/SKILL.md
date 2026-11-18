---
name: assist-code-review
description: Review code changes, presenting their intent and impact in a clear way.
---

# PR Understanding

Help the developer understand a change so they can review it
effectively. Prioritise comprehension over evaluating code quality.

## Instructions

Perform a formal code review of the specified change, then generate a structured summary of your review.

### Structured Summary

1. **Summary**
   - A high-level summary of the change in a few sentences.

2. **Changes**
   - Summarise the main modifications and additions, and why they work in context.

3. **Implications**
   - What existing behaviour could be affected?

4. **Review-map**
   - Highlight the key call sites and interactions in logical order
   - Explain important design decisions and execution flows.

5. **Comments**
   - Bullet key observations, suggestions and bugs grouped by priority
   - Use [Conventional Comments](https://conventionalcomments.org/) style

## Guidelines

- Use ASD-STE100 language throughout
- When referencing files, format them as `filename:method():line`
- Ground explanations in the code
- Distinguish observed behaviour from inferred intent.
- Keep explanations concise and proportional to the complexity of the PR.
