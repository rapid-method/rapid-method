# RAPID Help

Get help with RAPID methodology.

## Trigger
- User says "rapid help" or "rapid"
- User asks about RAPID

## Output

```markdown
# RAPID

**R**equirements · **A**rchitecture · **P**atterns · **I**mplementation · **D**elivery

Lean AI-assisted development for Claude Code.

---

## Commands

| Command | Description |
|---------|-------------|
| `rapid quick-dev` | Main workflow: Branch → Spec → Implement |
| `rapid create-prd` | Create Product Requirements Document |
| `rapid create-context` | Document project context |
| `rapid create-patterns` | Define coding patterns |
| `rapid help` | Show this help |

---

## Quick Start

1. **Setup knowledge** (recommended)
   ```
   rapid create-context
   rapid create-patterns
   ```

2. **Start developing**
   ```
   rapid quick-dev "add user authentication"
   ```

---

## Workflow

```
PRD (once) ─────────────────────┐
Context (once) ──────────────┐  │
Patterns (once) ──────────┐  │  │
                          │  │  │
┌─────────────────────────┴──┴──┴─┐
│        rapid quick-dev          │
│                                 │
│  Clarify → Branch → Spec →      │
│  Implement → Review             │
│                                 │
│  (repeats per task)             │
└─────────────────────────────────┘
```

---

## Structure

```
_rapid/
├── config.yaml
├── project-context.md
├── project-patterns.md
├── templates/
└── output/
    ├── prd/
    └── specs/
```

---

## Tips

- Keep specs focused (900-1600 tokens)
- Update context/patterns when project evolves
- Use one-shot for simple changes
- Review suggested order after implementation

---

Need help? Just ask!
```
