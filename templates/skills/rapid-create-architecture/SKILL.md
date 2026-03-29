# RAPID Create Architecture

Document your project's architecture for AI-assisted development.

## Trigger
- User says "rapid create-architecture" or "create architecture"
- User is setting up RAPID for an existing project

## Workflow

### 1. Load Config
- Load `_rapid/config.yaml`
- Communicate in `{communication_language}`
- Output in `{document_language}`

### 2. Auto-Detect

Scan project for:
- **Tech stack**: `package.json`, `requirements.txt`, `Cargo.toml`, `go.mod`, `pom.xml`, etc.
- **Directory structure**: Identify key directories and their purpose
- **Architecture pattern**: Monolith, microservices, modular, etc.
- **External dependencies**: APIs, databases, services
- **Test organization**: Test framework, structure, naming

### 3. Interactive Enhancement

Present detected information and ask:
1. Is the detected tech stack correct? Anything missing?
2. What's the high-level architecture? (diagram if helpful)
3. What are the key modules and their responsibilities?
4. External dependencies and integrations?
5. Domain terminology the AI should know?
6. Development setup (env vars, commands)?
7. Deployment strategy?

### 4. Generate

Use template: `_rapid/templates/project-architecture-template.md`
Save to: `_rapid/project-architecture.md`

### 5. Confirm

```
## Architecture Created ✓

Sections:
- [x] Overview & Tech Stack
- [x] Structure
- [x] Architecture & Modules
- [x] Domain
- [x] Development Setup
- [x] Deployment

Saved to: _rapid/project-architecture.md
```

## Modes
- **Create** (default): Full interactive setup
- **Update** (`--update`): Re-analyze and highlight changes
- **Auto** (`--auto`): Minimal interaction, detected info only

## Output
- `_rapid/project-architecture.md`

## Next Steps
- `rapid create-patterns` — Define coding patterns
- `rapid create-brief` — Create product brief
