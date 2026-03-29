# Step 1: Create Branch

## Objective
Read the approved spec and create a semantic branch for the work.

## Actions

### 1.1 Load Spec
- Find the most recent spec with status `ready-for-dev` in `_rapid/output/specs/`
- Read frozen sections (Intent, Boundaries, I/O)
- Confirm with user this is the correct spec

### 1.2 Git Check
```bash
git status
```
- Warn if dirty working tree
- Confirm correct base branch

### 1.3 Create Branch

**Determine type from spec:**
| Type | Prefix |
|------|--------|
| Feature | `feature/` |
| Bug fix | `fix/` |
| Refactor | `refactor/` |
| Chore | `chore/` |
| Docs | `docs/` |
| Performance | `perf/` |
| Hotfix | `hotfix/` |

**Rules:**
- Lowercase, kebab-case
- Short but descriptive
- Include ticket if available: `feature/ABC-123-user-auth`

**Confirm:**
```
Creating branch: feature/user-authentication
Base: main
Spec: {spec_title}

[Y] Create  [C] Change name  [S] Skip
```

If approved:
```bash
git checkout -b {branch_name}
```

### 1.4 Update Spec
Set spec status: `in-progress`

## Output
- Branch created
- Spec status: `in-progress`
- → Proceed to `step-02-implement.md`
