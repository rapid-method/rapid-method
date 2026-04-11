# Step 1: Initialize

**Goal**: Load context, detect resumable drafts, find related briefs, and capture the user's initial feature idea. This is **user interaction #1 of 3**.

**Next step**: [step-02-discover.md](step-02-discover.md)

---

## 1. Load Config

- Read `_rapid/config.yaml`
- Load `_rapid/project-architecture.md` if it exists
- Load `_rapid/project-patterns.md` if it exists
- Communicate in `{communication_language}`
- Output the PRD in `{document_language}`

## 2. Detect Resume State

Check `_rapid/output/prds/` for PRDs with `status: draft` and `stepsCompleted` partially filled.

**If a draft exists**:

```
Found a draft PRD: **{title}**

Steps completed: {list}
Next up: {next step name}

[C] Continue this draft
[N] No, start a new one
```

- **[C]** → load the draft, restore context, jump directly to the next uncompleted step:
  - `[1]` → load `step-02-discover.md`
  - `[1, 2]` → load `step-03-generate.md`
  - `[1, 2, 3]` → load `step-04-review.md`
- **[N]** → continue to section 3

**If no draft** → continue to section 3.

## 3. Discover Related Briefs

Silently scan `_rapid/output/briefs/` for product briefs.

**If briefs exist**:

```
Found {n} product brief(s):

1. {brief_title} ({date}) — {one-line summary}
2. {brief_title} ({date}) — {one-line summary}

Is this PRD for a feature in one of these briefs, or standalone?

[1-{n}] Pick a brief
[S] Standalone (no brief)
```

- **[1-n]** → store `brief_path` for step-02 to read in detail
- **[S]** → no brief context

**If no briefs exist** → continue to section 4 with no brief context.

## 4. Capture Initial Feature Idea (User Interaction #1)

Ask **one** question:

> "What feature are you thinking about? Even a rough idea is fine — I'll read the brief (if any) and ask sharper questions next."

Get just enough to know **what** they want and **where** in the brief it lives. Don't ask follow-ups yet — that's step-02.

**Extract from their answer**:
- Rough feature title
- Which user(s) it's for (if mentioned)
- The core problem it addresses
- Any specific constraints they mentioned

If the user already linked this PRD to a story or section in the brief, note it.

## 5. Hold Initial Context

Hold internally for step-02:
- `feature_title` (rough)
- `feature_intent` (1-2 sentences)
- `brief_path` (if linked to a brief)
- `referenced_users`, `referenced_constraints`

**Do not create the PRD file yet** — it's created in step-03 once you have everything to fill it.

## 6. Transition (silent — no user halt)

Move directly to discovery. Do **not** ask "shall we continue?" — just go.

→ Read fully and follow [step-02-discover.md](step-02-discover.md).
