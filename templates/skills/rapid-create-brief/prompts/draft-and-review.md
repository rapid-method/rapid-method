# Stage 4: Draft & Review

**Goal:** Produce the brief file, run multi-lens review via subagents, and present a polished draft for approval.

**Previous stage**: [guided-elicitation.md](guided-elicitation.md)
**Next stage**: [finalize.md](finalize.md)

---

## 1. Create the Brief File

1. Copy `_rapid/templates/product-brief-template.md` to `_rapid/output/briefs/brief-{slug}-{date}.md`
2. Fill in frontmatter:
   - `title`, `created`, `owner` (from config `user_name`)
   - `inputDocuments`: list of files the user provided
   - `stagesCompleted: [1, 2, 3, 4]`

## 2. Draft All Sections

Write the complete brief in one pass. Fill every section from the template using everything gathered in Stages 1–3.

### Writing Principles

- **Lead with the problem**, not the solution
- **Concrete > abstract** — "reduces onboarding from 3 days to 30 minutes" beats "improves onboarding"
- **Confident voice** — this is a decision document, not a proposal
- **Tight** — overflow detail goes in Open Questions or in the PRD later
- **Executive Summary last** — write it after all sections are complete so it reflects the full picture

## 3. Fan Out Review Subagents

Launch three subagents in parallel, each reviewing the draft through a different lens:

### Subagent 1: Consistency Review

> Review this product brief for internal consistency:
> - Do all sections trace back to the core problem statement?
> - Do the must-have features each create the aha moment defined for the persona?
> - Do the success metrics measure whether the persona got value?
> - Does the MVP scope align with what the metrics will measure?
> - Are constraints respected by the must-have list?
> Flag any section that drifts from the core problem. Return a list of issues (or "No issues found").

### Subagent 2: Gaps & Risks Review

> Review this product brief for gaps and risks:
> - What's missing or thin?
> - Which assumptions are untested or load-bearing?
> - Are differentiators actually defensible, or just feature claims?
> - Is v1 scope realistic given the constraints?
> - Are there unstated dependencies?
> Return a list of gaps and risks (or "No significant gaps found").

### Subagent 3: Opportunities Review

> Review this product brief for missed opportunities:
> - Any adjacent value being left on the table?
> - Are success metrics ambitious enough to matter, or too safe?
> - Is the positioning clear and sharp?
> - Could the aha moment be stronger?
> Return a list of opportunities (or "No significant opportunities found").

## 4. Apply Non-Controversial Fixes

From the subagent results:
- **Apply directly**: typos, phrasing improvements, small consistency fixes
- **Save as Review Notes**: substantive issues that need the user's input

## 5. Present to User

```
## Product Brief Ready

**Title**: {title}
**Persona**: {primary persona name + role}
**Differentiator**: {one-line key differentiator}
**Features**: {must_count} must / {should_count} should / {could_count} could
**Out of Scope**: {count} items
**Metrics**: {user_metric_count} user / {business_metric_count} business
**MVP Gate**: {1 sentence}
**ACs**: {ac_count} scenarios

{If review surfaced substantive items}:
### Review Notes
While drafting, I noticed:
- {substantive question, risk, or suggestion}
- {another}

### Full Brief
{complete brief content}

---
[A] Approve  [E] Edit section  [R] Redo section
```

## 6. Iterate

- **[A] Approve** → route to Stage 5
- **[E] Edit** → ask which section to refine, apply changes, re-present
- **[R] Redo** → re-elicit a specific section, then re-draft

Loop back to section 5 after each edit until the user approves.

→ On approval, read fully and follow [finalize.md](finalize.md).
