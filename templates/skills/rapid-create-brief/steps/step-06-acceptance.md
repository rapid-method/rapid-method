# Step 6: Constraints, Acceptance Criteria & Future Vision

**Goal**: Surface constraints and assumptions, define Given/When/Then acceptance criteria for must-haves, and sketch a future vision that inspires without committing.

**Previous step**: [step-05-metrics.md](step-05-metrics.md)
**Next step**: [step-07-review.md](step-07-review.md)

---

## 1. Constraints & Assumptions

### Open

> "Before we lock in acceptance criteria, are there constraints I should know about — things we *can't* change?"

### Cover

- **Technical constraints**: platform, language, framework, integrations, infra, performance limits, browser/OS support
- **Business constraints**: timeline, budget, team size, compliance, regulatory, contractual
- **Assumptions**: what are you *betting* on? What would invalidate the whole approach if it turned out wrong?

The assumption question is the most valuable. Push:
> "If one thing in your mental model turned out wrong and would kill this project, what would it be?"

If the user genuinely has no strong constraints, don't force it. List what came up and move on.

---

## 2. Acceptance Criteria

### Open

> "Now let's write acceptance criteria for the must-have features. I'll keep it light — one or two scenarios per feature is enough at the brief level. We can go deeper in the PRD/spec later."

### For each must-have feature

Walk through **one key scenario** in Given/When/Then format:

```
Given {precondition or context}
When {user action or trigger}
Then {expected result}
```

Example:
```
Given a new user has signed up
When they click "Create my first project"
Then they see a guided onboarding flow with a sample project pre-loaded
```

Then ask:
> "Any edge case worth capturing for this one?"

Capture 0-1 edge cases. Don't over-engineer.

### Keep it light

1-2 ACs per must-have feature is enough. If the user wants to write more, gently push:
> "Let's keep this light — the brief is for alignment. Detailed ACs belong in the PRD or spec, where we have room to be exhaustive."

---

## 3. Future Vision

### Open

> "Last section. If {project_name} is wildly successful in 2-3 years, what does it become? Don't commit to anything — just paint the picture."

### Cover

- Post-MVP capabilities that build on the v1 foundation
- New user segments or markets you could expand to
- Ecosystem or platform plays
- Long-term differentiation

### Keep it inspiring, not a commitment

2-4 sentences. The point is to make sure today's MVP decisions don't paint us into a corner for tomorrow's vision.

If the user starts spec'ing v2 features in detail, gently redirect:
> "Save the details — let's just capture the *direction*. The shape of v2 will emerge once we see how v1 lands."

---

## 4. Reflect & Confirm

```
Constraints:
- {constraint}

Assumptions:
- {assumption}

Acceptance Criteria: {count} scenarios across {must-have count} must-have features

Future Vision (2-3 years):
{2-4 sentences}

All good?
```

## 5. Append to Brief

Fill three sections in the brief file:

- **Constraints & Assumptions**
- **Acceptance Criteria** (table)
- **Future Vision**

Update frontmatter: `stepsCompleted: [1, 2, 3, 4, 5, 6]`. Save.

## 6. Transition

> "That's all six topics. Let me draft the polished version and review it with you."

→ Read fully and follow [step-07-review.md](step-07-review.md).
