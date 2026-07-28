# Step 1: Initialize

**Goal**: Load context, detect resumable drafts, find related briefs, and capture the user's initial product/feature idea. This is the first user interaction.

**Next step**: [step-02-discover.md](step-02-discover.md)

---

## 1. Load Config

- Read `_rapid/config.yaml`
- Load `_rapid-output/architecture.md` if it exists
- Load `_rapid-output/patterns.md` if it exists
- Communicate in `{communication_language}`
- Output the PRD in `{document_language}`

## 2. Detect Resume State

Check `_rapid-output/prds/` for PRDs with `status: draft` and `stepsCompleted` partially filled.

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

Silently check for a product brief at `_rapid-output/brief.md`.

**If briefs exist**:

```
Found {n} product brief(s):

1. {brief_title} ({date}) — {one-line summary of vision}
2. {brief_title} ({date}) — {one-line summary of vision}

Is this PRD grounded in one of these briefs, or standalone?

[1-{n}] Pick a brief
[S] Standalone (no brief — I'll ask more discovery questions in step 2)
```

- **[1-n]** → store `brief_path` for step-02 to read in detail
- **[S]** → no brief context (warn that the PRD will be lighter on persona/vision rationale)

**If no briefs exist** → continue to section 4 with no brief context.

> **Recommendation**: PRDs are much sharper when grounded in a brief. If the user picks Standalone, suggest they consider running `rapid create-brief` first — but don't block them.

## 4. Capture Initial Idea (User Interaction #1)

Ask **one** question:

> "What product or feature is this PRD for? Even a rough idea is fine — I'll read the brief (if any) and ask sharper questions next."

Get just enough to know:
- Rough scope (whole product / a major capability area / a single feature)
- Which user(s) it's for (if mentioned)
- The core problem or capability it adds

Don't ask follow-ups yet — that's step-02.

If the user already linked this PRD to a specific section of the brief, note it.

## 5. Hold Initial Context

Hold internally for step-02:
- `prd_title` (rough)
- `prd_intent` (1-2 sentences)
- `prd_scope_size` (whole product / capability area / single feature)
- `brief_path` (if linked to a brief)
- `referenced_users`, `referenced_constraints`

**Do not create the PRD file yet** — it's created in step-03 once you have everything to fill it.

## 6. Checkpoint & Transition

Recap what this PRD will cover in 1–2 lines and let the user confirm before discovery:

> "So this PRD is for {intent} at {scope size}{, linked to the {brief} brief if any}. Good to start the discovery questions, or adjust the framing first?"
>
> [A] Continue   [D] Discuss / refine

- **[A]** → move to discovery.
- **[D]** → refine intent/scope, then re-confirm.

→ Read fully and follow [step-02-discover.md](step-02-discover.md).
