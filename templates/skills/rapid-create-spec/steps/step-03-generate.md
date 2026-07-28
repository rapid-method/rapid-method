# Step 3: Generate the Full Spec (Silent)

**Goal**: Generate the complete spec from intent (step-01) + investigation (step-02). **No user interaction in this step.** Create the WIP file, fill every section, run a silent Ready-for-Dev self-check, then move to review.

**Previous step**: [step-02-investigate.md](step-02-investigate.md)
**Next step**: [step-04-review.md](step-04-review.md)

---

## 1. Determine Slug & Type

From the captured intent, derive:
- `slug` — lowercase, hyphens, descriptive but short (e.g. `signup-sync-email`, `dashboard-filter-bug`)
- `type` — `feature` | `bugfix` | `refactor` | `chore`
- `branch` — current git branch
- `prd_ref` — from step-01 if path [P] was taken, else empty

## 2. Create the WIP File

Copy `_rapid/templates/tech-spec-template.md` to:

```
_rapid/output/specs/spec-{timestamp}-{slug}-wip.md
```

Fill the frontmatter:

```yaml
---
title: '{title}'
type: '{type}'
created: '{date}'
status: 'draft'
branch: '{branch}'
baseline_commit: ''
prd_ref: '{prd_ref or empty}'
stepsCompleted: [1, 2, 3]
---
```

## 3. Generate Every Section

Fill the spec sections directly from intent + investigation. Generation is heads-down writing — questions belonged in step-02. But if a genuinely blocking ambiguity slipped through, **ask rather than guess wrong**; otherwise make the best call from context and surface it as a Review Note in step-04.

### Intent

```markdown
## Intent

**Problem:**
{1-2 sentence concrete problem statement from step-01}

**Approach:**
{1-2 sentence high-level technical approach from step-02 decisions}
```

### Boundaries

Three lists. Derive from user's answers in step-02 and from the investigation. If a list is genuinely empty, write `- (none)` rather than skipping it.

```markdown
## Boundaries

**Always:**
- {must include / must respect}

**Ask First:**
- {needs user approval before action}

**Never:**
- {out of scope / forbidden}
```

### I/O & Edge Cases

Generate at minimum: 1 happy path + 1 edge case + 1 error. Pull edge cases from your scan ("what could go wrong with this code path?") not from imagination.

```markdown
## I/O & Edge Cases

| Scenario | Input | Expected Output | Error Handling |
|----------|-------|-----------------|----------------|
| Happy path | ... | ... | n/a |
| Edge: ... | ... | ... | ... |
| Error: ... | ... | ... | ... |
```

### Code Map

Every file the tasks will touch. Each row has a real path (no fantasy) and a clear role.

```markdown
## Code Map

| File | Role |
|------|------|
| `path/to/file.ts` | {extend / reference / new / test target} |
```

### Tasks

Ordered by dependency (foundation → service → API → UI). Each task names a file, an action, and a one-line reason.

```markdown
## Tasks

### Task 1: {short description}
- [ ] `path/to/file.ts` — ACTION — REASON
- [ ] `path/to/file.test.ts` — ACTION — REASON

### Task 2: {short description}
- [ ] ...
```

**Complexity sanity check** (silent, no user halt):

| Tasks | Files | Action |
|-------|-------|--------|
| 1-3 | 1-3 | Optimal — proceed |
| 4-6 | 4-8 | Acceptable — proceed |
| 7+ | 9+ | Surface in step-04 Review Notes as "consider splitting" |

### Acceptance Criteria

Each task / I/O row → at least one Given/When/Then. Cover happy + edge + error. Each `Always`/`Never` boundary should have an AC proving it holds.

```markdown
## Acceptance Criteria

1. **{title}**
   ```gherkin
   Given ...
   When ...
   Then ...
   ```
2. **{title}**
   ```gherkin
   ...
   ```
```

### Verification

Look up real commands from `package.json` / `Makefile` / `pyproject.toml` / etc. **Do not invent commands.** If a command doesn't exist (e.g. no lint), write `# (none)`.

```bash
# Test
{actual test command, scoped to changed files when possible}

# Type check
{actual command or # (none)}

# Lint
{actual command or # (none)}

# Build
{actual command or # (none)}
```

## 4. Save the WIP File

Write everything to the WIP file. Verify `stepsCompleted: [1, 2, 3]` is set in frontmatter.

## 5. Silent Ready-for-Dev Self-Check

Run through this checklist internally. Apply non-controversial fixes directly (e.g. tighten a vague task description, reorder a misplaced step). For any **substantive** issue, hold it as a Review Note for step-04 — don't fix it silently if the user might disagree.

### Actionable
- [ ] Every task names a specific file path (no `path/to/...`)
- [ ] Every task says **what** to do, not just **where**
- [ ] No "TBD", "figure out", or "investigate" in tasks

### Logical
- [ ] Tasks ordered by dependency
- [ ] No task depends on a file/function created in a later task
- [ ] Test tasks come right after (or are folded into) what they verify

### Testable
- [ ] Every AC uses Given/When/Then
- [ ] ACs cover happy path + at least one edge + at least one error
- [ ] Each `Always`/`Never` boundary has a corresponding AC
- [ ] ACs are concrete (specific values, observable signals)

### Complete
- [ ] No placeholders, no TBDs, no `{vars}` left unfilled
- [ ] Code Map lists every file the tasks touch
- [ ] Verification commands are real (looked up, not invented)

### Self-Contained
- [ ] A fresh agent reading **only this spec** could implement it
- [ ] Tech context captured in Code Map / Tasks
- [ ] No "see our conversation" or "as discussed" references

### Bounded
- [ ] Intent, Boundaries, I/O sections will lock cleanly on approval
- [ ] Boundaries are specific enough to prevent drift

### Drift / Scope / Missing context lenses
- Could the dev agent reasonably misinterpret any task? → tighten now
- Does any task touch a file outside the Code Map? → fix now
- Did you sneak in refactors that weren't asked for? → remove now or flag in Review Notes
- Edge cases the user may have missed? → flag in Review Notes

Hold any unresolved issues in a `review_notes` list to surface in step-04.

## 6. Transition (silent — no user halt)

Move directly to review. Do **not** show the spec yet — that happens in step-04.

→ Read fully and follow [step-04-review.md](step-04-review.md).
