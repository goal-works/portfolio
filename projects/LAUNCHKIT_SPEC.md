# LaunchKit AI V1 Specification

## Product
A production-oriented multi-tenant SaaS foundation for AI products.

## Core Domain
User → Organization Membership → Organization → Workspaces / Members / Subscription / API Keys / Audit Events.

## Core Capabilities
- authentication
- organization creation/switching
- invitations
- memberships
- role-based access control
- workspaces
- API keys
- usage metering
- quotas/thresholds
- subscription state / Stripe test mode
- audit logs
- background jobs
- notifications
- webhook endpoints/delivery history

## Roles
- Owner
- Admin
- Developer
- Member
- Viewer

## Example Permissions
- billing:read
- billing:write
- members:read
- members:invite
- members:remove
- api_keys:create
- api_keys:revoke
- workspace:create
- workspace:delete

Authorization must be enforced server-side. Authentication alone is not sufficient.

## AI Usage Metering
Record where applicable:
- organization_id
- user_id
- provider
- model
- input_tokens
- output_tokens
- estimated_cost
- latency
- timestamp

Dashboard should show token/cost usage and configurable budget warning threshold.

## API Keys
Keys should be created/revoked securely. Never store/show plaintext secrets after initial creation if implementing real key behavior.

## Audit Log
Track meaningful administrative/security-sensitive actions.

## Webhooks
Allow endpoint registration, event subscription, signed delivery if implemented, delivery history, response code, duration, and retry behavior for failed deliveries.

## Architecture
Prefer a TypeScript-heavy stack to complement the other projects:
- Next.js
- TypeScript
- PostgreSQL
- Redis/background worker
- Stripe test mode
- Docker

Avoid introducing a Python service unless a real requirement justifies it.

## Technical Deep Dive
Tenant-aware authorization:
User → Membership → Organization → Role → Permission → Resource ownership.
Explain prevention of cross-tenant access.

## Acceptance Criteria
- user can create/switch organizations
- memberships and invitations work
- role/permission checks are enforced server-side
- workspaces are tenant-scoped
- API key create/revoke flow works
- usage records aggregate by organization
- audit events are created for important actions
- webhook delivery history exists if webhooks are in V1
- tenant isolation has tests
- seeded/demo mode supports screenshots without exposing real secrets
