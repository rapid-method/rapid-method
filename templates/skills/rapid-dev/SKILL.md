# RAPID Dev

Main development workflow: Branch → Implement + AI Review → Human Review.

## Trigger
- User says "rapid dev" or "rapid develop"
- User wants to implement an approved spec

## Prerequisites
1. Load `_rapid/config.yaml`
2. Load `_rapid/project-architecture.md` if exists
3. Load all rules from `_rapid/rules/*.md` if exists
4. Communicate in `{communication_language}` from config
5. **An approved spec must exist** with status `ready-for-dev`

If no approved spec exists:
```
No approved spec found.
Run `rapid create-spec` first to create and approve a tech spec.
```

## Steps

Execute sequentially:
1. `step-01-branch.md` — Create semantic branch
2. `step-02-implement.md` — Execute tasks + AI code review
3. `step-03-review.md` — Present for human code review

## Rules
- NEVER load multiple steps at once
- ALWAYS read entire step before executing
- NEVER skip steps
- ALWAYS follow the approved spec
- NEVER change code outside spec scope
