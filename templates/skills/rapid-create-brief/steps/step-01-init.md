# Step 1: Initialize

**Goal**: Load config, detect resume state, discover relevant input documents, and capture the user's product intent before structured discovery begins.

**Next step**: [step-02-vision.md](step-02-vision.md)

---

## 1. Load Config

- Read `_rapid/config.yaml`
- Communicate in `{communication_language}`
- Output the brief in `{document_language}`

## 2. Detect Resume State

Check `_rapid/output/briefs/` for an in-progress brief matching this project/feature.

**If a brief exists with `stepsCompleted` in frontmatter**:

- Read the file fully
- Reload every file listed in `inputDocuments` (don't discover new ones — keep the original context)
- Greet the user:

  ```
  I found an in-progress brief for {project_name} from {date}.

  Completed so far: {topics matching stepsCompleted}
  Next up: {next topic name}

  Want to continue where we left off, or start fresh?
  ```

- **On continue** → jump directly to the step matching the next uncompleted number (e.g. if `stepsCompleted: [1, 2]`, load `step-03-users.md`)
- **On fresh start** → ask whether to archive or overwrite, then continue to section 3

**If no brief exists** → continue to section 3.

## 3. Discover Input Documents

Silently scan for context that could enrich the brief:

| Look for | Where |
|----------|-------|
| Brainstorming notes | `_rapid/output/**/*brainstorm*.md`, `docs/**/*brainstorm*.md` |
| Research / market notes | `**/*research*.md`, `**/*market*.md` |
| Project context | `_rapid/project-architecture.md`, `_rapid/project-patterns.md`, `**/project-context.md` |
| Existing briefs | `_rapid/output/briefs/*.md` (as reference, not for editing) |

Report findings briefly:

```
I found these documents that might be relevant:
- {file}: {one-line summary}
- {file}: {one-line summary}

Should I use these as context, and is there anything else I should know about?
```

Load only what the user confirms. Track the loaded paths — they go into `inputDocuments` when the brief file is created.

## 4. Capture Product Intent

Detect what the user brought to the conversation:

| Scenario | Action |
|----------|--------|
| **Existing brief referenced** | Read it fully. Ask: "What changed since this was written?" |
| **Materials provided** (docs, notes, ideas) | Acknowledge them. Summarize your understanding. Ask: "What else should I know before we start?" |
| **Blank slate** | Ask: "Tell me about the product or project — what are you building, and why does it matter?" |

Don't force a rigid format. Let the user talk naturally. When you have enough context, summarize and confirm:

```
"So you're building [X] because [Y]. Is that right, or am I missing something?"
```

## 5. Create Brief File

Once intent is captured:

1. Copy `_rapid/templates/product-brief-template.md` to `_rapid/output/briefs/brief-{slug}-{date}.md`
2. Fill in frontmatter:
   - `title`, `created`, `owner` (from config `user_name`)
   - `inputDocuments`: list of confirmed input files
   - `stepsCompleted: [1]`
3. Save

## 6. Transition

Tell the user:

> "Great — let's build the brief together. I'll walk through six topics one at a time, and we'll save each section as we go. Starting with the vision."

→ Read fully and follow [step-02-vision.md](step-02-vision.md).
