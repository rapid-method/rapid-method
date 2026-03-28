# {Title} - Tech Spec

---
title: '{title}'
type: 'feature | bugfix | refactor | chore'
created: '{date}'
status: 'draft | ready-for-dev | in-progress | done'
branch: '{branch_name}'
baseline_commit: ''
prd_ref: ''
---

<frozen-after-approval>

## Intent

**Problem:**
<!-- 1-2 sentences -->

**Approach:**
<!-- 1-2 sentences -->

## Boundaries

**Always:**
-

**Ask First:**
-

**Never:**
-

## I/O & Edge Cases

| Scenario | Input | Expected Output | Error Handling |
|----------|-------|-----------------|----------------|
| Happy path | | | |
| Edge case | | | |
| Error | | | |

</frozen-after-approval>

---

## Code Map

| File | Role |
|------|------|
| `path/to/file` | |

---

## Tasks

### Task 1: {Description}
- [ ] `file.ts` -- ACTION -- REASON

```gherkin
Given PRECONDITION
When ACTION
Then RESULT
```

### Task 2: {Description}
- [ ] `file.ts` -- ACTION -- REASON

```gherkin
Given PRECONDITION
When ACTION
Then RESULT
```

---

## Verification

```bash
# Test
npm test

# Build
npm run build

# Lint
npm run lint
```

---

## Change Log
<!-- Append-only during review -->

---

## Review Order
<!-- Populated after implementation -->
1. [file:line](path#L1) -- Description
