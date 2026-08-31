# Project Patterns

---
project_name: '{project_name}'
last_updated: '{date}'
---

## Code Style

### Formatting
| Rule | Standard |
|------|----------|
| Indentation | 2 spaces |
| Quotes | Single |
| Semicolons | No |
| Line length | 100 |

### Tools
- Linter: ESLint
- Formatter: Prettier

---

## Naming

### Files
| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `UserProfile.tsx` |
| Utilities | camelCase | `formatDate.ts` |
| Constants | UPPER_SNAKE | `API_ENDPOINTS.ts` |

### Code
| Type | Convention | Example |
|------|------------|---------|
| Variables | camelCase | `userName` |
| Constants | UPPER_SNAKE | `MAX_RETRIES` |
| Functions | camelCase | `getUser` |
| Classes | PascalCase | `UserService` |
| Interfaces | PascalCase | `User` |

### Prefixes
| Pattern | Usage | Example |
|---------|-------|---------|
| `is/has/can` | Booleans | `isLoading` |
| `handle` | Events | `handleClick` |
| `get/fetch` | Data retrieval | `getUser` |

---

## Architecture

### Structure
```
src/
├── components/
├── services/
├── hooks/
├── utils/
└── types/
```

### Component Pattern
```typescript
interface Props {
  // ...
}

export function Component({ prop }: Props) {
  // 1. Hooks
  // 2. Handlers
  // 3. Effects
  // 4. Render
}
```

---

## Error Handling

### Pattern
```typescript
try {
  const result = await operation();
  return { success: true, data: result };
} catch (error) {
  logger.error('Failed', { error });
  return { success: false, error };
}
```

---

## API

### Response Format
```json
{
  "success": true,
  "data": { },
  "meta": { }
}
```

### Endpoints
| Action | Method | Path |
|--------|--------|------|
| List | GET | `/resources` |
| Get | GET | `/resources/:id` |
| Create | POST | `/resources` |
| Update | PATCH | `/resources/:id` |
| Delete | DELETE | `/resources/:id` |

---

## Testing

### Structure
```typescript
describe('Unit', () => {
  it('should do X when Y', () => {
    // Arrange
    // Act
    // Assert
  });
});
```

### Naming
- `should [behavior] when [condition]`

---

## Git

### Branches
| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feature/desc` | `feature/user-auth` |
| Fix | `fix/desc` | `fix/login-bug` |
| Chore | `chore/desc` | `chore/deps` |

### Commits
```
type(scope): description

[body]
```
Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`

---

## Anti-Patterns

| Avoid | Why | Better |
|-------|-----|--------|
| God objects | Hard to maintain | Single responsibility |
| Magic numbers | Not clear | Named constants |
| Deep nesting | Hard to read | Early returns |
