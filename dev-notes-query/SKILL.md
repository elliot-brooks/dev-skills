---
name: dev-notes-query
description: >
  Query the Notes database in the Developer Brain Notion workspace to answer
  questions or retrieve knowledge on a given topic. Use this skill when the
  user asks a conceptual or knowledge-based question that may have been
  captured as a note (e.g. "what is X", "explain Y", "how does Z work").
metadata:
  short-description: Query Developer Brain Notes for a topic
---

# dev-notes-query

Search the Developer Brain Notes database in Notion and return a concise,
accurate answer based on the matching note.

## Inputs

- `query`: the topic or question to search for (e.g. "false sharing", "MESI protocol")

## Steps

1. Call `notion-notion-search` with:
   - `query`: the user's topic or question
   - `filters`: `{}`
   - Search scope: the **Notes** database inside the **Developer Brain** Notion page

2. From the results, identify the most relevant page by title and highlight.

3. Call `notion-notion-fetch` with the `id` of that page.

4. Summarise the fetched content into a concise answer.
   - Preserve key definitions, callouts, and structured detail.
   - Favour brevity and accuracy over padding.

## Output

A clear, direct answer to the user's question drawn from the note content.
