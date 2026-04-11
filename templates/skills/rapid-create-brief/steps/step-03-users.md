# Step 3: Users & Journey

**Goal**: Define target users as **named personas with context** (not abstract types) and map the primary persona's journey from discovery to long-term habit.

**Previous step**: [step-02-vision.md](step-02-vision.md)
**Next step**: [step-04-scope.md](step-04-scope.md)

---

## 1. Open the Conversation

> "Now that we know what {project_name} does, let's get specific about who it's for. Picture one real person who has this problem — what's their job, what's their day like?"

## 2. Build the Primary Persona

Get the user to describe **one** primary persona in detail:

- **Name & role** — Give them a realistic name (or let the user pick) and job title
- **Brief backstory** — What's their day like? What's their environment?
- **Goals & motivations** — What are they trying to accomplish?
- **Current pain** — How do they experience the problem today? What workarounds are they using?
- **Aha moment** — When using {project_name}, when does the value click? "Oh, this is exactly what I needed."

If the user gives "anyone who needs X", push back:
> "Let's pick one real person. Who's the *most acute* version of this user — the one who'd pay tomorrow if we shipped today?"

## 3. Identify Secondary Users (if any)

- Admins, decision-makers, support, partners?
- Who *influences the decision* to adopt or pay, even if they're not the primary user?
- These are often more important than they look.

If there are no meaningful secondary users, mark as `N/A` and move on. Don't force it.

## 4. Map the User Journey

For the **primary persona**, walk through five stages:

| Stage | Question to ask |
|-------|----------------|
| **Discovery** | How do they find out about {project_name}? |
| **Onboarding** | What are their first 5 minutes like? |
| **Core Usage** | How do they use it day-to-day once set up? |
| **Aha Moment** | When does the value click? What action triggers "this is exactly what I needed"? |
| **Long-term** | How does it become part of their routine? What makes them stay? |

The aha moment matters most — it's the test for must-have features later.

## 5. Reflect & Confirm

```
Here's the persona I've got:

**{Name}** — {role}
- Day-to-day: {1 sentence}
- Pain today: {1 sentence}
- Aha moment: {1 sentence}

Journey:
- Discovery → {1 sentence}
- Onboarding → {1 sentence}
- Core Usage → {1 sentence}
- Aha → {1 sentence}
- Long-term → {1 sentence}

{Secondary users summary, or "No meaningful secondary users for v1"}

Does this feel right?
```

Iterate until confirmed.

## 6. Append to Brief

Fill the **Target Users** section:

- Primary Users table (one row per persona)
- Secondary Users (or N/A)
- User Journey table

Update frontmatter: `stepsCompleted: [1, 2, 3]`. Save.

## 7. Transition

> "Good — now we know who and why. Let's figure out *what* we're actually building."

→ Read fully and follow [step-04-scope.md](step-04-scope.md).
