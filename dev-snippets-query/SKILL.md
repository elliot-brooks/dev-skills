---
name: dev-snippets-query
description: >
  Query the Snippets database in the Developer Brain Notion workspace to
  retrieve a saved code snippet. Use this skill when the user asks for a
  command, script, or code pattern they may have stored (e.g. "show me the
  pgrep command", "how do I use git bisect", "docker run snippet").
metadata:
  short-description: Fetch a saved code snippet from Developer Brain
---

# dev-snippets-query

Search the Developer Brain Snippets database in Notion and return the
matching code snippet(s), formatted as a code block with inline comments.

## Inputs

- `query`: the tool, command, or pattern to search for (e.g. "pgrep pkill", "git bisect", "docker compose")

## Steps

1. Call `notion-notion-search` with:
   - `query`: the user's search term
   - `filters`: `{}`
   - Search scope: the **Snippets** database inside the **Developer Brain** Notion page

2. From the results, identify the most relevant page(s) by title and highlight.

3. Call `notion-notion-fetch` for each relevant page `id`.

4. Extract the code block(s) from the page content and present them:
   - Format as fenced code blocks with the appropriate language tag.
   - Comments should use `//` prefix on their own line.
   - Reproduce snippet content faithfully — do not alter it.

## Output

One or more fenced code blocks containing the requested snippet(s), with
comments explaining each section.
