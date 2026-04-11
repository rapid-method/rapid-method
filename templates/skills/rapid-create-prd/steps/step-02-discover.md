# Step 2: Discovery — Read Brief, Ask Informed Questions

**Goal**: Read the linked brief silently (if any), then ask **one batch** of 4-7 sharp questions informed by the brief and the initial feature idea. This is **user interaction #2 of 3**.

**Previous step**: [step-01-init.md](step-01-init.md)
**Next step**: [step-03-generate.md](step-03-generate.md)

---

## 1. Read the Brief (Silent)

If `brief_path` was set in step-01, read the brief file in full. Pay attention to:

- **Personas** — who the brief identified as primary/secondary users (and their journey)
- **Vision & differentiators** — the core problem and proposed approach
- **Must/should/could features** — does the user's feature idea map to one of these?
- **Out of scope** — anything the brief explicitly excluded that this PRD must respect
- **Success metrics** — how this feature should move the needle

If no brief is linked, build context from `_rapid/project-architecture.md` and `_rapid/project-patterns.md` if they exist.

## 2. Build a Mental Model (Silent)

Hold in your head:
- Which **persona(s)** from the brief this feature serves
- How this feature fits into the brief's **must/should/could** breakdown
- Which **out-of-scope** boundaries from the brief must be respected
- Rough **user stories** (As a... I want... so that...) that come naturally from the persona + feature
- Likely **edge cases and error paths** based on the feature type
- What you're **uncertain** about — these become your questions

## 3. Ask Informed Questions (User Interaction #2)

Ask **4-7 sharp questions in one batch**. Make them specific to the brief and the feature, not generic. Each question should resolve a real uncertainty.

### Bad vs good

- ❌ "Who is this feature for?"
- ✅ "From the brief, the primary persona is {Maria, the freelance designer}. Is this feature primarily for her, or does it serve a secondary persona too?"
- ❌ "What should happen on errors?"
- ✅ "If the file upload fails partway through, should we keep the partial upload (to retry) or discard it and start over?"
- ❌ "What user stories matter?"
- ✅ "I'm thinking 3 stories: (1) upload a file, (2) see upload progress, (3) retry on failure. Are all three v1, or is retry a should-have?"

### What to ask about

Prioritize questions that resolve:

- **Persona mapping** — confirm which brief persona(s) this serves
- **Story scope & priority** — propose 2-5 stories with priorities, ask user to confirm/adjust
- **Out of scope** — what's explicitly NOT in this PRD (especially if it sounds adjacent)
- **Edge cases** — at least one the user might not have thought of
- **Error paths** — what should the system do when things fail
- **Acceptance criteria specifics** — concrete numbers, thresholds, or behaviors that matter

### Format

Send all questions in one message, numbered:

```
I read the brief. Before I draft the PRD, a few things to lock in:

1. {specific question grounded in the brief}
2. {story scoping question}
3. {out of scope question}
4. {edge case question}
5. {error path question}

(I'll generate the full PRD right after — no more questions until the review.)
```

## 4. Capture Answers (Silent)

Take the user's answers. Do **not** ask follow-ups unless an answer is so unclear it would force you to fantasize. If something is still ambiguous after one round, ask once more — but resist ping-pong.

Hold internally:
- `personas_served` (from brief, confirmed)
- `user_stories` (list of {as_a, want, so_that, priority})
- `in_scope`
- `out_of_scope` (with rationale)
- `expected_behavior` (happy + edge + error)
- `acceptance_criteria_seeds` (specific numbers/thresholds the user mentioned)
- `open_questions` (anything the user couldn't answer — these go in the PRD's Open Questions section)

## 5. Transition (silent — no user halt)

Do **not** present a summary. Do **not** ask "shall we continue?" Move directly to generation.

→ Read fully and follow [step-03-generate.md](step-03-generate.md).
