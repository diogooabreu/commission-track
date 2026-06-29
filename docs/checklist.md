# Checklist de Avaliação — CommissionTrack

Este documento acompanha os **Indicadores de Desempenho (IDs)** exigidos pela disciplina e serve como controle de progresso técnico do projeto.

Legenda:

```text
[ ] não iniciado
[~] em progresso
[x] concluído
```

---

# RA1 — Arquitetura, Engenharia de Requisitos com IA e Gestão Ágil

## ID1 — PRD + SSD com Mermaid

Objetivo:

Estruturar documentação de requisitos e design arquitetural utilizando IA.

Checklist:

* [x] PRD criado em `/docs/prd.md`
* [x] SSD criado em `/docs/sdd.md`
* [x] Diagrama ER Mermaid incluído
* [x] Contrato da API documentado

Evidência:

```text
Link: https://github.com/diogooabreu/commission-track/blob/develop/docs/prd.md 
      https://github.com/diogooabreu/commission-track/blob/develop/docs/sdd.md

---

## ID2 — Estrutura Monorepo

Objetivo:

Organizar frontend e backend dentro de um único repositório.

Checklist:

* [x] Pasta `/apps/backend`
* [x] Pasta `/apps/frontend`
* [x] Pasta `/docs`
* [x] README.md funcional na raiz

Evidência:

```text
Link: https://github.com/diogooabreu/commission-track/blob/develop/README.md

---

## ID3 — Backlog rastreável (GitHub Projects)

Objetivo:

Mapear PRD em User Stories rastreáveis.

Checklist:

* [x] Issues criadas a partir das User Stories
* [ ] Labels aplicadas
* [x] Kanban configurado
* [x] Status atualizado durante desenvolvimento

Evidência:

```text
Link:
```

---

## ID4 — GitFlow com Pull Requests

Objetivo:

Demonstrar domínio de versionamento profissional.

Checklist:

* [x] Branch `main` protegida
* [x] Branch `develop` criada
* [x] Branches `feature/*`
* [x] Pull Requests utilizados
* [x] Code review documentado (mesmo individual)

Evidência:

```text
Link: https://github.com/diogooabreu/commission-track/tree/feature/backend-crud-tdd
```

---

# RA2 — Desenvolvimento Backend Assistido por IA

## ID5 — Arquitetura modular NestJS

Objetivo:

Separação clara entre camadas.

Checklist:

* [x] Module criado
* [x] Controller criado
* [x] Service criado
* [x] Organização por domínio (`auth`, `users`, `commissions`, `deliveries`)

Evidência:

```text
Link: https://github.com/diogooabreu/commission-track/tree/feature/backend-crud-tdd/apps/backend/src
```

---

## ID6 — DTOs + ValidationPipe whitelist

Objetivo:

Blindagem de entrada da API.

Checklist:

* [x] CreateUserDTO
* [x] LoginDTO
* [x] CreateCommissionDTO
* [x] UpdateCommissionDTO
* [x] ValidationPipe global ativo
* [x] whitelist: true configurado

Evidência:

```text
Link: https://github.com/diogooabreu/commission-track/blob/feature/backend-crud-tdd/apps/backend/src/main.ts
```

---

## ID7 — CRUD relacional com Prisma

Objetivo:

Persistência relacional funcional.

Checklist:

* [x] CRUD User
* [x] CRUD Commission
* [x] CRUD Delivery
* [x] Relacionamento 1:N funcionando
* [x] Migrations executadas

Evidência:

```text
Link: https://github.com/diogooabreu/commission-track/blob/feature/backend-crud-tdd/apps/backend/prisma/schema.prisma
```

---

## ID8 — JWT + Roles + Guards

Objetivo:

Controle de acesso seguro.

Checklist:

* [x] Endpoint register
* [x] Endpoint login
* [x] JWT funcionando
* [x] RoleGuard implementado
* [x] Ownership validation implementada

Evidência:

```text
Link:
```

---

## ID9 — Interceptors + Exception Filters

Objetivo:

Padronizar tráfego da API.

Checklist:

* [x] SuccessResponseInterceptor criado
* [x] HttpExceptionFilter global criado
* [x] Estrutura padrão de resposta aplicada
* [x] Estrutura padrão de erro aplicada

Evidência:

```text
Link: https://github.com/diogooabreu/commission-track/tree/feature/backend-crud-tdd/apps/backend/src/common
```

---

# RA3 — Qualidade de Software e TDD Guiado por IA

## ID10 — Testes gerados antes da implementação (TDD)

Objetivo:

Aplicar fluxo TDD assistido por IA.

Checklist:

* [x] Testes criados antes da lógica
* [x] Testes Services
* [x] Testes Controllers
* [x] Testes Auth

Evidência:

```text
Link: https://github.com/diogooabreu/commission-track/tree/feature/backend-crud-tdd/apps/backend/src
```

---

## ID11 — Execução automática de testes

Objetivo:

Garantir estabilidade do sistema.

Checklist:

* [x] `npm run test` executa corretamente
* [x] Cobertura de sucesso
* [x] Cobertura de erro
* [x] Pipeline executa testes automaticamente

Evidência:

```text
Link: https://github.com/diogooabreu/commission-track/tree/feature/backend-crud-tdd/apps/backend/src
```

---

# RA4 — Prototipagem e Integração Frontend

## ID12 — Swagger atualizado e funcional

Objetivo:

Documentação interativa da API.

Checklist:

* [x] Swagger configurado
* [x] Endpoints auth documentados
* [x] Endpoints users documentados
* [x] Endpoints commissions documentados
* [x] Endpoints deliveries documentados

Evidência:

```text
Link:
```

---

## ID13 — Interface baseada no PRD

Objetivo:

Materializar requisitos em UI.

Checklist:

* [x] Tela login + cadastro
* [x] Tela landing page, 404, unauthorized
* [x] Tela dashboard (painel artista)
* [x] Tela gerenciar clientes (artista)
* [x] Tela detalhes comissão (artista)
* [x] Tela minhas comissões (cliente)
* [x] Tela nova comissão (cliente)
* [x] Tela detalhes comissão (cliente)

Evidência:

```text
Link:
```

---

## ID14 — Integração frontend + API real

Objetivo:

Consumir dados autenticados via JWT.

Checklist:

* [x] Integração login + cadastro
* [x] Token armazenado corretamente (localStorage)
* [x] Requests autenticados (JWT interceptor)
* [x] Proteção de rotas frontend (ProtectedRoute + role check)

Evidência:

```text
Link:
```

---

# RA5 — Pipeline CI/CD e Deploy

## ID15 — Variáveis seguras

Objetivo:

Proteção de credenciais sensíveis.

Checklist:

* [x] `.env` ignorado no git
* [x] DATABASE_URL protegida
* [x] JWT_SECRET protegido
* [x] ConfigModule configurado

Evidência:

```text
Link:
```

---

## ID16 — CI com GitHub Actions

Objetivo:

Validação automática antes de merge.

Checklist:

* [x] Workflow criado
* [x] Lint executado
* [x] Testes executados
* [x] Pipeline bloqueia erro

Evidência:

```text
Link:
```

---

## ID17 — Deploy em produção

Objetivo:

Sistema acessível publicamente.

Checklist:

* [ ] Backend publicado
* [ ] Banco PostgreSQL cloud ativo
* [ ] Frontend publicado
* [ ] Variáveis ambiente configuradas
* [ ] Sistema funcionando online

Evidência:

```text
Link:
```
