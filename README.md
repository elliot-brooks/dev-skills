# Developer Agent Skills

A portable collection of developer-focused skills for multiple agents that support the [Agent Skills specification](https://agentskills.io/specification).

## Available skills

| Skill                                        | Purpose                                                                               |
| -------------------------------------------- | ------------------------------------------------------------------------------------- |
| [`plan`](skills/plan/SKILL.md)               | Inspect a codebase and produce an implementation-ready Markdown plan.                 |
| [`visual-plan`](skills/visual-plan/SKILL.md) | Create a free-form HTML implementation diagram with interactive pan and zoom.          |
| [`scrutinize`](skills/scrutinize/SKILL.md)   | Stress-test a technical plan, surface hidden assumptions, and recommend improvements. |

## Install

```bash
npx skills add elliot-brooks/dev-agent-skills
```

## Useful Resources

- [Agent Skills specification](https://agentskills.io/specification)
- [`skills` CLI documentation](https://github.com/vercel-labs/skills)
- [skills.sh](https://skills.sh)
