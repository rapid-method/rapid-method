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
- **Tight** — overflow detail goes in the PRD later
- **Executive Summary last** — write it after all sections are complete so it reflects the full picture

## 3. Fan Out Review Subagents

Do this silently — don't announce that you're running a review or launching subagents. Just apply the results (section 4) and present the polished draft (section 5).

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

## 4. Triage the Findings by Importance

From the subagent results, sort every finding:
- **Basics** (typos, phrasing, small consistency fixes) → apply directly and silently.
- **Essentials** (substantive gaps, risks, or decisions that change what the brief *means*) → hold as questions for the next section. Keep this set tight — only what genuinely needs the user's call.

## 5. Ask the Essentials First (User Interaction)

Before showing the finished brief, put the essential findings to the user **as questions** — one focused batch, each with a recommended default. Don't make them hunt through an edit menu; you drive the important decisions:

> - "The review flagged {issue}. {Concrete question} — I'd go with {default}. That, or something else?"
> - "{another essential}"

Apply their answers to the brief. If there were no essentials, skip straight to section 6.

## 6. Present the Overview & Decide (User Interaction)

Now show how it turned out — lead with the plain-prose overview (what it is, who it's for, the problem it solves, the MVP-vs-later scope shape), then the full brief for the read:

```
## Product Brief Ready

{2–4 sentence overview in prose. Read like an executive summary spoken aloud — no lists of counts.}

### Full Brief
{complete brief content}

---
[A] Approve   [E] Edit a section
```

- **[A] Approve** → route to Stage 5
- **[E] Edit** → ask which section, apply the change, re-present the overview

Loop until the user approves.

→ On approval, read fully and follow [finalize.md](finalize.md).
