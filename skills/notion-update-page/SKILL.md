---
name: notion-update-page
description: >
  Safely update an existing Notion page after finding and fetching it, drafting
  a proposed edit, and getting explicit user confirmation. Use this skill when
  the user asks to add, append, revise, clean up, or amend content or properties
  on an existing Notion page without workspace-specific assumptions.
metadata:
  short-description: Safely update an existing Notion page
---

# notion-update-page

Update an existing Notion page while preserving unrelated content. This skill is
for edits to known or discoverable pages, not for creating new pages.

## Safety Rules

- Never create or edit a Notion page until the user has seen the proposed
  change and explicitly confirmed it.
- If the user refuses, is unclear, or asks for revisions, do not change Notion.
- Preserve existing useful page content. Only replace content when the user
  explicitly asked for replacement or the preview clearly states the replacement.
- Do not include secrets, tokens, private credentials, or sensitive operational
  details in the page.
- If multiple pages match the target, ask the user to choose before drafting the
  edit.
- Fetch the page after writing to verify the intended change.

## Inputs

- `target`: Notion page URL, id, title, or description.
- `change`: the content, property update, cleanup, or structural edit requested
  by the user.
- `placement` *(optional)*: append, prepend, replace section, add under heading,
  update property, or another user-specified location.
- `format_preference` *(optional)*: requested headings, bullets, table shape, or
  writing style.

## Workflow

### 1. Find The Page

1. If the user provides a Notion page URL/id, fetch it directly.
2. Otherwise search Notion for the target page using title and context clues.
3. Fetch plausible matches before deciding whether there is a clear target.
4. If the target is ambiguous, return candidates and ask the user to choose.

### 2. Inspect Existing Content

Fetch the selected page and identify:

- title and parent context;
- existing headings and sections;
- properties if the page belongs to a database/data source;
- content near the requested edit location.

### 3. Draft The Proposed Change

Choose the least surprising edit mode:

- append when the user says add/capture/log;
- add under a matching heading when one exists;
- replace a section only when requested or clearly implied;
- update properties only when the user asks for property/status/tag/date changes;
- preserve unrelated sections.

Before writing, show a preview with:

**Page:** `<page title> (edited)`

**Target location:** `<append|heading|section|property>`

**Proposed changes**

- concise bullet list of edits

Include the exact proposed text or property changes when practical.

### 4. Ask For Final Confirmation

Ask a direct confirmation question, for example:

`Confirm I should apply this Notion update?`

Only proceed if the user clearly confirms. If the user asks for revisions,
revise the preview and ask again.

### 5. Apply And Verify

After confirmation:

1. Apply only the confirmed edit.
2. Fetch the page again.
3. Verify the target page is the one selected and the intended content or
   property update exists.
4. If verification fails, report what happened and do not claim success.

## Output

After a confirmed write succeeds, return:

**Page:** `<page title> (edited)`

**URL / id:** `<Notion URL or id>`

**Changes**

- `<change 1>`
- `<change 2>`

If no write was performed because the user did not confirm, say that no Notion
page was changed and briefly state what remains pending.
