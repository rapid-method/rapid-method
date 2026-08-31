# Stage 5: Finalize

**Goal:** Lock the brief, save the final version, and offer clear next steps.

**Previous stage**: [draft-and-review.md](draft-and-review.md)

---

## 1. Save Final Version

On user approval:

1. Update frontmatter: `stagesCompleted: [1, 2, 3, 4, 5]`
2. Save the file

## 2. Present Completion

```
## Brief Approved

**File**: _rapid-output/brief.md

### Recommended Next Steps
- `rapid create-prd` — Create a PRD for a specific capability in the brief
- `rapid create-architecture` — Document/plan project architecture
- `rapid create-patterns` — Capture/set coding patterns
```

## 3. Offer Distillate (Optional)

If during Stages 1–3 the user shared information beyond brief scope (technical preferences, timeline details, team constraints, implementation ideas), offer to save it:

> "You mentioned some things during our conversation that go beyond the brief — {examples}. Want me to save these as notes for the PRD or spec phase?"

If yes, write to `_rapid-output/brief-distillate.md` with the captured context, organized by likely destination (PRD, architecture, patterns).

The brief is done. No more stages to load.
