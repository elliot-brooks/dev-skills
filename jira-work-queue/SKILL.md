---
name: jira-work-queue
description: Summarize and prioritize a Jira work queue using the installed Jira read-only MCP server. Use when Codex needs to review assigned work, triage a backlog slice, rank issues by urgency and readiness, or suggest the next actions for a person, team, board, sprint, epic, project, or JQL-selected issue set.
---

# Jira Work Queue

## Overview

Turn a Jira issue set into a prioritized, execution-ready queue. Focus on what is actionable now, what is blocked, and what needs clarification instead of just restating issue metadata.

## Define the queue slice

Prefer a concrete slice before ranking work:

- My queue: assigned issues, often filtered to open statuses.
- Sprint queue: active sprint items that need ordering.
- Epic queue: all work under a feature that needs sequencing.
- Triage queue: unassigned or newly created issues.
- Custom queue: a JQL-defined backlog slice.

If the user does not provide a slice, default to the narrowest reasonable interpretation of their wording and state the assumption.

## Gather the minimum Jira data

Use the tool that matches the slice:

1. Use `jira_search` for assignee, project, epic, backlog, or custom JQL views.
   - Start with focused fields such as `summary,status,priority,assignee,labels,components,updated,parent,subtasks,issuelinks,fixVersions`.
2. Use `jira_get_board_issues` for board-level triage.
3. Use `jira_get_sprint_issues` for sprint ordering.
4. Use `jira_get_issue` only when a ticket needs deeper context to explain readiness, blockers, or ambiguity.
5. Use `jira_get_worklog` only when existing investigation or partial implementation affects what should come next.

Avoid all-fields fetches unless a custom field is genuinely required to rank the queue.

## Rank by readiness before urgency

Do not sort by priority alone. Prefer this evaluation order:

1. Ready now
   - Clear scope, no explicit blocker, actionable next step, and suitable current status.
2. Important but blocked
   - High-value work that depends on another issue, missing input, or external review.
3. Needs clarification
   - Thin tickets, unclear acceptance criteria, or ambiguous ownership.
4. Low leverage or stale
   - Work that is neither urgent nor clearly actionable.

Use issue priority, status, blockers, linked issues, and recency as supporting signals, not absolute truth.

## Produce a queue the user can act on

Use this structure unless the user asks for a different format:

`Queue summary`
- Scope used
- Number of issues reviewed
- Main prioritization assumptions

`Do next`
- Short list of the most ready and worthwhile issues

`Blocked or waiting`
- Issues that should not be pulled yet, with the specific blocker

`Needs clarification`
- Issues missing enough detail that starting now would be risky

`Notes`
- Distinguish direct Jira facts from prioritization inference

Keep each issue entry short:

- `<KEY> <summary>`
- Why it is in this bucket
- Immediate next action when one is clear

## Keep the queue honest

- Stay read-only.
- Do not claim team policy if Jira does not encode it.
- Do not invent sequencing rules, SLAs, or owners.
- Call out when ranking depends on inference rather than explicit Jira data.
- If several issues are effectively tied, say so instead of fabricating precision.
