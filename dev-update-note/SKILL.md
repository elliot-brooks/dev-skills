---
name: dev-update-note
description: >
  Create or amend a note in the Developer Brain Notes database using Notion.
  Use this skill when the user asks to capture, update, summarise, or refine a
  Developer Brain note. Always preview the proposed Notion changes and get final
  user confirmation before creating or editing any page.
metadata:
  short-description: Update a Developer Brain note with confirmation
---

# dev-update-note

Create or update a page in the **Notes** database under the **Developer Brain**
Notion page. This skill is for reusable knowledge notes, not meeting minutes.

## Safety Rules

- Never create or edit a Notion page until the user has seen the proposed
  changes and explicitly confirmed them.
- If the user refuses, is unclear, or asks for revisions, do not change Notion.
- Do not include secrets, tokens, private credentials, or sensitive operational
  details in the note.
- All notes created or edited by this skill must include the `AI-Enhanced` tag.
- If the Notes database does not yet have an `AI-Enhanced` tag option, add it
  before applying the confirmed page change.
- Preserve existing useful note content. Amend similar notes instead of creating
  duplicates.
- Avoid the `Meeting` tag unless the user explicitly asks for meeting notes.

## Inputs

- `topic`: the note topic or title.
- `content`: the information to capture or merge into the note.
- `format_preference` *(optional)*: requested structure, headings, tags, or
  summary format.

## Workflow

### 1. Find The Destination

1. Use the Notion MCP server to search for the **Developer Brain** page.
2. Fetch the Developer Brain page and locate the **Notes** database or data
   source.
3. Fetch the Notes data source to inspect the schema, especially:
   - title property, usually `Name`
   - `Tags`
   - `Status`
   - `Date`

### 2. Check For Existing Notes

1. Search the Notes data source for the topic and close synonyms.
2. Fetch plausible matches before deciding whether to update or create.
3. Prefer updating an existing note when it already covers the same concept.
4. Create a new note only when no similar note exists.

### 3. Draft The Proposed Change

Prepare a preview for the user before using any Notion write tool.

The preview must include:

**Page:** `<existing page title> (edited)` or `<new page title> (created)`

**Tags:** `<current tags>, +AI-Enhanced, +any other proposed tag`

**Changes**

- concise bullet list of proposed content/property changes

When useful, include the proposed note section or replacement text. Keep it
short enough for the user to review.

### 4. Ask For Final Confirmation

Ask a direct confirmation question, for example:

`Confirm I should apply this Notion update?`

Only proceed if the user clearly confirms. If they decline or ask for changes,
stop and revise the preview instead of editing Notion.

### 5. Apply The Confirmed Change

After confirmation:

1. Ensure the Notes data source has an `AI-Enhanced` option in `Tags`.
   - If missing, update the data source schema to add it while preserving
     existing tag options.
2. For an existing note:
   - update only the relevant content;
   - preserve unrelated sections;
   - update `Tags` to include `AI-Enhanced`;
   - keep existing non-conflicting tags.
3. For a new note:
   - create it under the Notes data source;
   - include `AI-Enhanced` in `Tags`;
   - set sensible properties such as `Status` if the schema supports them.
4. Fetch the page after writing to verify:
   - the page is in Developer Brain Notes;
   - `AI-Enhanced` is present;
   - the intended content exists;
   - no unintended `Meeting` tag was added.

## Output

After the confirmed write succeeds, respond in this format:

**Page:** `<page title> (created|edited)`

**Tags:** `<existing tags>, +AI-Enhanced, +other newly added tags`

**Changes**

- `<change 1>`
- `<change 2>`

If no write was performed because the user did not confirm, say that no Notion
page was changed and briefly state what remains pending.
