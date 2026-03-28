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
- **Complete Lifecycle** — From PRD to implementation, review, and commit

## Quick Start

**Prerequisites**: [Node.js](https://nodejs.org) v16+

```bash
npx rapid-method install
```

Follow the interactive prompts to configure your project name, language preferences, and output paths. Then open your AI IDE (Claude Code, Cursor, etc.) in your project folder.

> **Not sure what to do next?** Use `rapid help` — it guides you through the methodology step by step.

## Usage

After installation, use these skills in your AI IDE:

| Skill | Description |
|-------|-------------|
| `rapid quick-dev "task"` | Main workflow: Clarify → Branch → Spec → Implement → Review |
| `rapid create-prd` | Create a Product Requirements Document |
| `rapid create-context` | Document your project architecture for AI awareness |
| `rapid create-patterns` | Define coding patterns and standards |
| `rapid help` | Get guidance on what to do next |

## How It Works

```
rapid quick-dev "add user authentication"

  Step 1 — CLARIFY     Understand intent, create branch
  Step 2 — SPEC        Investigate codebase, write tech spec
         — APPROVE     You review and approve the plan  ← human gate
  Step 3 — IMPLEMENT   Execute tasks following the spec
  Step 4 — REVIEW      Self-review, classify findings, present results
         — DECIDE      Commit, create PR, review diff, or discard

  Simple change? → ONE-SHOT fast path (skip spec)
```

Each step has a defined purpose, inputs/outputs, and rules. The spec's Intent and Boundaries are **frozen** after approval to prevent scope creep during implementation.

For a deep dive into each step, routing logic, frozen sections, and the self-review classification system, see the **[full workflow documentation](docs/workflow.md)**. A visual diagram is also available as an **[Excalidraw file](docs/workflow.excalidraw)**.

## Philosophy

- **Lean** — Minimal ceremony, maximum value
- **Spec-driven** — Clear specifications before implementation, not after
- **AI-native** — Designed for LLM-assisted development from the ground up
- **Human-approved** — You approve before implementation starts. Always.

## License

MIT License — see [LICENSE](LICENSE) for details.
