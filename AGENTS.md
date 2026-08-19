# AGENTS.md

This repo defines a multi-agent system in Spanish. All files live under `Agents/`. There is no application code, build system, or tests — only agent definition files (markdown with YAML frontmatter).

## Architecture

Three-tier system:

| Tier | File | Role |
|------|------|------|
| Orchestrator | `Mr. Trump-Orquestator.md` | Interprets user requests, plans, delegates, consolidates results. **Never writes code.** |
| Selector | `Aduana.md` | Recommends which agents to use. Purely advisory. **Mandatory consultation before any planning.** |
| Sub-agents | 16 specialized files | Execute within their domain, report back to orchestrator only. |

**Flow:** User → Orchestrator → Selector (mandatory) → Orchestrator plans → Sub-agents execute → Validation agents → Orchestrator consolidates → User

## Critical Rules

1. **Orchestrator never executes.** It delegates everything. If you're acting as orchestrator, never write code directly.
2. **Selector must be consulted before planning.** Every request goes through `Aduana.md` first.
3. **Sub-agents never communicate with each other.** All coordination goes through the orchestrator.
4. **Validation is mandatory** after code changes: SecurityAgent, TestingAgent, CodeReviewAgent, PerformanceAgent.

## Agent File Format

Each agent file uses YAML frontmatter:

```yaml
---
description: One-line purpose
mode: primary | subagent
model: opencode/deepseek-v4-flash-free
temperature: 0.1-0.2
tools:
  write: true/false
  edit: true/false
  bash: true/false
  delegate: true/false  # orchestrator only
  selector: true/false  # orchestrator only
---
```

## Ownership Model

Each sub-agent has strict file ownership (e.g. `/backend/**`, `/frontend/**`). They read outside their domain but only write within it. Violations require explicit orchestrator authorization.

## Sub-Agent Catalog

| File | Domain |
|------|--------|
| `backend-agent.md` | APIs, business logic, auth, microservices |
| `frontend-agent.md` | UI components, state, responsive, UX |
| `mobile-agent.md` | Android, iOS, Flutter, React Native |
| `devops-agent.md` | Docker, K8s, CI/CD, infra, observability |
| `database-agent.md` | Modeling, indexes, migrations, query optimization |
| `US Security Secret Service-agent.md` | OWASP, auth auditing, hardening, secrets (read-only, can block) |
| `testing-agent.md` | Unit/integration/E2E tests, mocks, coverage |
| `Review CIA-agent.md` | Code quality, SOLID, maintainability |
| `performance-agent.md` | Profiling, memory leaks, bottlenecks |
| `documentation-agent.md` | READMEs, OpenAPI, diagrams, ADRs |
| `research-agent.md` | Tech research, comparisons, benchmarks |
| `refactor-agent.md` | Modularization, cleanup, tech debt |
| `networking-agent.md` | TCP/UDP, sockets, WebRTC, streaming, NDI |
| `aiml-agent.md` | LLMs, embeddings, RAG, fine-tuning |
| `data-engineering-agent.md` | ETL, data pipelines, analytics |
| `game-development-agent.md` | Unity, Unreal, physics, shaders |

## Error Reporting

All agents use the same YAML error structure:

```yaml
status: failed | blocked
error_type: local | specialization | conflict | systemic
severity: low | medium | high | critical
recoverable: true/false
suggested_agents: []
blocked_paths: []
```

SecurityAgent can emit `status: blocked` to halt consolidation until the vulnerability is resolved.

## Adding/Modifying Agents

- Follow the existing frontmatter schema exactly.
- Each agent must define: description, mode, model, temperature, tools, ownership, permissions, responsibilities, restrictions.
- Sub-agents use `mode: subagent`. Orchestrator uses `mode: primary`.
- All agent files are in Spanish — maintain that convention.
