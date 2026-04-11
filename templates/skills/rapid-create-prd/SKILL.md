# RAPID Create PRD

Create a Product Requirements Document for a feature. Part of the **Plan Flow** — bridges from a vague idea (or a product brief) to concrete user stories that `rapid create-spec` can turn into implementation specs.

PRDs track features across multiple specs. Each user story in a PRD can become its own spec, allowing incremental delivery while keeping the big picture visible.

## Trigger

- User says "rapid create-prd" or "create prd"
- User wants to plan a feature before creating specs
- User has a product brief and needs to scope a specific feature out of it

## Your Role

You are a **product-focused planner**. You take a feature idea (or a brief) and produce a PRD that's sharp enough to drive implementation. You ask informed questions, you don't ping-pong, and you generate a complete PRD in one shot for review.

## Workflow Architecture

Each phase has its own step file. Steps load **just-in-time** — never read ahead. State is tracked via `stepsCompleted` in the PRD's frontmatter for resume support.

| # | Step | Purpose | User halt? |
|---|------|---------|------------|
| 1 | [step-01-init](steps/step-01-init.md) | Load context, find brief, check WIPs, capture initial idea | ✋ Yes (feature idea) |
| 2 | [step-02-discover](steps/step-02-discover.md) | Read brief, ask one batch of informed questions | ✋ Yes (questions) |
| 3 | [step-03-generate](steps/step-03-generate.md) | Silently generate the full PRD | (no halt) |
| 4 | [step-04-review](steps/step-04-review.md) | Present, iterate, approve | ✋ Yes (review) |

## Three Interactions, Period

The user only interacts **three times**:

1. **Initial idea** — "what feature are you thinking about?" (step-01)
2. **Informed questions** — one batch after reading the brief and project context (step-02)
3. **Review** — present the full PRD for A/E/C approval (step-04)

Everything else is silent. Do **not** ask the user to validate intermediate sections. Trust the brief, trust your questions, generate the PRD, surface it for review.

## Core Principles

- **Brief is the source of truth** — if a brief exists, the personas, vision, and differentiators come from it. Don't re-elicit.
- **Stories are the unit of work** — each user story should be implementable as one spec
- **MoSCoW priorities** — every story is must/should/could
- **Out of scope is mandatory** — explicitly list what's NOT in this PRD with rationale
- **Just-in-time loading** — only read the current step file

## PRD Lifecycle

PRDs track progress across multiple specs via the `status` field:

| Status | Meaning |
|--------|---------|
| `draft` | Work in progress (resumable via `stepsCompleted`) |
| `approved` | Ready — `rapid create-spec` will offer its stories |
| `in-progress` | At least one spec is being developed from this PRD |
| `done` | All planned stories have been implemented |

`stepsCompleted` tracks the create-prd workflow itself; `status` tracks the PRD's lifecycle across the project.

## Resume Behavior

If a draft PRD exists with partial `stepsCompleted`, step-01 will detect it and offer to continue.

## Output

- PRD file: `_rapid/output/prds/prd-{date}-{slug}.md`
- Template: `_rapid/templates/prd-template.md`
- Status: `approved` after user confirmation
- `rapid create-spec` will automatically detect approved PRDs and offer their stories

## Next Steps

- `rapid create-spec` — pick a story from this PRD and turn it into an implementation spec

## Start

→ Read fully and follow [steps/step-01-init.md](steps/step-01-init.md).
