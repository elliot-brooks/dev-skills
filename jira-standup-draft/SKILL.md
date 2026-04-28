---
name: jira-standup-draft
description: Draft concise standup updates from Jira activity using the installed Jira read-only MCP server. Use when Codex needs to summarize recent work, current work, and blockers for a person, sprint, epic, board, project, or JQL-selected issue set, especially for daily standups, async status posts, or quick team updates.
---

# Jira Standup Draft

## Overview

Turn Jira issue activity into a short, honest standup draft. Prefer a thin update that clearly distinguishes observed work from inference over a polished summary that overstates progress.

## Choose the scope first

Identify the narrowest useful slice of Jira activity:

- One person: use assignee-focused search for daily standups.
- One sprint: use board and sprint tools when the user is reporting team progress.
- One epic or linked set of tickets: use epic- or link-based search when the update is feature-oriented.
- One project or custom JQL: use direct JQL when the user already knows the slice.

If the user does not specify a window, default to recently updated issues and state the assumption. Prefer the last 1 to 3 days for standup-style updates.

## Gather only the needed Jira context

Prefer the smallest data set that can support the draft:

1. Use `jira_search` for assignee, project, epic, or JQL-driven slices.
   - Start with focused fields such as `summary,status,assignee,priority,updated,parent,subtasks,issuelinks`.
2. Use `jira_get_board_issues` or `jira_get_sprint_issues` when the user frames the request around a board or sprint.
3. Use `jira_get_issue` only for tickets that need deeper context.
   - Pull description or comments only when status and summary are not enough to explain the work.
4. Use `jira_get_worklog` only when actual logged work materially changes the standup draft.

Do not collect extra fields just because they are available. The goal is a standup update, not a ticket dump.

## Derive the standup carefully

Separate direct evidence from interpretation:

- `Yesterday` or `Recent progress`
  - Include issues that clearly moved, were updated with meaningful comments, or have concrete progress signals.
- `Today` or `Next`
  - Infer only from active statuses, explicit subtasks, or obvious follow-up work.
  - If the next step is unclear, say that the likely next action is inferred.
- `Blockers`
  - Include only blockers explicitly stated in status, links, comments, or dependency structure.
  - Do not invent blockers from slow progress alone.

Treat status changes carefully:

- A move to `Done` or equivalent is strong evidence of completed work.
- `In Progress` is evidence of active work, not evidence of substantial movement.
- Mere `updated` timestamps are not enough to claim meaningful progress without supporting detail.

## Use this output shape

Use this structure unless the user asks for a different format:

`Standup`
- `Yesterday:` short completed or advanced work items
- `Today:` likely next actions or in-flight work
- `Blockers:` explicit blockers, or `None stated`

`Notes`
- Scope used: person, sprint, epic, project, or JQL
- Time window used
- Which items are direct Jira facts versus inference

Keep each bullet short and ticket-grounded. Include issue keys when they help disambiguate similar work.

## Keep the draft honest

- Stay read-only.
- Do not imply Jira will be updated.
- Do not invent accomplishments, owners, dates, or dependencies.
- Prefer `No clear blocker stated` over guessing.
- If the issue activity is too thin, say so and produce a thin standup draft.
