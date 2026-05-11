---
name: jira-find-ticket
description: Find and rank Jira tickets matching one or more natural-language prompts using the installed Jira read-only MCP server. Use when Codex needs to search Jira from vague issue descriptions, compare candidate tickets, assign confidence levels, and return concise linked matches for N prompts.
---

# Jira Find Ticket

Find the best Jira issue matches for one or more user-provided prompts. Use the Jira read-only MCP server as the source of truth, rank candidate tickets by match quality, and return a concise confidence-scored result for each prompt.

## Inputs

Expect one or more prompts such as:

- A symptom or error message
- A file name, command, component, or product term
- A partial summary remembered by a user
- A behavioral/security concern

If the user provides multiple prompts, process each independently and preserve the input order.

## Search Workflow

For each prompt:

1. Extract distinctive terms.
   - Exact filenames, commands, identifiers, error codes, product names, and quoted phrases are strongest.
   - Split compound terms into useful variants when needed, such as `gator-log.txt`, `gator-log`, and `gator`.
2. Run a narrow Jira search first with `jira_search`.
   - Use `text ~` clauses for exact phrases and high-signal terms.
   - Request focused fields: `summary,status,priority,issuetype,description,labels`.
   - Keep limits modest, usually 10-20 results.
3. If the narrow search is empty or noisy, broaden deliberately.
   - Try likely spelling variants and product renames.
   - Search adjacent behavior words, such as `retrieve`, `transfer`, `collect`, `permission`, `delete`, `path`, or `traversal`.
   - Avoid accepting broad keyword matches without reading summaries/descriptions.
4. Inspect candidate summaries and descriptions enough to rank them.
   - A title match plus description evidence is usually High.
   - A related root cause, duplicate, follow-on, or broader class of the same issue is usually Medium.
   - A weak lexical overlap with different behavior is Low and should usually be omitted unless the user asks for exhaustive candidates.
5. Stay read-only.
   - Do not modify Jira.
   - Do not imply a ticket was updated or linked.

## Confidence Guide

- **High**: Directly matches the prompt's core object and behavior. The summary or description contains the same specific command/file/error and the same failure mode.
- **Medium**: Closely related but not exact. Examples: same subsystem with a broader root cause, same failure class with a different file, or a related follow-up ticket.
- **Low**: Only tangentially related. Include only when there are no High or Medium candidates, or when the user explicitly asks for possible matches.

Prefer fewer, better matches. Do not pad the answer.

## Heading Names

Use meaningful headings derived from each prompt, not generic `Prompt One` headings, unless the user explicitly asks for that wording.

Good headings:

- `# gator-log.txt Retrieval`
- `# Unsafe Run Deletion`
- `# Restrictive umask File Retrieval`

Keep headings short and noun-like.

## Output Shape

Use this structure unless the user requests another format:

```markdown
# <Prompt-specific heading>

- High: [<JIRA-KEY>](https://jira.arm.com/browse/<JIRA-KEY>)
  - Type: <issue type>
  - Summary: <summary>
  - Status: <status>
  - Priority: <priority>

- Medium: [<JIRA-KEY>](https://jira.arm.com/browse/<JIRA-KEY>)
  - Type: <issue type>
  - Summary: <summary>
  - Status: <status>
  - Priority: <priority>
```

When no strong match is found, say so under that heading and list the best weak candidate only if it is useful:

```markdown
# <Prompt-specific heading>

No High or Medium match found.
```

## Quality Bar

- Base every listed ticket on Jira search results.
- Include clickable Jira links.
- Include confidence, type, summary, status, and priority for each ticket.
- Mention search uncertainty briefly only when it affects confidence, such as a likely typo or no exact search hit.
- Keep the final response concise.
