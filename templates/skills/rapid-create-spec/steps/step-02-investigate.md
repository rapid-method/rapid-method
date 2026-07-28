# Step 2: Investigate & Ask Informed Questions

**Goal**: Scan the codebase silently to build a mental model, then ask **one batch** of 2-5 sharp questions informed by what you found. This is **user interaction #2 of 3**.

**Previous step**: [step-01-understand.md](step-01-understand.md)
**Next step**: [step-03-generate.md](step-03-generate.md)

---

## 1. Quick Scan (Silent)

Time-box this to ~1 minute. Just enough to ask sharp questions, not a full deep-dive.

### a) Planning context
- `_rapid/output/prds/` — related PRDs (link via `prd_ref` if found)
- `_rapid/output/briefs/` — related briefs for product context
- `_rapid/project-architecture.md` — overall structure
- `_rapid/project-patterns.md` — coding conventions

### b) Code context
For each file/area mentioned in step-01:
- Find the exact file paths
- Skim file structure (don't read every line)
- Note imports, exports, public APIs
- Find adjacent test files (`*.test.*`, `__tests__/`, etc.)
- Identify obvious patterns (naming, error handling, validation, layering)

### c) Tech stack signals
- Languages, frameworks, package manager
- Test framework + convention
- Lint / format / type-check commands (look in `package.json`, `Makefile`, etc.)

## 2. Build a Mental Model (Silent)

Capture in your head — do not show the user yet:

- What exists today that's relevant
- What needs to change vs. what needs to be added
- Which patterns to follow (and which to deliberately break, if any)
- Which files will need to be touched (rough Code Map)
- What the rough task order will be
- What you're **uncertain** about — these uncertainties become your questions

## 3. Ask Informed Questions (User Interaction #2)

Ask **2-5 sharp questions in one batch**. Make them specific to the actual code, not generic. Each question should resolve a real uncertainty that would otherwise force you to fantasize.

### Bad vs good

- ❌ "Should I follow existing patterns?"
- ✅ "`AuthService` validates inputs in the controller layer using `class-validator`. Should the new endpoint follow that, or move validation to a dedicated validator service?"
- ✅ "Tests use `vitest` with snapshot matching for components. Stick with snapshots, or write explicit assertions for the new component?"
- ✅ "I see `EmailService.sendSync()` already exists, only used by password reset. Reuse it, or extract a shared helper?"
- ✅ "Found a `feature_flags` table — should this feature be behind a flag, or always-on?"

### What to ask about

Prioritize questions that resolve:
- **Pattern choice** when the codebase has multiple precedents
- **Reuse vs new** — existing utility/service vs creating one
- **Scope ambiguity** — what's in vs out
- **Boundaries** — what should the dev agent never touch
- **Edge cases** the user may not have considered

### Format

Send all questions in one message, numbered:

```
Quick scan done. A few things to lock in before I draft the spec:

1. {specific question}
2. {specific question}
3. {specific question}

(I'll generate the full spec right after — no more questions until the review.)
```

## 4. Capture Answers (Silent)

Take the user's answers. Do **not** ask follow-ups unless an answer is so unclear it would force fantasy. If something is still ambiguous after one round, ask once more — but resist the urge to ping-pong.

Hold internally:
- `tech_stack`
- `patterns_to_follow`
- `files_to_touch` (rough Code Map)
- `decisions` (the answers from the user)
- `uncertainties_resolved` vs `uncertainties_remaining`

## 5. Checkpoint & Transition

Recap what you found and decided in 1–2 lines, then let the user confirm before you write the spec:

> "Here's the shape: {1-line recap of the approach + key decisions from your answers}. Ready for me to write the spec, or anything to adjust first?"
>
> [A] Write it   [D] Discuss / refine

- **[A]** → move to generation.
- **[D]** → resolve the open point, then re-confirm.

→ Read fully and follow [step-03-generate.md](step-03-generate.md).
