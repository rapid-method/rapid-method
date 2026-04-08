# RAPID Create Brief

Create a Product Brief — the single requirements document for your project or feature.
Built through collaborative discovery, not a questionnaire.

## Trigger

- User says "rapid create-brief" or "create brief"
- User wants to define requirements for a project or feature

## Workflow Overview

| Stage | Purpose | Handler |
|-------|---------|---------|
| 1 | Understand Intent | SKILL.md (this file) |
| 2 | Guided Discovery | prompts/guided-discovery.md |
| 3 | Draft & Review | prompts/draft-and-review.md |

### Principle: Build With the User, Not At Them

- **One topic at a time** — never dump all questions at once
- **Reflect before asking** — show what you understood, then ask what's missing
- **Soft gates** — "Anything else on this, or shall we move on?" keeps the user in control
- **Capture silently** — if the user mentions constraints, tech details, or scope while talking about vision, note it internally and use it later. Don't redirect.

---

## Stage 1: Understand Intent

### 1.1 Load Config

- Load `_rapid/config.yaml`
- Communicate in `{communication_language}`
- Output in `{document_language}`

### 1.2 Detect Context

Check what the user brought:

| Scenario | Action |
|----------|--------|
| **Existing brief** (user references or provides one) | Read it fully. Ask: "What changed since this was written?" |
| **New project with context** (user provides docs, notes, ideas) | Acknowledge received materials. Summarize your understanding. Ask: "What else should I know before we start?" |
| **Blank slate** | Ask: "Tell me about the product or project — what are you building and why?" |

### 1.3 Capture Product Intent

Before moving to discovery, you need:
- A rough idea of **what** the product/project is
- A rough idea of **why** it matters (the problem or opportunity)

Don't force a rigid format. Let the user talk naturally. When you have enough context to know what they're building, summarize your understanding and confirm:

```
"So you're building [X] because [Y]. Is that right, or am I missing something?"
```

Then transition: **"Great — let's build the brief together. I'll walk through a few topics one at a time."**

→ **Route to**: `prompts/guided-discovery.md`

---

## Output

- Brief file: `_rapid/output/briefs/brief-{slug}-{date}.md`
- Template: `_rapid/templates/product-brief-template.md`
- Status: `approved` after user confirmation

## Next Steps

- `rapid create-architecture` — Document/plan project architecture
- `rapid create-patterns` — Capture/set coding patterns
