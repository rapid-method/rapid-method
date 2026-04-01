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
| `rapid project-scan` | Scan existing project (architecture + rules) |
| `rapid create-rule` | Add or update coding rules |
| `rapid create-spec` | Create tech spec for a task |
| `rapid dev` | Implement an approved spec |
| `rapid oneshot` | Fast path for simple changes |
| `rapid help` | Show this help |

---

## Getting Started

### New project (no code yet)
```
1. rapid create-brief    ← define what you're building
                           (includes tech stack & initial rules)
2. rapid create-spec     ← create spec for first task
3. rapid dev             ← implement
```

### Existing project
```
1. rapid project-scan    ← scan architecture & detect patterns
                           (creates rules from existing code)
2. rapid create-brief    ← define next feature
3. rapid create-spec     ← create spec for task
4. rapid dev             ← implement
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
├── rules/
│   ├── code-style.md
│   ├── naming.md
│   ├── architecture.md
│   ├── error-handling.md
│   ├── api.md
│   ├── testing.md
│   └── git.md
├── templates/
└── output/
    ├── briefs/
    └── specs/
```

---

## Tips

- Keep specs focused (900-1600 tokens)
- Use `rapid create-rule` to add new coding standards
- Use `rapid project-scan --update` when project evolves
- Use `rapid oneshot` for simple, isolated changes
- Use `rapid create-spec` + `rapid dev` for everything else

---

Need help? Just ask!
```
