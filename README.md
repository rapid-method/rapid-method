# RAPID

**R**equirements · **A**rchitecture · **P**atterns · **I**mplementation · **D**elivery

A lean AI-assisted development methodology for [Claude Code](https://claude.ai/code).

## Installation

```bash
npx rapid-method install
```

This will:
1. Ask for your preferences (name, language, skill level)
2. Configure the project
3. Install RAPID skills for Claude Code

## Usage

After installation, use these commands in Claude Code:

| Command | Description |
|---------|-------------|
| `rapid quick-dev "task"` | Main workflow: Branch → Spec → Implement → Review |
| `rapid create-prd` | Create Product Requirements Document |
| `rapid create-context` | Document project context for AI |
| `rapid create-patterns` | Define coding patterns and standards |
| `rapid help` | Show help |

## Quick Start

```bash
# 1. Install RAPID
npx rapid-method install

# 2. Document your project (recommended)
rapid create-context
rapid create-patterns

# 3. Start developing
rapid quick-dev "add user authentication"
```

## Workflow

```
┌─────────────────────────────────────────────────┐
│              RAPID Quick Dev                     │
├─────────────────────────────────────────────────┤
│                                                  │
│  1. Clarify intent                               │
│  2. Create feature branch (feature/fix/chore)   │
│  3. Write tech spec (with approval)             │
│  4. Implement following spec                    │
│  5. Review and commit                           │
│                                                  │
│  Simple changes? → One-shot fast path           │
│                                                  │
└─────────────────────────────────────────────────┘
```

## Structure

After installation:

```
your-project/
├── _rapid/
│   ├── config.yaml              # Your settings
│   ├── project-context.md       # Project context (optional)
│   ├── project-patterns.md      # Coding patterns (optional)
│   ├── templates/               # Document templates
│   └── output/
│       ├── prd/                 # PRD documents
│       └── specs/               # Tech specifications
└── .claude/
    └── skills/
        └── rapid-*/             # RAPID skills
```

## Features

- **Auto branch creation** - Creates `feature/`, `fix/`, `chore/` branches
- **Tech specs** - Structured specifications with approval flow
- **Project context** - AI-readable project documentation
- **Coding patterns** - Consistent code style enforcement
- **One-shot path** - Fast track for simple changes
- **Self-review** - Automated review with finding classification
- **Multi-language** - Configurable communication language

## Philosophy

- **Lean** - Minimal ceremony, maximum value
- **Spec-driven** - Clear specs before implementation
- **AI-native** - Designed for LLM-assisted development
- **Human-approved** - You approve before implementation starts

## License

MIT
