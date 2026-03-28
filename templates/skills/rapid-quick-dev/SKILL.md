# RAPID Quick Dev

Main development workflow: Branch → Spec → Implement → Review

## Trigger
- User says "rapid quick-dev" or "quick dev"
- User wants to implement a feature, fix, or change

## Workflow

```
┌─────────────────────────────────────────────────┐
│              RAPID Quick Dev                     │
├─────────────────────────────────────────────────┤
│  Clarify → Branch → Spec → Implement → Review   │
│     │                                      │    │
│     └──── Zero Blast Radius? ─────────────→┘    │
│              (One-Shot Path)                    │
└─────────────────────────────────────────────────┘
```

## Prerequisites
1. Load `_rapid/config.yaml`
2. Load `_rapid/project-context.md` if exists
3. Load `_rapid/project-patterns.md` if exists
4. Communicate in `{communication_language}` from config

## Steps

Execute sequentially:
1. `step-01-clarify.md` - Understand intent, create branch
2. `step-02-spec.md` - Create tech specification
3. `step-03-implement.md` - Execute implementation
4. `step-04-review.md` - Review and present

Alternative:
- `step-oneshot.md` - Fast path for simple changes

## Rules
- NEVER load multiple steps at once
- ALWAYS read entire step before executing
- NEVER skip steps
- ALWAYS get user approval before implementation
