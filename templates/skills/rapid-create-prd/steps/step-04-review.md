# Step 4: Review & Approve

**Goal**: Present the complete PRD, iterate on edits if needed, and finalize on approval. This is **user interaction #3 of 3**.

**Previous step**: [step-03-generate.md](step-03-generate.md)

---

## 1. Read the PRD File

Read the current draft PRD file fully. You should see:

- Frontmatter with `status: 'draft'` and `stepsCompleted: [1, 2, 3]`
- All sections filled: Overview, User Stories, Scope, Expected Behavior, Acceptance Criteria, Open Questions

If anything is missing, return to step-03 and finish generating before continuing.

## 2. Present for Approval (User Interaction #3)

Show the **complete PRD** plus stats and any review notes from step-03:

```markdown
## PRD Ready: {title}

**Feature**: `{feature_slug}`
{If linked to brief}: **Brief**: `{brief_ref}`

### Stats
- {story_count} user stories ({must_count} must / {should_count} should / {could_count} could)
- {ac_count} acceptance criteria
- {out_of_scope_count} explicit out-of-scope items
- {open_questions_count} open questions

{If step-03 surfaced review notes}:
### Review Notes
- {substantive issue, gap, or tension that needs your call}
- {another}

### Full PRD

{paste the complete PRD content from the file}

---
[A] Approve  [E] Edit a section  [C] Cancel
```

## 3. Handle Choice

### [A] Approve
→ continue to section 4 (Finalize)

### [E] Edit
- Ask: "Which section needs changes, and what should change?"
- Apply the edits to the PRD file
- Re-run the silent self-check from step-03 (section 5) since edits may invalidate it
- Re-present the complete PRD (loop back to section 2)

The user can edit as many times as needed. **Do not halt for confirmation between edits** — just apply, re-check, re-present.

### [C] Cancel
- Confirm: "Discard the PRD, or keep it as a draft for later?"
- **Discard** → delete the file
- **Keep** → leave the file on disk with `status: draft` and current `stepsCompleted` so it can be resumed via step-01's resume detection

## 4. Finalize

On approval:

1. **Update frontmatter**:
   ```yaml
   status: 'approved'
   stepsCompleted: [1, 2, 3, 4]
   ```

2. **Save the file**.

3. **Present completion**:

```
## PRD Approved ✓

**File**: _rapid/output/prds/prd-{date}-{slug}.md
**Status**: approved
**Stories**: {story_count} ({must_count} must / {should_count} should / {could_count} could)

### Recommended Next Step
- `rapid create-spec` — pick a story from this PRD and turn it into an implementation spec

The PRD is now visible to `rapid create-spec`, which will offer its stories when invoked. As specs get implemented, the PRD's status will progress: `approved` → `in-progress` → `done`.
```

The PRD is done. No more steps to load.
