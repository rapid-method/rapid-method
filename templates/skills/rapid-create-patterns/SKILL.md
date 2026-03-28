# RAPID Create Patterns

Create/update project patterns and coding standards.

## Trigger
- User says "rapid create-patterns" or "create patterns"
- Setting up coding standards

## Workflow

### 1. Load Config
- Load `_rapid/config.yaml`
- Communicate in `{communication_language}`

### 2. Analyze Code

Scan for patterns:
```
Analyzing...

Code Style:
- Indentation: 2 spaces
- Quotes: Single
- Semicolons: No

Naming:
- Files: kebab-case
- Components: PascalCase
- Functions: camelCase

Architecture:
- Pattern: Feature-based
- State: React Context
```

### 3. Validate

```
Detected Patterns

CODE STYLE
✓ 2-space indentation
✓ Single quotes
✓ No semicolons

NAMING
✓ kebab-case files
✓ PascalCase components

Questions:
1. Are these intentional? [Y/N]
2. Missing patterns?
3. Anti-patterns to avoid?
```

### 4. Generate

Use: `_rapid/templates/project-patterns-template.md`
Save: `_rapid/project-patterns.md`

### 5. Confirm

```markdown
## Patterns Created ✓

File: _rapid/project-patterns.md

Sections:
- Code Style
- Naming
- Architecture
- Error Handling
- Testing
- Git

---
[V] View  [E] Edit  [D] Done
```

## Notes

Update when:
- Team adopts new conventions
- Problems with current patterns
- New tech introduced
