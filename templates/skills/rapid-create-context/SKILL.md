# RAPID Create Context

Create/update project context file for AI-assisted development.

## Trigger
- User says "rapid create-context" or "create context"
- Setting up RAPID for existing project

## Workflow

### 1. Load Config
- Load `_rapid/config.yaml`
- Communicate in `{communication_language}`

### 2. Analyze Project

Auto-detect:
```bash
# Tech stack
- package.json, requirements.txt, Cargo.toml, etc.

# Structure
- Directory layout
- Key patterns
- Test organization
```

### 3. Interactive Enhancement

```
Project Analysis

Detected:
- Language: TypeScript
- Framework: React
- Testing: Jest

Structure:
- src/components/
- src/services/
- tests/

Questions:
1. Is this correct? [Y/N]
2. Project purpose?
3. Key architectural decisions?
4. Domain terminology?
```

### 4. Generate

Use: `_rapid/templates/project-context-template.md`
Save: `_rapid/project-context.md`

### 5. Confirm

```markdown
## Context Created ✓

File: _rapid/project-context.md

Sections:
- ✓ Overview
- ✓ Tech Stack
- ✓ Structure
- ✓ Domain

---
[V] View  [E] Edit  [D] Done
```

## Modes

### Create (default)
Full interactive setup

### Update
```
rapid create-context --update
```
Re-analyze and highlight changes

### Auto
```
rapid create-context --auto
```
Minimal interaction, detected info only
