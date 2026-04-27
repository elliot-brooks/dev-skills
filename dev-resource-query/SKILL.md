---
name: dev-resource-query
description: >
  Query the Resources database in the Developer Brain Notion workspace to
  retrieve a stored documentation link, filepath, attachment, website, library,
  or other saved resource. Use this skill when the user asks for a resource,
  reference, documentation page, URL, filepath, or short resource summary from
  Developer Brain.
metadata:
  short-description: Fetch a saved resource from Developer Brain
---

# dev-resource-query

Search the Developer Brain Resources database in Notion and return a concise
summary of the matching resource.

## Inputs

- `query`: the resource, documentation, tool, library, or topic to search for
  (e.g. "Robot Framework docs", "Vitest", "Go mockery config")

## Steps

1. Call `notion-notion-search` with:
   - `query`: the user's resource search term, optionally including
     `"Developer Brain Resources"` to improve precision
   - `filters`: `{}`
   - Search scope: the **Resources** database inside the **Developer Brain**
     Notion page

2. From the results, identify the most relevant resource page by title,
   highlight, and parent context.
   - Prefer pages whose ancestor path includes **Developer Brain** and whose
     parent data source or database is **Resources**.
   - If multiple plausible matches exist, fetch the strongest match first and
     mention ambiguity only if it affects the answer.
   - If no relevant resource page is found, return a response stating that no matching resource could be found.

3. Call `notion-notion-fetch` with the `id` of the selected resource page.

4. Extract resource details from the fetched page:
   - `Name` as the resource name.
   - `userDefined:URL`, `URL`, `url`, `Attachments`, or page content as the
     URL/filepath source, preferring the external resource URL over the Notion
     page URL.
   - `Type`, `Status`, page content, and search/fetch highlights as supporting
     context for the summary.

5. If the resource points to external documentation and the user asks for a
   summary of that documentation, fetch the external source when available and
   allowed. If external fetching is unavailable, summarize only the Notion
   resource metadata and state that limitation.

## Output

Return a short, structured response with these fields:

**Resource name:** `<name>`

**URL / filepath:** `<external URL, filepath, or attachment reference>`

**Summary of resource:** `<one concise paragraph describing what the resource is and what it is useful for>`

Do not return a bulleted list unless the user explicitly asks for bullets.
