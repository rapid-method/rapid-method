# RAPID Help

Get help with RAPID methodology.

## Trigger
- User says "rapid help" or "rapid"
- User asks about RAPID

## Output

```markdown
# RAPID

**R**equirements · **A**rchitecture · **P**atterns · **I**mplementation · **D**elivery

Lean, spec-driven methodology for AI-assisted development.

---

## Commands

| Command | Flow | Description |
|---------|------|-------------|
| `rapid create-brief` | Initiation | Create Product Brief (requirements) |
| `rapid create-architecture` | Initiation | Document project architecture |
| `rapid create-patterns` | Initiation | Define coding patterns |
| `rapid create-prd` | Plan | Create PRD for a feature |
| `rapid create-spec` | Development | Create tech spec for a task |
| `rapid dev` | Development | Implement an approved spec |
| `rapid oneshot` | Development | Fast path for simple changes |
| `rapid help` | — | Show this help |

---

## Initiation Flow (one-time setup)

```
1. rapid create-brief         ← define what you're building
2. rapid create-architecture  ← document/plan the architecture
3. rapid create-patterns      ← capture/set coding standards
```

---

## Plan Flow (per feature)

```
┌──────────────────────────────────────────┐
│            RAPID Plan Flow               │
├──────────────────────────────────────────┤
│                                          │
│  rapid create-prd                        │
│    Feature discovery → User Stories      │
│    → Scope → Approval                    │
│                                          │
│  PRDs track features across specs.       │
│  create-spec auto-detects pending PRDs.  │
└──────────────────────────────────────────┘
```

---

## Development Flow (per task)

```
┌──────────────────────────────────────────┐
│            RAPID Dev Flow                │
├──────────────────────────────────────────┤
│                                          │
│  rapid create-spec                       │
│    Check PRDs → Clarify → Investigate    │
│    → Write Spec → Approve               │
│             ↓                            │
│  rapid dev                               │
│    Branch → Implement + AI Review        │
│    → Human Code Review → Commit          │
│                                          │
│  (repeats per task)                      │
├──────────────────────────────────────────┤
│                                          │
│  rapid oneshot                           │
│    Clarify → Branch → Implement          │
│    → Verify → Commit                     │
│                                          │
│  (for simple, isolated changes)          │
└──────────────────────────────────────────┘
```

---

## Structure

```
_rapid/
├── config.yaml
├── project-architecture.md
├── project-patterns.md
├── templates/
└── output/
    ├── briefs/
    ├── prds/
    └── specs/
```

---

## Tips

- Keep specs focused (900-1600 tokens)
- Update architecture/patterns when project evolves
- Use `rapid oneshot` for simple, isolated changes
- Use `rapid create-spec` + `rapid dev` for everything else
- Review suggested order after implementation

---

Need help? Just ask!
```
