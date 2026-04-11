# Step 1: Understand the Request

**Goal**: Check for work in progress, check for pending PRDs, capture the user's initial request. This is **user interaction #1 of 3**.

**Next step**: [step-02-investigate.md](step-02-investigate.md)

---

## 1. Load Config

- Read `_rapid/config.yaml`
- Load `_rapid/project-architecture.md` if it exists
- Load `_rapid/project-patterns.md` if it exists
- Communicate in `{communication_language}`

## 2. Check for WIP Specs

Look for `_rapid/output/specs/spec-*-wip.md`.

**If one or more WIPs exist**:

```
Found spec(s) in progress:

1. {title} — Step {lastStep}/4 — created {date}
2. {title} — Step {lastStep}/4 — created {date}

[C] Continue one of these
[A] Archive a WIP and start fresh
[D] Delete a WIP and start fresh
```

- **[C] Continue**: Read the chosen WIP, extract `stepsCompleted`, jump directly to the next uncompleted step:
  - `[1]` → load `step-02-investigate.md`
  - `[1, 2]` → load `step-03-generate.md`
  - `[1, 2, 3]` → load `step-04-review.md`
- **[A] Archive**: rename to `spec-{slug}-archived-{date}.md`, then continue to section 3
- **[D] Delete**: confirm with user, delete file, then continue to section 3

**If no WIP** → continue to section 3.

## 3. Check for Pending PRDs

Look in `_rapid/output/prds/` for PRDs with status `approved` or `in-progress`.

**If pending PRDs exist**:

```
Found pending PRDs:

1. {prd_title} (status: approved, {n} user stories)
2. {prd_title} (status: in-progress, {n}/{total} stories implemented)

[P] Pick a story from a PRD (recommended)
[S] Start something separate
```

- **[P] Pick**: Show user stories from the chosen PRD, let user pick one. Use the story as the source of intent — store the PRD path for `prd_ref` later. **Skip section 4** (intent already captured) and go straight to section 5.
- **[S] Separate**: Continue to section 4.

**If no pending PRDs** → continue to section 4.

## 4. Capture Initial Request (User Interaction #1)

If the user already stated what they want when invoking the skill, use that. Otherwise ask **one** question:

> "What do you want to build?"

Get just enough to know **what** they want and **where to look**. Don't ask follow-ups yet — that's step-02.

**Extract from their answer**:
- The goal (1-2 sentences)
- Any files/areas/components they referenced
- Any constraints they mentioned

**DO NOT FANTASIZE** — If the request is so ambiguous you can't even start a code scan, ask **one** clarifying question. Never invent file paths or assume APIs exist.

## 5. Save Initial Context

Hold the captured intent in memory for step-02. **Do not create the WIP file yet** — it's created in step-03 once you have everything to fill it.

Track internally:
- `initial_goal`: what they want
- `referenced_areas`: files/components mentioned
- `prd_ref`: PRD path if from [P] path, else empty

## 6. Transition (silent — no user halt)

Move directly to the next step. Do **not** ask "shall we continue?" — just go.

→ Read fully and follow [step-02-investigate.md](step-02-investigate.md).
