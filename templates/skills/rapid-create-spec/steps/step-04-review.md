# Step 4: Review & Finalize

**Goal**: Present the complete spec, iterate on edits if needed, and finalize on approval. This is **user interaction #3 of 3**.

**Previous step**: [step-03-generate.md](step-03-generate.md)

---

## 1. Read the WIP File

Read the current WIP spec file fully. You should see:

- Frontmatter with `stepsCompleted: [1, 2, 3]`
- All sections filled: Intent, Boundaries, I/O, Code Map, Tasks, ACs, Verification

If anything is missing, return to step-03 and finish generating before continuing.

## 2. Present for Approval (User Interaction #3)

Show the **complete spec** plus stats and any review notes from step-03:

```markdown
## Tech Spec Ready: {title}

**Type**: {type}  |  **Branch**: {branch}
{If linked}: **PRD**: `{prd_ref}`

### Stats
- {task_count} tasks across {file_count} files
- {ac_count} acceptance criteria
- Complexity: {optimal | acceptable | consider splitting}

{If step-03 surfaced review notes}:
### Review Notes
- {substantive issue or risk that needs your call}
- {edge case to confirm}

---

### Full Spec

{paste the complete spec content from the WIP file}

---
[A] Approve & finalize  [E] Edit a section  [C] Cancel
```

## 3. Handle Choice

### [A] Approve
→ continue to section 4 (Finalize)

### [E] Edit
- Ask: "Which section needs changes, and what should change?"
- Apply the edits to the WIP file
- Re-run the silent Ready-for-Dev self-check from step-03 (sections 5) since edits may invalidate it
- Re-present the complete spec (loop back to section 2)

The user can edit as many times as needed. **Do not halt for confirmation between edits** — just apply, re-check, re-present.

### [C] Cancel
- Confirm: "Discard the spec, or keep it as a WIP for later?"
- **Discard** → delete the WIP file
- **Keep** → leave the WIP file on disk with current `stepsCompleted` so it can be resumed via step-01's WIP check

## 4. Finalize

On approval:

1. **Update frontmatter**:
   ```yaml
   status: 'ready-for-dev'
   stepsCompleted: [1, 2, 3, 4]
   ```

2. **Freeze the contract sections** — ensure Intent, Boundaries, and I/O & Edge Cases are inside the `<frozen-after-approval>` markers in the file. These must not be edited by `rapid dev` later.

3. **Rename the WIP file**:
   - From: `_rapid/output/specs/spec-{timestamp}-{slug}-wip.md`
   - To: `_rapid/output/specs/spec-{timestamp}-{slug}.md`

4. **Present completion**:

```
## Spec Ready for Development ✓

**File**: _rapid/output/specs/spec-{timestamp}-{slug}.md
**Status**: ready-for-dev
**Frozen**: Intent, Boundaries, I/O & Edge Cases

### Recommended Next Step
- `rapid dev` — Start implementation

The dev agent will pick this up and walk the task list. The frozen sections are locked — if implementation reveals they need to change, the dev agent will surface that as a question rather than silently drifting.
```

The spec is done. No more steps to load.
