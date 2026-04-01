# RAPID Create Rule

Create or update a coding rule/pattern for the project.

## Trigger
- User says "rapid create-rule" or "create rule"
- User wants to add a new coding standard or pattern
- User wants to modify an existing rule

## Workflow

### 1. Load Config
- Load `_rapid/config.yaml`
- Communicate in `{communication_language}`
- Output in `{document_language}`

### 2. Check Existing Rules
- List existing rules in `_rapid/rules/`
- Show categories available:
  - `code-style` - Formatting and style rules
  - `naming` - Naming conventions
  - `architecture` - Structure and organization
  - `error-handling` - Error handling patterns
  - `api` - API design rules
  - `testing` - Test patterns
  - `git` - Git workflow rules
  - `custom` - Project-specific rules

### 3. Choose Action

```
Rule Management

[1] Add rule to existing category
[2] Create new rule file
[3] Update existing rule
[4] View current rules
```

### 4. Define Rule

For each rule, collect:

**Rule Name**: Short identifier (e.g., "async-await-pattern")

**Category**: Which file to add to

**Applies to**: Where this rule applies
- File patterns (e.g., `*.ts`, `src/components/**`)
- Contexts (e.g., "async functions", "API endpoints")

**Standard**: The convention to follow

**Example**: Good code example

**Anti-pattern** (optional): What to avoid

### 5. Generate

Add rule to appropriate file in `_rapid/rules/`

Rule format:
```markdown
## Rule: {rule-name}
**Applies to**: {scope}
**Standard**: {convention}
**Example**:
```{language}
{good_example}
```

**Anti-pattern**:
```{language}
{bad_example}
```
```

### 6. Confirm

```
## Rule Created

Category: {category}
Rule: {rule-name}
File: _rapid/rules/{category}.md

[V] View file  [A] Add another  [D] Done
```

## Modes
- **Add** (default): Add rule to existing category
- **Create**: Create new rule file
- **Update**: Modify existing rule
- **Delete**: Remove a rule

## Output
- Updated or new rule file in `_rapid/rules/`

## Examples

### Adding a new code style rule
```
rapid create-rule

> Adding rule to: code-style
> Rule name: max-function-length
> Applies to: All functions
> Standard: Functions should not exceed 30 lines
> Example: (user provides)
> Anti-pattern: (user provides)

Rule added to _rapid/rules/code-style.md
```

### Creating a custom rule file
```
rapid create-rule --create

> Category name: security
> Description: Security-related coding rules
> First rule: input-validation
> ...

Created _rapid/rules/security.md
```

## Next Steps
- `rapid project-scan` — Re-scan to detect new patterns
- `rapid create-spec` — Create spec following new rules
