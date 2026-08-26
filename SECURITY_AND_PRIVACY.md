# Security and Privacy Baseline

## Portfolio
Do not expose:
- private client names
- private benchmark content
- proprietary screenshots
- API credentials
- personal address
- unnecessary personal information

## Public Project Data
Use synthetic/demo data for screenshots and seeds unless a dataset is explicitly safe and licensed for use.

## Application Security
Apply proportionate basics:
- secrets through environment variables
- no secrets committed
- validate API boundaries
- enforce authorization server-side
- use ORM/parameterized database access
- secure cookies when auth exists
- rate limiting where useful
- sanitize user-generated content where rendered
- verify webhook signatures when implementing real webhooks
- do not log secrets

## Scope Discipline
Do not add enterprise-security theater simply to make architecture look advanced. Implement protections that match actual risks.
