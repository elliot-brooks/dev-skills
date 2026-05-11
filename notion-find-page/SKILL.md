---
name: notion-find-page
description: >
  Find the best matching Notion page, database, or data source from a natural
  language query, title, URL, or page hint. Use this skill when the user asks to
  locate, search for, identify, or retrieve a Notion page or database without
  assuming any workspace-specific structure.
metadata:
  short-description: Find a matching Notion page or database
---

# notion-find-page

Search Notion for the page, database, or data source that best matches the
user's request and return enough context for the user or another skill to use it
confidently.

## Inputs

- `query`: the page, database, topic, title, URL, id, or description to search
  for.
- `type_preference` *(optional)*: page, database, data source, or any.
- `context_hint` *(optional)*: workspace, parent page, project, team, or other
  disambiguating context supplied by the user.

## Workflow

1. If the user provides a Notion URL or id, fetch that target directly before
   doing a broader search.

2. Otherwise call the Notion MCP search tool with:
   - `query`: the user's search term, including any context hint when useful.
   - `filters`: `{}` unless the user gave a safe, explicit type filter.

3. Rank candidate results by:
   - exact or close title match;
   - search highlight relevance;
   - matching page/database/data source type;
   - parent or ancestor context matching the user's hint;
   - recency only when the user asked for recent content.

4. Fetch the strongest candidate when there is a clear best match.

5. If multiple candidates are plausible, do not guess. Return a short candidate
   list with title, type, parent context, URL or id, and the reason each matched.

6. If no relevant candidate is found, say that no matching Notion page or
   database could be found and include the search term used.

## Output

For a clear match, return:

**Title:** `<page or database title>`

**Type:** `<page|database|data source|unknown>`

**Location:** `<parent or ancestor context when available>`

**URL / id:** `<Notion URL or id>`

**Why this matched:** `<one concise sentence>`

If the result is ambiguous, return 2-5 candidates and ask the user which target
to use. Do not perform writes.
