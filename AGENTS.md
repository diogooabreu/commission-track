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

**Branch atual:** `feature/accept-refuse-commission`
**Últimos PRs:** #44, #45 (abertos, aguardando merge) | #40–#43 (merged em `develop`) | #46 (acabado de criar)

### Done — Tudo merged em `develop` (PRs #40–#43):
- Auth flow (auto-login after register, unwrap interceptor, password toggle) (#40)
- Landing, NotFound, Unauthorized (#41)
- Artist Dashboard com summary cards / status update (#42)
- Phase 1 — client flow, commission detail, artist detail (#43)

### Done — Em PRs abertos (#44, #45):
- `ArtistaClientes` — listagem de clientes com busca (#44)
- `ClienteNovaComissao` — formulário de criação (#44)
- `ArtistaComissaoDetalhes` — formulário de entrega + listagem (#45)
- `Perfil` — página de perfil do usuário (#45)
- Header atualizado com link `/perfil` (#45)
- CI workflow (lint + test) (#45)

### Done — Neste PR (#46):
- Accept/refuse buttons no lugar do select de status (PENDING)
- Contextual status banners no cliente
- 110 frontend + 74 backend = 184 testes verdes

### Próximos (ID17):
- Deploy: Render (backend) + Vercel (frontend)
- Banco já em Neon nuvem

### Decisões
- **Commission flow:** Client cria → Artist aceita/recusa explicitamente (botões) → IN_PROGRESS / CANCELLED
- **PENDING:** artista vê botões, não select. Após ação, select sem PENDING
- **Pagamento:** fora da plataforma (nenhuma integração)
- **Trocar senha:** ghost button no Perfil (placeholder)
- **Deploy:** Render API + Vercel UI
