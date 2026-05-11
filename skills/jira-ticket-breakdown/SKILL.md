---
name: jira-ticket-breakdown
description: Summarize a Jira ticket into a concise markdown breakdown using the Jira read-only MCP server. Use when Codex needs to fetch a Jira issue and produce only the important ticket metadata plus a short description summary, with the issue link formatted as a markdown heading.
---

# Jira Ticket Breakdown

Create a compact Jira ticket summary for readers who need the key facts without a full investigation brief.

## Gather ticket facts

Use the Jira read-only MCP server as the source of truth.

1. Fetch the issue with `jira_get_issue`.
   - Prefer focused fields: `summary,status,issuetype,priority,assignee,reporter,created,updated,components,labels,fixVersions,versions,resolution,description`.
   - Include `comment_limit` only when the user asks for comment context or the description is too thin.
   - Use `*all` only if the focused fields do not expose required metadata.
2. Do not download attachments unless the user explicitly asks for attachment evidence or the issue description depends on them.
3. Stay read-only. Do not update Jira, transition issues, or imply changes were made.

## Output format

Use this shape unless the user asks otherwise:

```markdown
# [ISSUE-123](https://jira.example.com/browse/ISSUE-123)

- Type: <issue type>
- Priority: <priority>
- Status: <status>
- Assignee: <assignee or Unassigned>

## Summary

<short summary of the description, highlighting only the key information>
```

## Summary guidance

- Keep the description summary concise and high signal.
- Include the product, affected version/environment, main failure or request, expected behavior, actual behavior, and suspected cause when present.
- Mention scope or customer impact only when the ticket states it directly.
- Avoid long log excerpts, raw reproduction dumps, full comments, changelog history, and attachment details unless the user asks for them.
- Preserve uncertainty. Use wording such as "appears to", "likely", or "not yet confirmed" when the ticket is tentative.
- Do not invent owners, deadlines, links, acceptance criteria, or root causes that are not present in Jira.

## Missing fields

If a metadata field is unavailable, use the clearest honest value:

- `Assignee: Unassigned` when Jira says there is no assignee.
- `Priority: Not specified`, `Status: Not specified`, or `Type: Not specified` when a field is absent from the MCP response.
- Omit extra fields unless the user requested them.
