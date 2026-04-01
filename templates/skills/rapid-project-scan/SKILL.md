# RAPID Project Scan

Scan an existing project to document architecture and establish coding rules.

## Trigger
- User says "rapid project-scan" or "project scan"
- User is setting up RAPID for an existing project

## Workflow

### 1. Load Config
- Load `_rapid/config.yaml`
- Communicate in `{communication_language}`
- Output in `{document_language}`

### 2. Architecture Detection

Scan project for:
- **Tech stack**: `package.json`, `requirements.txt`, `Cargo.toml`, `go.mod`, `pom.xml`, etc.
- **Directory structure**: Identify key directories and their purpose
- **Architecture pattern**: Monolith, microservices, modular, etc.
- **External dependencies**: APIs, databases, services
- **Test organization**: Test framework, structure, naming

### 3. Architecture Enhancement

Present detected information and ask:
1. Is the detected tech stack correct? Anything missing?
2. What's the high-level architecture? (diagram if helpful)
3. What are the key modules and their responsibilities?
4. External dependencies and integrations?
5. Domain terminology the AI should know?
6. Development setup (env vars, commands)?
7. Deployment strategy?

Generate and save: `_rapid/project-architecture.md`

### 4. Rules Detection

Scan codebase for patterns:

**Code Style**:
- Indentation (tabs/spaces, size)
- Quotes (single/double)
- Semicolons (yes/no)
- Line length

**Naming Conventions**:
- File naming (kebab-case, camelCase, PascalCase)
- Variable/function naming
- Component naming
- Constants naming

**Architecture Patterns**:
- Directory structure patterns
- Component patterns
- State management
- Error handling patterns

**API Patterns**:
- Response format
- Endpoint conventions
- Authentication patterns

**Testing Patterns**:
- Test structure
- Naming conventions
- Mocking patterns

**Git Patterns**:
- Branch naming
- Commit message format

### 5. Rules Validation

Present detected patterns:
```
Detected Patterns

CODE STYLE
- 2-space indentation
- Single quotes
- No semicolons

NAMING
- kebab-case files
- PascalCase components
- camelCase functions

Questions:
1. Are these intentional? [Y/N]
2. Missing patterns to document?
3. Anti-patterns to explicitly avoid?
```

### 6. Generate Rules

Create rules folder: `_rapid/rules/`

Generate individual rule files based on detected patterns:
- `_rapid/rules/code-style.md` - Formatting rules
- `_rapid/rules/naming.md` - Naming conventions
- `_rapid/rules/architecture.md` - Structure patterns
- `_rapid/rules/error-handling.md` - Error handling patterns
- `_rapid/rules/api.md` - API design patterns
- `_rapid/rules/testing.md` - Test patterns
- `_rapid/rules/git.md` - Git workflow rules

Each rule file follows this format:
```markdown
# {Category} Rules

## Rule: {rule-name}
**Applies to**: {file patterns or contexts}
**Standard**: {the convention}
**Example**:
{good example}

**Anti-pattern**:
{what to avoid}
```

### 7. Confirm

```
## Project Scan Complete

Architecture:
- [x] Tech Stack documented
- [x] Structure mapped
- [x] Modules identified
- [x] Dependencies listed

Rules Created:
- [x] code-style.md
- [x] naming.md
- [x] architecture.md
- [x] error-handling.md
- [x] api.md
- [x] testing.md
- [x] git.md

Saved to:
- _rapid/project-architecture.md
- _rapid/rules/
```

## Modes
- **Create** (default): Full interactive setup
- **Update** (`--update`): Re-analyze and highlight changes
- **Auto** (`--auto`): Minimal interaction, use detected info only

## Output
- `_rapid/project-architecture.md`
- `_rapid/rules/*.md`

## Next Steps
- `rapid create-brief` — Define next feature
- `rapid create-rule` — Add custom rules
