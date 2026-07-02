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
- `npm run dev:api` — inicia backend (localhost:3000)
- `npm run dev:web` — inicia frontend
- `npm run test -w apps/backend` — 74 testes unitários

## Documentação
- `docs/prd.md` — Product Requirements Document
- `docs/sdd.md` — Software Design Document (contém contrato da API)
- `docs/checklist.md` — Progresso por ID de avaliação

## Provedor de Banco
- Neon (PostgreSQL serverless)
- DATABASE_URL armazenada em `apps/backend/.env` (não versionado)

---
## Sessão

**Branch atual:** `feat/deploy-prep`
**Últimos PRs:** #40–#47 (merged em `develop`), #48 (merged), #49 (aberto develop→main), #50 (aberto)

### Done — Merged em `develop`:
- Auth flow, public pages, artist dashboard, client flow (PRs #40–#43)
- ArtistaClientes + ClienteNovaComissao (PR #44)
- Delivery form + Perfil + CI workflow (PR #45)
- Accept/refuse buttons + status banners (PR #46)
- `GET /users/clients` — filtrar clientes por commissions (PR #47)
- `tsconfig.app.json` — excluídos test files do `tsc -b` (PR #48)
- `vercel.json` v1 — rootDirectory + SPA fallback (PR #48)

### Neste PR (#50):
- `vercel.json` — corrigido: remove `rootDirectory`, `buildCommand` com `-w apps/frontend`

### Próximos (ID17):
- Deploy: Render (backend) + Vercel (frontend)
- Banco já em Neon nuvem
- Build frontend: OK
