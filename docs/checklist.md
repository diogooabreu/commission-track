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

* [ ] PRD criado em `/docs/prd.md`
* [ ] SSD criado em `/docs/sdd.md`
* [ ] Diagrama ER Mermaid incluído
* [ ] Contrato da API documentado

Evidência:

```text
Link:
```

---

## ID2 — Estrutura Monorepo

Objetivo:

Organizar frontend e backend dentro de um único repositório.

Checklist:

* [ ] Pasta `/apps/backend`
* [ ] Pasta `/apps/frontend`
* [ ] Pasta `/docs`
* [ ] README.md funcional na raiz

Evidência:

```text
Link:
```

---

## ID3 — Backlog rastreável (GitHub Projects)

Objetivo:

Mapear PRD em User Stories rastreáveis.

Checklist:

* [ ] Issues criadas a partir das User Stories
* [ ] Labels aplicadas
* [ ] Kanban configurado
* [ ] Status atualizado durante desenvolvimento

Evidência:

```text
Link:
```

---

## ID4 — GitFlow com Pull Requests

Objetivo:

Demonstrar domínio de versionamento profissional.

Checklist:

* [ ] Branch `main` protegida
* [ ] Branch `develop` criada
* [ ] Branches `feature/*`
* [ ] Pull Requests utilizados
* [ ] Code review documentado (mesmo individual)

Evidência:

```text
Link:
```

---

# RA2 — Desenvolvimento Backend Assistido por IA

## ID5 — Arquitetura modular NestJS

Objetivo:

Separação clara entre camadas.

Checklist:

* [ ] Module criado
* [ ] Controller criado
* [ ] Service criado
* [ ] Organização por domínio (`auth`, `users`, `commissions`, `deliveries`)

Evidência:

```text
Link:
```

---

## ID6 — DTOs + ValidationPipe whitelist

Objetivo:

Blindagem de entrada da API.

Checklist:

* [ ] CreateUserDTO
* [ ] LoginDTO
* [ ] CreateCommissionDTO
* [ ] UpdateCommissionDTO
* [ ] ValidationPipe global ativo
* [ ] whitelist: true configurado

Evidência:

```text
Link:
```

---

## ID7 — CRUD relacional com Prisma

Objetivo:

Persistência relacional funcional.

Checklist:

* [ ] CRUD User
* [ ] CRUD Commission
* [ ] CRUD Delivery
* [ ] Relacionamento 1:N funcionando
* [ ] Migrations executadas

Evidência:

```text
Link:
```

---

## ID8 — JWT + Roles + Guards

Objetivo:

Controle de acesso seguro.

Checklist:

* [ ] Endpoint register
* [ ] Endpoint login
* [ ] JWT funcionando
* [ ] RoleGuard implementado
* [ ] Ownership validation implementada

Evidência:

```text
Link:
```

---

## ID9 — Interceptors + Exception Filters

Objetivo:

Padronizar tráfego da API.

Checklist:

* [ ] SuccessResponseInterceptor criado
* [ ] HttpExceptionFilter global criado
* [ ] Estrutura padrão de resposta aplicada
* [ ] Estrutura padrão de erro aplicada

Evidência:

```text
Link:
```

---

# RA3 — Qualidade de Software e TDD Guiado por IA

## ID10 — Testes gerados antes da implementação (TDD)

Objetivo:

Aplicar fluxo TDD assistido por IA.

Checklist:

* [ ] Testes criados antes da lógica
* [ ] Testes Services
* [ ] Testes Controllers
* [ ] Testes Auth

Evidência:

```text
Link:
```

---

## ID11 — Execução automática de testes

Objetivo:

Garantir estabilidade do sistema.

Checklist:

* [ ] `npm run test` executa corretamente
* [ ] Cobertura de sucesso
* [ ] Cobertura de erro
* [ ] Pipeline executa testes automaticamente (opcional nesta fase)

Evidência:

```text
Link:
```

---

# RA4 — Prototipagem e Integração Frontend

## ID12 — Swagger atualizado e funcional

Objetivo:

Documentação interativa da API.

Checklist:

* [ ] Swagger configurado
* [ ] Endpoints auth documentados
* [ ] Endpoints users documentados
* [ ] Endpoints commissions documentados
* [ ] Endpoints deliveries documentados

Evidência:

```text
Link:
```

---

## ID13 — Interface baseada no PRD

Objetivo:

Materializar requisitos em UI.

Checklist:

* [ ] Tela login
* [ ] Tela dashboard
* [ ] Tela commissions
* [ ] Tela deliveries

Evidência:

```text
Link:
```

---

## ID14 — Integração frontend + API real

Objetivo:

Consumir dados autenticados via JWT.

Checklist:

* [ ] Integração login
* [ ] Token armazenado corretamente
* [ ] Requests autenticados
* [ ] Proteção de rotas frontend

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

* [ ] `.env` ignorado no git
* [ ] DATABASE_URL protegida
* [ ] JWT_SECRET protegido
* [ ] ConfigModule configurado

Evidência:

```text
Link:
```

---

## ID16 — CI com GitHub Actions

Objetivo:

Validação automática antes de merge.

Checklist:

* [ ] Workflow criado
* [ ] Lint executado
* [ ] Testes executados
* [ ] Pipeline bloqueia erro

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
