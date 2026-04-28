---
name: jira-ticket-brief
description: Build an actionable checklist from a Jira ticket using the installed Jira read-only MCP server. Use when Codex needs to inspect a Jira issue, summarize scope, surface blockers, or turn ticket details into a concrete execution, QA, review, or handoff checklist.
---

# Jira Ticket Brief

Turn a Jira issue into a concise, execution-ready checklist. Pull facts from Jira, separate confirmed details from inference, and turn missing information into explicit follow-up items instead of guessing.

## Gather the ticket context

1. Start with `jira_get_issue`.
   - Prefer a focused field list first: `summary,description,status,priority,issuetype,assignee,reporter,labels,components,fixVersions,parent,subtasks,issuelinks,attachment`.
   - Increase `comment_limit` only when comments are likely to change the brief.
2. Expand only when it will materially improve the checklist.
   - Use `jira_get_worklog` when prior investigation or partial implementation affects next steps.
   - Use `jira_get_transitions` when the user wants workflow-next-step guidance.
   - Use `jira_download_attachments` only for attachments that are clearly relevant.
   - Use `jira_search_fields` only when a needed custom field name is unclear.
3. Stay read-only.
   - Do not imply that Jira will be updated.
   - Do not invent acceptance criteria, owners, dates, rollout steps, or dependencies that Jira does not state.

## Derive the brief

Extract the minimum set of facts needed to act:

- Objective: the outcome the ticket is trying to produce.
- Scope signals: acceptance criteria, description bullets, subtasks, linked issues, labels, components, versions.
- Delivery context: status, assignee, priority, blockers, dependency hints.
- Gaps: anything a developer or reviewer would need that the ticket does not answer.

Then convert that into:

- Confirmed facts
- Action checklist
- Open questions or blockers

## Write the checklist well

- Use concrete verb-led items.
- Prefer the smallest responsible task list.
- Separate execution items from validation items.
- Add dependency items for linked blockers or prerequisite subtasks.
- Add clarification items when the ticket is ambiguous instead of guessing the implementation.
- Keep epic-level tickets coordination-oriented and discovery-oriented.
- Keep story and sub-task tickets execution-oriented and specific.
- If the ticket is thin, produce a thin checklist with explicit discovery items rather than fabricated detail.

## Use this output shape

Use this structure unless the user asks for a different format:

`Ticket`
- `<KEY>`: `<summary>`
- Status, assignee, priority, version, and issue type when available

`Facts`
- Directly stated scope and constraints
- Linked work or subtasks that materially affect delivery
- Risks or blockers explicitly present in Jira

`Checklist`
- [ ] Clarify missing requirement or acceptance criteria
- [ ] Implement the concrete ticket work
- [ ] Validate the changed behavior
- [ ] Coordinate dependency or review follow-up
- [ ] Close out release or documentation work if the ticket calls for it

`Open questions`
- List unresolved points that Jira does not answer

`Notes`
- State which parts are direct Jira facts and which are inference

## Keep the brief honest

- Treat the Jira issue as the source of truth for the brief.
- Call out weak or missing ticket detail plainly.
- Prefer short, high-signal output over a long paraphrase of the issue.
