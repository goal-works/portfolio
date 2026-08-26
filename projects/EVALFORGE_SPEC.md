# EvalForge V1 Specification

## Product
Open-source infrastructure for evaluating AI models and agents against reproducible benchmarks.

## Core Workflow
Create Benchmark → Create Tasks → Configure Agent → Start Evaluation → Execute Tasks Asynchronously → Score Results → Inspect Failures → Compare Runs

## Core Entities
### Workspace
`id, name, slug, description, created_at, updated_at`

### Benchmark
`id, workspace_id, name, slug, description, version, status, difficulty, tags, created_at, updated_at`
Statuses: Draft, Active, Archived.
Difficulty: Easy, Medium, Hard, Expert.

### Task
`id, benchmark_id, name, slug, description, instruction, input, metadata, timeout_seconds, difficulty, created_at, updated_at`

### Agent Configuration
`id, workspace_id, name, provider, model, temperature, max_tokens, system_prompt, configuration, created_at, updated_at`
Providers may include Mock, OpenAI, Anthropic, custom HTTP later.
Mock provider is required.

### Evaluation Run
`id, benchmark_id, agent_configuration_id, status, started_at, completed_at, total_tasks, completed_tasks, passed_tasks, failed_tasks, mean_score, total_tokens, estimated_cost, duration_ms, created_at`
Statuses: Queued, Running, Completed, Failed, Cancelled.

### Task Run
`id, evaluation_run_id, task_id, status, attempt_number, input, output, score, passed, failure_category, started_at, completed_at, duration_ms, input_tokens, output_tokens, estimated_cost`

### Execution Event
`id, task_run_id, event_type, sequence, payload, timestamp`
Types: model_request, model_response, tool_call, tool_result, log, error, final_output.

### Evaluator
`id, task_id, type, name, configuration, weight, created_at`
Required functional V1 evaluator types:
- Exact Match
- Contains
- JSON Schema
- LLM Judge OR deterministic mock judge

### Evaluation Result
`id, task_run_id, evaluator_id, score, passed, reason, metadata, created_at`

## Failure Taxonomy
- Reasoning
- Instruction Following
- Tool Usage
- Invalid Output
- Incomplete Solution
- Hallucination
- Timeout
- Environment
- Evaluator Error
- Unknown

Manual classification is acceptable V1.

## Navigation
- Overview
- Benchmarks
- Runs
- Agents
- Analytics
- Documentation
- GitHub
- Settings

## Key Screens
### Dashboard
Metrics:
- Total Runs
- Average Pass Rate
- Evaluated Tasks
- Active Benchmarks

Plus recent runs, pass-rate trend, failure distribution.

### Benchmarks
Search/filter, name/version/task count/difficulty/status/last run/latest pass rate.

### Benchmark Detail
Tabs: Overview, Tasks, Runs, Settings.

### Task Editor
General, Instruction, Input, Evaluation builder, Advanced.

### Agents
Agent configuration list/editor.

### Start Evaluation
Choose agent, attempts (1/2/3/5), review total executions, start.

### Run Detail — Flagship Screen
Metrics:
- Pass Rate
- Mean Score
- Completed Tasks
- Duration
- Tokens
- Estimated Cost

Show progress and results table while active.
Polling is acceptable V1.

### Task Run Detail
Instruction, execution timeline, output, evaluation, metadata.

### Analytics
Model performance, benchmark performance, failures, cost, latency.

## pass@k
Use a documented simplified definition: percentage of tasks where at least one attempt succeeded within the first `k` attempts.

## Architecture
Recommended:
Browser → Next.js → FastAPI → PostgreSQL / Redis Queue → Worker → Agent Adapter + Evaluators.

Preferred queue: Dramatiq + Redis, but use an equally simple maintainable queue if repository constraints favor it.

## Suggested Backend
Python, FastAPI, SQLAlchemy 2, Alembic, PostgreSQL, Redis, Dramatiq, Pytest, Ruff, Pyright.

## Agent Adapter Concept
All providers conform to a common execution contract returning output, events, tokens, duration, and estimated cost.

## Evaluator Contract
All evaluators return score, passed, reason, and metadata.

## Frontend
Next.js + TypeScript. Suggested supporting tools: Tailwind, shadcn/ui where helpful, TanStack Query, TanStack Table, Recharts, Zod, React Hook Form.

## Demo Mode
Required. Seed realistic original data and provide deterministic/mock agents (e.g. Strong, Balanced, Fast or Strong/Moderate/Weak). The application must be demonstrable without paid model API keys.

Do not copy private benchmark tasks.

Seed target:
- 1 workspace
- 2 benchmarks
- 12–20 tasks total
- 3 mock agent configurations
- historical runs

## Docker
Target developer experience: `docker compose up` for web/api/worker/postgres/redis or an equivalently simple documented workflow.

## Testing
Backend:
- evaluator unit tests
- pass@k tests
- run aggregation tests
- API tests
- worker tests

Frontend:
- critical run/evaluator rendering tests

E2E:
Create benchmark → create task → select mock agent → start evaluation → complete → inspect result.

## Documentation
README + docs covering architecture, benchmark format, evaluators, development, testing, and self-hosting/deployment as applicable.

## Technical Deep Dive
Asynchronous evaluation execution and aggregation: queueing, state transitions, retries, idempotency, result persistence, aggregate updates.

## V1 Acceptance Criteria
- view seeded benchmarks
- create benchmark
- create/edit task
- configure/use mock agent
- start async evaluation
- see progress
- outputs produced per task
- at least three evaluator types function
- scores persist
- aggregate metrics calculate
- failed runs inspectable
- execution events visible
- failure categories assignable
- multiple runs comparable
- pass@k works
- dashboard contains meaningful seeded history
- project runs through documented local/Docker setup
- core logic tested
- E2E core workflow passes
- README quick start works
- CI passes from clean checkout

## Non-Goals
Do not delay V1 for Kubernetes, distributed scheduling, enterprise SSO, billing, complex team permissions, dozens of providers, arbitrary code sandboxing, marketplace functionality, real-time collaboration, or hyperscale analytics.
