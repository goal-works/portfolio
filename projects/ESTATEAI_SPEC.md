# EstateAI V1 Specification

## Product
AI-assisted property intelligence for investment analysis.

This is not a property-listing clone. The core value is structured real-estate investment analysis with AI used as an explanatory layer.

## Core Workflow
Discover → Property → Financial Analysis → Comparables → Neighborhood → AI Investment Brief → Compare

## Seed Data
Use entirely synthetic/demo property data. Do not scrape real services solely for the portfolio.

## Property Detail
Include:
- price
- beds/baths/area
- estimated rent
- cap rate
- cash-on-cash return
- estimated monthly cash flow
- property overview
- financials
- comparables
- neighborhood
- scenarios
- AI analysis

## Investment Calculator Inputs
- purchase price
- down payment
- interest rate
- loan term
- closing costs
- monthly rent
- vacancy
- property tax
- insurance
- maintenance
- management fee
- HOA

## Deterministic Outputs
- mortgage payment
- operating expenses
- NOI
- cap rate
- cash flow
- cash-on-cash return
- DSCR
- break-even occupancy

Financial calculations must be deterministic, testable application logic. Do not delegate authoritative calculations to an LLM.

## Scenarios
Support conservative/base/optimistic or user-defined scenarios for rent, vacancy, appreciation, and key cost assumptions.

## AI Investment Brief
Generate only from structured application data.
Suggested sections:
- Investment Summary
- Strengths
- Risks
- Financial Observations
- Questions to Investigate
- Overall Assessment

AI should explain/analyze provided values, not invent market facts.

## Discovery
Map + property-list layout on desktop. Use MapLibre or another maintainable open mapping solution.

## Compare
Allow side-by-side comparison of selected properties and scenarios.

## Architecture
Suggested:
Next.js + TypeScript → FastAPI/Python → PostgreSQL/PostGIS → deterministic finance service + optional AI brief service.

## Technical Deep Dive
Separating deterministic financial calculations from generative AI. Explain why business-critical numeric outputs stay deterministic and how structured data is passed to the model for narrative analysis.

## Acceptance Criteria
- seeded properties browseable
- filters work
- map displays seeded listings
- property details work
- deterministic investment calculations work and are tested
- scenarios can be created/compared
- properties can be compared
- favorites or saved selections work
- AI investment brief can run with a mock/demo mode if no key exists
- synthetic data clearly indicated where appropriate
- no authoritative financial advice claims
