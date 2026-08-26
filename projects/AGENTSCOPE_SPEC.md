# AgentScope V1 Specification

## Product
Observability and debugging infrastructure for AI agents.

EvalForge asks: `How well did the system perform?`
AgentScope asks: `What exactly happened while the agent was working?`

## Core Model
Trace → spans/events → model calls/tool calls/retrieval/errors/final result.

Suggested entities:
- Project
- Agent
- Trace
- Span
- Event
- Diagnostic

A trace should retain:
- status
- agent
- start/end time
- duration
- total tokens
- estimated cost
- final result

Spans/events should support:
- model request
- model response
- tool call
- tool result
- retrieval
- custom log
- error
- final output

## Core Screens
### Overview
- executions
- success rate
- error rate
- average latency
- average cost
- token use
- common tools

### Trace Explorer
Search/filter by:
- agent
- status
- date
- duration
- cost
- error
- tool

### Trace Detail — Flagship Screen
Timeline of ordered events/spans with expandable payloads and summary metrics.

### Trace Comparison
Compare two traces for the same/similar task:
- result
- duration
- tokens
- tool calls
- cost
- errors
- timeline differences

### Diagnostics
Heuristic detectors:
- repeated identical tool calls
- suspicious tool-call loops
- high retry count
- tool errors
- malformed arguments
- excessive context growth
- unusually expensive run
- unusually slow run

These can be deterministic heuristics in V1.

## Python SDK
A small usable SDK is required for credibility.
Conceptual API:

```python
from agentscope import AgentScope

scope = AgentScope()

with scope.trace("research-agent") as trace:
    with trace.span("web_search", type="tool"):
        result = search(query)
```

Decorator helpers may be added later.

## Architecture
Suggested:
SDK/clients → ingestion API → PostgreSQL → query API → Next.js trace explorer.
Redis/background processing may be used for diagnostics/aggregation if useful.

Do not introduce ClickHouse in V1 unless actual measured needs justify it.

## Seed Data
Include realistic synthetic traces covering:
- successful execution
- tool error and recovery
- repeated tool loop
- expensive/long trace
- malformed tool call
- failed final result

## Technical Deep Dive
Trace ingestion and hierarchical span reconstruction, including ordering, parent/child relationships, incomplete traces, and durable storage.

## Acceptance Criteria
- SDK can create/upload a trace
- traces persist
- spans/events persist
- trace explorer lists/filter traces
- trace detail shows an ordered execution timeline
- payloads are inspectable
- token/cost/latency metrics calculate
- two traces can be compared
- at least one loop/repetition diagnostic works
- seeded demo data exists
- core ingestion/query logic tested
- documented local setup works
