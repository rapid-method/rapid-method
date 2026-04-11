# Step 3: Generate the Full PRD (Silent)

**Goal**: Generate the complete PRD from the captured intent + discovery answers. **No user interaction in this step.** Create the PRD file, fill every section, run a silent self-check, then move to review.

**Previous step**: [step-02-discover.md](step-02-discover.md)
**Next step**: [step-04-review.md](step-04-review.md)

---

## 1. Determine Slug & Path

From the captured feature title, derive:
- `slug` — lowercase, hyphens, descriptive but short (e.g. `file-upload`, `dashboard-filters`, `signup-otp`)
- `feature_slug` — same format, used in frontmatter
- `brief_ref` — relative path to the linked brief if any, else empty
- File path: `_rapid/output/prds/prd-{date}-{slug}.md`

## 2. Create the PRD File

Copy `_rapid/templates/prd-template.md` to the path above. Fill the frontmatter:

```yaml
---
title: '{title}'
created: '{date}'
status: 'draft'
feature: '{feature_slug}'
brief_ref: '{brief_path or empty}'
owner: '{user_name from config}'
stepsCompleted: [1, 2, 3]
---
```

## 3. Generate Every Section

Fill the PRD sections directly from the discovery captures. **Do not ask the user anything.** If something is uncertain, surface it as an Open Question — don't fantasize.

### Overview

```markdown
## Overview

**Goal**: {1-2 sentence concrete statement of what this feature achieves}

**Target Users**: {persona name(s) from brief, with one-line role descriptions}

**Context**: {why now — pulled from brief's "Why Now" or from user's answer in step-02}
```

### User Stories

Build the table from `user_stories` captured in step-02. Each story has:
- `as_a` (persona)
- `want` (action)
- `so_that` (benefit)
- `priority` (must / should / could)

```markdown
## User Stories

| # | As a... | I want to... | So that... | Priority |
|---|---------|--------------|------------|----------|
| 1 | {persona} | {action} | {benefit} | must |
| 2 | {persona} | {action} | {benefit} | must |
| 3 | {persona} | {action} | {benefit} | should |
```

Aim for **2-5 stories**. If the user proposed more in step-02, push the lower-priority ones to a separate "Future Stories" subsection or mark them as `could`.

### Scope

```markdown
## Scope

**In Scope:**
- {bullet from in_scope}

**Out of Scope:**
- {bullet from out_of_scope, each with one-line rationale}
```

The Out of Scope list is **mandatory** — never leave it empty. If the user didn't explicitly exclude anything, surface candidate exclusions based on what's adjacent to this feature (e.g. "admin dashboard for managing uploads — out of scope, this PRD is end-user focused").

### Expected Behavior

Build the table with at minimum 1 happy path + 1 edge case + 1 error:

```markdown
## Expected Behavior

| Scenario | User does... | System should... |
|----------|-------------|------------------|
| Happy path | {action} | {response} |
| Edge: {description} | {action} | {response} |
| Error: {description} | {action} | {response} |
```

### Acceptance Criteria

For each user story, generate at least one Given/When/Then. Cross-reference the story number.

```markdown
## Acceptance Criteria

| # | Story # | Given | When | Then |
|---|---------|-------|------|------|
| 1 | 1 | {precondition} | {action} | {result} |
| 2 | 1 | {precondition} | {action} | {result} |
| 3 | 2 | {precondition} | {action} | {result} |
```

Make ACs concrete:
- ❌ "Should work properly"
- ✅ "Then the file appears in the user's library within 2 seconds and a success toast is shown"

Cover the boundaries from Expected Behavior:
- Happy path of each must-have story → at least 1 AC
- The edge case → at least 1 AC
- The error path → at least 1 AC

### Open Questions

If anything from step-02 was left unanswered, list it here:

```markdown
## Open Questions

| # | Question | Owner | Status |
|---|----------|-------|--------|
| 1 | {question that came up but wasn't resolved} | {user} | open |
```

If everything was resolved, write a single row: `1 | (none) | — | —`.

## 4. Save the PRD File

Write everything to the file. Verify `stepsCompleted: [1, 2, 3]` is set in frontmatter.

## 5. Silent Self-Check

Run through this checklist internally. Apply non-controversial fixes directly. For substantive issues, hold them as Review Notes for step-04.

### Coverage
- [ ] Every must-have story has at least 1 AC
- [ ] At least 1 edge case AC
- [ ] At least 1 error path AC
- [ ] Out of Scope list is non-empty
- [ ] Each persona referenced in stories actually exists in the brief (if linked)

### Concreteness
- [ ] Goal is 1-2 sentences, no buzzwords
- [ ] Each story has a real persona (not "user")
- [ ] Each AC has specific values where applicable (numbers, states, observable signals)
- [ ] No "TBD", "figure out", "tbd later" in any field

### Consistency with brief
- [ ] In Scope items don't contradict the brief's Out of Scope
- [ ] Personas match the brief's primary/secondary
- [ ] Feature priority aligns with brief's must/should/could

### Self-Contained
- [ ] A reader who hasn't seen the conversation can understand what this PRD covers
- [ ] No "as discussed" or "see our chat" references

Hold any unresolved issues in a `review_notes` list to surface in step-04.

## 6. Transition (silent — no user halt)

Move directly to review. Do **not** show the PRD yet — that happens in step-04.

→ Read fully and follow [step-04-review.md](step-04-review.md).
