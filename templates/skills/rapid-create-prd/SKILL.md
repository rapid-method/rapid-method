# RAPID Create PRD (Plan Flow)

Create a Product Requirements Document for a feature. Part of the **Plan Flow** — helps users who don't have a clear picture of what they want to build, guiding them from vague idea to concrete requirements.

PRDs track features across multiple specs. Each user story in a PRD can become a separate spec, allowing incremental delivery while keeping the big picture visible.

## Trigger
- User says "rapid create-prd" or "create prd"
- User is unsure about what they want to build
- User wants to plan a feature before creating specs

## Prerequisites
- Load `_rapid/config.yaml`
- Load `_rapid/project-architecture.md` if exists
- Load `_rapid/project-patterns.md` if exists
- Communicate in `{communication_language}`
- Output in `{document_language}`

## Workflow

### 1. Load Context

- Load config and project docs
- Check for related product briefs in `_rapid/output/briefs/`
- If a brief exists, use it as context for the feature

---

### 2. Feature Discovery

**Guide the user through discovery.** The goal is to go from vague idea to clear feature definition.

**Start with the big picture:**

"What feature are you thinking about? Even a rough idea is fine."

**Then drill down with targeted questions:**

a) **Goal** (required):
- What problem does this feature solve?
- Who benefits from it?
- Why is it needed now?

b) **User Stories** (required):
- Walk through: "As a [user], I want to [action], so that [benefit]"
- Capture 2-5 stories that cover the feature

c) **Scope** (required):
- What's included?
- What's explicitly NOT included? (this prevents scope creep later)

d) **Expected Behavior** (required):
- Happy path: what should happen?
- Edge cases: what could go wrong?
- Errors: how should the system respond?

e) **Acceptance Criteria** (required):
- Define Given/When/Then for each user story

**Adapt to `{user_skill_level}`:**
- Non-technical users → plain language, concrete examples
- Technical users → can be more precise

**After discovery, confirm understanding:**
```
Got it. Here's what I understood:

**Feature:** {1 sentence}
**Goal:** {1 sentence}
**Scope:** {in} / {out}
**Stories:** {count} user stories

Correct? (y/n)
```

If no, clarify. If yes, continue.

---

### 3. Generate PRD

**Create the PRD file immediately:**

Use template: `_rapid/templates/prd-template.md`
Save to: `_rapid/output/prds/prd-{date}-{slug}.md`

Fill all sections from the discovery conversation.

---

### 4. Present for Approval

```markdown
## PRD Ready

**Feature:** {title}
**Stories:** {story_count}
**ACs:** {ac_count}

{Show full PRD content}

---
[A] Approve  [E] Edit  [C] Cancel
```

**Handle choice:**

- `[A] Approve`:
  - Set status: `approved`
  - Done. Suggest: "Run `rapid create-spec` to plan the implementation"

- `[E] Edit`:
  - Ask what to change
  - Apply changes
  - Re-present (loop back to step 4)

- `[C] Cancel`:
  - Confirm: "Delete the draft? (y/n)"
  - If yes: delete file
  - If no: keep as draft for later

---

## Flow Summary

```
[Load Context] → [Feature Discovery] → [Generate PRD] → [Approve]
      ↓                  ↓                   ↓              ↓
   (silent)        Goal → Stories →       (silent)        A/E/C
                   Scope → Behavior →
                   ACs
```

Only 2 user interactions: Discovery → Approval

---

## PRD Lifecycle

PRDs track progress across multiple specs:

| Status | Meaning |
|--------|---------|
| `draft` | Work in progress |
| `approved` | Ready — `rapid create-spec` will offer its stories |
| `in-progress` | At least one spec is being developed from this PRD |
| `done` | All planned stories have been implemented |

## Output
- PRD file saved with status `approved`
- `rapid create-spec` will automatically detect this PRD and offer its stories

## Next Steps
- `rapid create-spec` — Will find this PRD and let you pick a story to implement
