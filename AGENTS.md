# CommissionTrack — Visão Geral

## Stack
- Monorepo npm workspaces (`apps/*`)
- Backend: NestJS 11 + Prisma 7 + Neon (PostgreSQL)
- Frontend: React 19 + Vite 8

## Estrutura
- `apps/backend/` — API REST (porta 3000)
- `apps/frontend/` — UI React
- `docs/` — PRD, SDD, checklist de avaliação

## Comandos
- `npm run dev:api` — inicia backend
- `npm run dev:web` — inicia frontend

## Documentação
- `docs/prd.md` — Product Requirements Document
- `docs/sdd.md` — Software Design Document (contém contrato da API)
- `docs/checklist.md` — Progresso por ID de avaliação

## Provedor de Banco
- Neon (PostgreSQL serverless)
- DATABASE_URL armazenada em `apps/backend/.env` (não versionado)
