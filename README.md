# RAPID METHOD

[![Version](https://img.shields.io/npm/v/rapid-method?color=blue&label=version)](https://www.npmjs.com/package/rapid-method)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org)

**Requirements. Architecture. Patterns. Implementation. Delivery.** — A lean, spec-driven methodology for AI-assisted development. Structure your workflow from intent to deployment with human approval gates at every critical step.

**100% free and open source.** No paywalls. No gated content. Built for developers who want structured AI workflows without sacrificing speed.

## Why RAPID?

Most AI coding tools let you throw prompts at code and hope for the best. RAPID brings methodology to the chaos — structured specs before implementation, frozen intent to prevent scope creep, and self-review before you ever see the diff.

- **Spec-First Development** — Write and approve technical specifications before a single line of code is generated
- **Scope Creep Prevention** — Intent and boundaries are frozen after approval, keeping implementation on track
- **Smart Routing** — Automatically chooses between full spec workflow and one-shot fast path based on complexity
- **Self-Review** — AI reviews its own code against spec, classifying findings as intent gaps, patches, or noise
- **Project Context Aware** — Loads your architecture, tech stack, and coding patterns into every workflow
- **Complete Lifecycle** — From product brief to implementation, review, and commit

## Quick Start

**Prerequisites**: [Node.js](https://nodejs.org) v16+

```bash
npx rapid-method install
```

Follow the interactive prompts to configure your project name, language preferences, and output paths. Then open your AI IDE (Claude Code, Cursor, etc.) in your project folder.

> **Not sure what to do next?** Use `rapid help` — it guides you through the methodology step by step.

## Usage

After installation, use these skills in your AI IDE:

### Setup Skills

| Skill | Description |
|-------|-------------|
| `rapid create-brief` | Create Product Brief (requirements) |
| `rapid create-architecture` | Document project architecture |
| `rapid create-patterns` | Define coding patterns and standards |

### Development Skills

| Skill | Description |
|-------|-------------|
| `rapid create-spec` | Create tech spec (clarify + investigate + write + approve) |
| `rapid dev` | Implement approved spec (branch + code + AI review + human review) |
| `rapid oneshot` | Fast path for simple, isolated changes |
| `rapid help` | Get guidance on what to do next |

## How It Works

See the **[full workflow documentation](docs/workflow.md)** for the complete flow, routing logic, and self-review classification system.

## Philosophy

- **Lean** — Minimal ceremony, maximum value
- **Spec-driven** — Clear specifications before implementation, not after
- **AI-native** — Designed for LLM-assisted development from the ground up
- **Human-approved** — You approve before implementation starts. Always.

## License

MIT License — see [LICENSE](LICENSE) for details.
