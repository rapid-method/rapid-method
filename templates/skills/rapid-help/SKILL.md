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

| Command | Description |
|---------|-------------|
| `rapid create-brief` | Create Product Brief (requirements) |
| `rapid create-architecture` | Document project architecture |
| `rapid create-patterns` | Define coding patterns |
| `rapid create-spec` | Create tech spec for a task |
| `rapid dev` | Implement an approved spec |
| `rapid oneshot` | Fast path for simple changes |
| `rapid help` | Show this help |

---

## Getting Started

### New project (no code yet)
```
1. rapid create-brief         ← define what you're building
2. rapid create-architecture  ← plan the architecture
3. rapid create-patterns      ← set coding standards
```

### Existing project
```
1. rapid create-architecture  ← document what exists
2. rapid create-patterns      ← capture current patterns
3. rapid create-brief         ← define next feature
```

---

## Development Workflow

```
┌──────────────────────────────────────────┐
│            RAPID Dev Flow                │
├──────────────────────────────────────────┤
│                                          │
│  rapid create-spec                       │
│    Clarify → Investigate → Write Spec    │
│    → Self-Review → User Approval         │
│                                          │
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
