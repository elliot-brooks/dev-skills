---
name: confluence-find-page
description: Find the most relevant Confluence pages for one or more user-provided prompts using the installed read-only Confluence MCP server. Use when Codex needs to search Confluence, compare likely page matches, inspect page content, estimate relevance confidence, and return a concise list of page hyperlinks grouped by prompt.
---

# Confluence Find Page

## Overview

Find likely Confluence pages for each prompt, verify the strongest candidates by opening page content, and return a small, confidence-labelled list. Keep the output concise and grouped by the user's original prompt labels.

## Workflow

1. Search each prompt separately.
   - Start with an exact phrase search when the prompt looks like a title.
   - If exact search returns no results or weak results, broaden to distinctive terms.
   - Run independent prompt searches in parallel when possible.
2. Inspect likely matches.
   - Use `confluence_get_page` for the strongest candidates before assigning confidence.
   - Prefer pages whose title and content both match the prompt intent.
   - Treat search snippets as hints, not final evidence.
3. Rank and label relevance.
   - High: title or page purpose closely matches the prompt, and content confirms the same topic.
   - Medium: content clearly relates to the prompt, but the page is broader, adjacent, or a supporting document.
   - Low: only partial term overlap or contextual relevance; include only if useful.
4. Return only the best small set.
   - Usually list 2-5 pages per prompt.
   - Omit noisy matches unless there are very few results.
   - Use the user's requested output format when supplied.

## Search Strategy

Use a widening search pattern:

- Exact phrase: `"Prompt Title"`
- Full prompt without quotes: `Prompt Title`
- Distinctive keywords: domain terms, product names, feature names, rota names, ticket names
- Title-biased CQL if needed: `title~"distinctive phrase"`

When a prompt contains multiple concepts, search the full prompt first, then search combinations that preserve the core intent. For example, after a weak exact match for `TLB Memory Access Recipe`, search `TLB memory access`, `Memory Access Recipe`, and `TLB Walk Memory Access`.

## Page Inspection

Open candidate pages when:

- The title looks highly relevant.
- The snippet includes only some of the prompt terms.
- Several pages have similar relevance and need ranking.
- Confidence would otherwise be based only on search ordering.

Use `include_metadata: true` and `convert_to_markdown: true` when opening pages. Check:

- Title
- Space
- Page purpose or overview
- Relevant headings
- Tables or sections matching the prompt
- Whether the page is a canonical source, validation page, checklist, risk register, or adjacent planning document

## Output

Default to this shape unless the user asks otherwise:

```markdown
Prompt One

- High: [Page Title](https://confluence.example/pages/viewpage.action?pageId=123)
- Medium: [Another Page](https://confluence.example/pages/viewpage.action?pageId=456)

Prompt Two

- High: [Best Match](https://confluence.example/pages/viewpage.action?pageId=789)
```

Rules:

- Format links as Markdown hyperlinks: `[page title](link)`.
- Put each prompt in its own section.
- Put confidence first on each bullet.
- Do not include long rationale unless requested.
- If no good matches exist, state `No strong match found` and include the best weak candidates only if they may help.

## Confidence Calibration

- High: canonical or directly titled page, page body confirms the prompt topic.
- Medium: supporting, tracking, checklist, validation, or planning page that references the target topic.
- Low: incidental mention, broad parent page, risk register, weekly note, or adjacent topic.

## Quality Checks

- Preserve the exact user prompt labels in the output.
- Do not collapse multiple prompts into one result set.
- De-duplicate pages across prompt sections only when the same page is genuinely relevant to both.
- Prefer current, canonical pages over transient notes when relevance is similar.
- Use succinct and accurate language.
