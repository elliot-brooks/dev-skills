---
name: notion-query-database
description: >
  Query an arbitrary Notion database or data source by discovering its schema
  and mapping a user's natural-language filters, sorts, and requested fields to
  real Notion properties. Use this skill for generic Notion database lookups,
  lists, reports, and filtered searches without workspace-specific assumptions.
metadata:
  short-description: Query a Notion database generically
---

# notion-query-database

Query a Notion database or data source after identifying the target and
inspecting its schema. This skill must not assume fixed database names,
properties, tags, or workspace layout.

## Inputs

- `database`: a Notion database/data source URL, id, title, or description.
- `request`: the user's desired rows, filters, sorts, limit, and fields.
- `context_hint` *(optional)*: parent page, project, workspace area, or other
  information that helps identify the database.

## Workflow

### 1. Find The Database

1. If the user provides a Notion database or data source URL/id, fetch it
   directly.
2. Otherwise search Notion for the requested database using the title and any
   context hint.
3. Prefer results whose type and parent context indicate a database or data
   source.
4. If the database target is ambiguous, return candidates and ask the user to
   choose before querying.

### 2. Inspect The Schema

Fetch the database or data source schema before building the query. Identify:

- title property;
- status, select, multi-select, checkbox, people, date, number, relation, URL,
  email, phone, formula, rollup, and rich text properties;
- available select/status option names;
- properties suitable for sorting.

### 3. Build The Query

1. Map the user's requested filters and sorts to real property names and Notion
   property types.
2. Use exact property names from the schema in any Notion query.
3. Prefer conservative filters over speculative ones.
4. If a requested filter cannot be mapped confidently, explain the ambiguity and
   ask for clarification instead of issuing a misleading query.
5. Apply a sensible limit when the user does not specify one.

### 4. Return Results

Fetch matching result pages when needed to answer the user's request, especially
when the requested fields are in page content rather than properties.

## Output

Return a compact result list with:

- page title;
- URL or ID;
- the key properties relevant to the request;
- Any information from the page content that the user requested and that is not in properties.

If no rows match, say so and include the database title plus the effective
filters. Do not perform writes.
