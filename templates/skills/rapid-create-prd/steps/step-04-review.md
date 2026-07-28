# Step 4: Review & Approve

**Goal**: Present the complete PRD with stats and self-check findings, iterate on edits if needed, finalize on approval. This is **user interaction #3 of 3**.

**Previous step**: [step-03-generate.md](step-03-generate.md)

---

## 1. Read the PRD File

Read the current draft PRD file fully. You should see:

- Frontmatter with `status: 'draft'` and `stepsCompleted: [1, 2, 3]`
- All sections filled: Executive Summary, Success Criteria, Product Scope, User Journeys, Functional Requirements (with capability areas + FRs + stories), Non-Functional Requirements, optional Domain Requirements

If anything is missing, return to step-03 and finish generating before continuing.

## 2. Compute Stats

Hold internally for the presentation:
- `capability_area_count`
- `fr_count`
- `story_count` (split by must / should / could)
- `nfr_count`
- `success_criteria_count`
- `domain_req_count` (0 if section omitted)
- `open_questions_count`
- `out_of_scope_count`
- `journeys_count`

## 3. Present for Approval (User Interaction #3)

Lead with a short **plain-prose overview** — 2–4 sentences on the capability this PRD covers, who it serves, the problem it addresses, and the scope shape (MVP vs later). The gist first, not a table of counts. Then any review notes, then the full PRD for the read.

```markdown
## PRD Ready: {title}

**Feature**: `{feature_slug}`
{If linked to brief}: **Brief**: `{brief_ref}`

{2–4 sentence overview in prose: the capability, who it serves, the problem it addresses, and the MVP-vs-later scope shape.}

{If step-03 surfaced review notes}:
### Review Notes
- {substantive issue, gap, or tension that needs your call}
- {another}

### Full PRD

{paste the complete PRD content from the file}

---
[A] Approve  [E] Edit a section  [C] Cancel
```

## 4. Handle Choice

### [A] Approve
→ continue to section 5 (Finalize)

### [E] Edit
- Ask: "Which section needs changes, and what should change?"
- Apply the edits to the PRD file
- Re-run the silent self-check from step-03 (section 5) since edits may invalidate the SMART/density/coverage checks
- Re-present the complete PRD (loop back to section 3)

The user can edit as many times as needed. **Do not halt for confirmation between edits** — just apply, re-check, re-present.

Common edit requests and how to handle:
- "Add an FR to Area X" → add it, re-number subsequent FRs only if user explicitly wants, otherwise append
- "Tighten this NFR" → enforce SMART format
- "Move FR2 to Growth" → move the FR's MVP-priority stories to Growth scope, update story priorities
- "Change persona X to Y" → update across stories, journeys, and Executive Summary

### [C] Cancel
- Confirm: "Discard the PRD, or keep it as a draft for later?"
- **Discard** → delete the file
- **Keep** → leave the file on disk with `status: draft` and current `stepsCompleted` so step-01's resume detection picks it up next time

## 5. Finalize

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

### Capability Contract Locked
- {capability_area_count} capability areas
- {fr_count} Functional Requirements
- {story_count} stories ({must_count} must / {should_count} should / {could_count} could)
- {nfr_count} NFRs

### Recommended Next Step
- `rapid create-spec` — pick a story from this PRD and turn it into a tech spec

The PRD is now visible to `rapid create-spec`, which will offer its stories when invoked. As specs get implemented, the PRD's status progresses: `approved` → `in-progress` (first story picked up) → `done` (all `must` stories implemented).

Story status updates (`not started` → `in spec` → `in dev` → `done`) are maintained by `create-spec` and `dev`.
```

The PRD is done. No more steps to load.
