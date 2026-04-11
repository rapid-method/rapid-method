# Step 7: Draft, Self-Review & Approval

**Goal**: Polish the assembled brief, run a three-lens self-review, present it for approval, and finalize.

**Previous step**: [step-06-acceptance.md](step-06-acceptance.md)

---

## 1. Polish the Brief

By this point the brief file already has all six sections appended. Now:

1. Read the current brief file in full
2. Polish the **Executive Summary** (it was a stub from step-02 — make it sharp now that you have the full picture)
3. Fill in **Open Questions** if any came up during discovery
4. Tighten prose for consistency — remove duplication, ensure tone is decisive

### Writing principles

- **Lead with the problem**, not the solution
- **Concrete > abstract** — "reduces onboarding from 3 days to 30 minutes" beats "improves onboarding"
- **Confident voice** — this is a decision document, not a proposal
- **Tight** — overflow detail goes in Open Questions or in the PRD later

---

## 2. Self-Review Through Three Lenses

Apply non-controversial improvements directly. For substantive issues, note them as Review Notes to surface to the user.

### Lens 1: Consistency

- Do all sections trace back to the **core problem statement**?
- Do the must-have features each create the **aha moment** defined for the persona?
- Do the success metrics measure whether the **persona** got value?
- Does the MVP scope align with what the metrics will measure?
- Are constraints respected by the must-have list?

If any section drifts from the core problem, flag it.

### Lens 2: Gaps & Risks

- What's missing or thin?
- Which assumptions are untested or load-bearing?
- Are differentiators actually defensible, or just feature claims?
- Is v1 scope realistic given the constraints?
- Are there unstated dependencies?

### Lens 3: Opportunities

- Any adjacent value being left on the table?
- Are success metrics ambitious enough to matter, or too safe?
- Is the positioning clear and sharp?

---

## 3. Present to User

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

{If self-review surfaced questions or risks}:
### Review Notes
While drafting, I noticed:
- {substantive question, risk, or suggestion}
- {another}

### Full Brief
{complete brief content}

---
[A] Approve  [E] Edit section  [C] Cancel
```

---

## 4. Iterate

- **[A] Approve** → go to section 5
- **[E] Edit** → ask which section to refine, apply changes, re-present (loop back to section 3)
- **[C] Cancel** → confirm. Brief stays on disk with partial `stepsCompleted` so it can be resumed later.

The user can edit as many times as needed. Each time, re-present the summary with the changes highlighted.

---

## 5. Finalize

On approval:

1. Ensure `stepsCompleted: [1, 2, 3, 4, 5, 6, 7]` is set
2. Save the final version
3. Present completion:

```
## Brief Approved ✓

**File**: _rapid/output/briefs/brief-{slug}-{date}.md

### Recommended Next Steps
- `rapid create-prd` — Create a PRD for a specific feature in the brief
- `rapid create-architecture` — Document/plan project architecture
- `rapid create-patterns` — Capture/set coding patterns
```

The brief is done. No more steps to load.
