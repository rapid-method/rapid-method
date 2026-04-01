# API Rules

---
project_name: '{project_name}'
last_updated: '{date}'
category: api
---

## Rule: Response Format
**Applies to**: All API responses

```json
{response_format}
```

## Rule: Endpoint Naming
**Applies to**: API endpoints

| Action | Method | Path Pattern |
|--------|--------|--------------|
| List | GET | `/{resources}` |
| Get | GET | `/{resources}/:id` |
| Create | POST | `/{resources}` |
| Update | PATCH | `/{resources}/:id` |
| Delete | DELETE | `/{resources}/:id` |

## Rule: Error Responses
**Applies to**: API error responses

```json
{error_response_format}
```

## Rule: Authentication
**Applies to**: Protected endpoints

{auth_rules}

## Rule: Pagination
**Applies to**: List endpoints

{pagination_rules}

## Rule: Versioning
**Applies to**: API versioning

{versioning_rules}
