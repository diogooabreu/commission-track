# PRD — CommissionTrack

Sistema de Gerenciamento de Comissões Artísticas

## 1. Visão do Produto

O **CommissionTrack** é uma aplicação full-stack destinada ao gerenciamento de comissões artísticas, permitindo que artistas organizem pedidos de clientes, acompanhem status de produção, valores, prazos e histórico de entregas.

O sistema será composto por:

* Backend: NestJS + Prisma ORM + PostgreSQL
* Frontend: (React | Angular | Vue)
* Autenticação: JWT com Roles
* Documentação: Swagger
* Testes: Jest (TDD assistido por IA)
* Deploy: Cloud (Render / Vercel)
* Estrutura: Monorepo

---

# 2. Problema

Artistas freelancers normalmente controlam comissões manualmente via:

* mensagens privadas
* planilhas
* anotações dispersas

Isso gera:

* perda de prazos
* confusão de pagamentos
* retrabalho
* dificuldade de rastrear histórico

---

# 3. Objetivo do Sistema

Permitir que artistas:

* registrem clientes
* registrem comissões
* acompanhem status
* controlem valores e prazos
* organizem entregas

---

# 4. Perfis de Usuário

## Artista (ADMIN)

Pode:

* gerenciar clientes
* criar comissões
* atualizar status
* registrar pagamentos
* visualizar histórico completo

## Cliente (USER)

Pode:

* visualizar próprias comissões
* acompanhar status
* visualizar entregas

---

# 5. Entidades Principais

Relacionamento obrigatório:

```
Cliente 1:N Comissões
```

Estrutura inicial:

Cliente
Comissão
Entrega (opcional na fase 1, recomendada)

---

# 6. Regras de Negócio

RN01
Um cliente pode possuir várias comissões.

RN02
Cada comissão pertence a apenas um cliente.

RN03
Uma comissão possui status obrigatório:

```
PENDENTE
EM_ANDAMENTO
AGUARDANDO_PAGAMENTO
CONCLUIDA
CANCELADA
```

RN04
Somente artistas podem criar comissões.

RN05
Clientes só visualizam suas próprias comissões.

RN06
Valores devem ser positivos.

RN07
Datas de entrega são opcionais na criação, mas se informadas, devem ser futuras.

---

# 7. User Stories (Mapeadas para os IDs da Disciplina)

## US01 — Estruturação do repositório (ID2)

Como desenvolvedor
Quero organizar o projeto em monorepo
Para manter frontend e backend versionados juntos

Critérios:

* pasta `/apps/frontend`
* pasta `/apps/backend`
* pasta `/docs`
* README funcional

---

## US02 — Escrita do PRD e SSD (ID1)

Como arquiteto do sistema
Quero documentar requisitos e arquitetura
Para garantir rastreabilidade do projeto

Critérios:

* PRD criado
* SSD criado
* diagrama ER Mermaid incluído

---

## US03 — Criação do backlog rastreável (ID3)

Como desenvolvedor
Quero mapear User Stories em Issues
Para acompanhar progresso via GitHub Projects

Critérios:

* issues criadas
* labels aplicadas
* status organizados

---

## US04 — Organização via GitFlow (ID4)

Como desenvolvedor
Quero utilizar branches de feature
Para manter histórico limpo e rastreável

Critérios:

* branch main protegida
* branch develop criada
* PR obrigatório antes de merge

---

# BACKEND

## US05 — Estrutura modular NestJS (ID5)

Como desenvolvedor
Quero separar Controllers, Services e Modules
Para manter arquitetura limpa

Critérios:

```
cliente.module
cliente.service
cliente.controller
```

```
commission.module
commission.service
commission.controller
```

---

## US06 — DTO + ValidationPipe (ID6)

Como desenvolvedor
Quero validar entradas da API
Para evitar dados inválidos

Critérios:

* CreateClienteDTO
* UpdateClienteDTO
* CreateCommissionDTO
* ValidationPipe whitelist ativo

---

## US07 — CRUD relacional Prisma (ID7)

Como desenvolvedor
Quero implementar CRUD Cliente → Comissão
Para persistir dados corretamente

Critérios:

Endpoints:

```
POST /clientes
GET /clientes
GET /clientes/:id
PATCH /clientes/:id
DELETE /clientes/:id
```

```
POST /commissions
GET /commissions
PATCH /commissions/:id
DELETE /commissions/:id
```

Relacionamento funcionando via Prisma

---

## US08 — Autenticação JWT + Roles (ID8)

Como desenvolvedor
Quero proteger endpoints com autenticação
Para controlar acesso por perfil

Critérios:

* login endpoint
* JWT válido
* Role guard ativo
* cliente acessa apenas próprios dados

---

## US09 — Interceptors + Exception Filters (ID9)

Como desenvolvedor
Quero padronizar respostas da API
Para melhorar consistência

Critérios:

Interceptor:

```
SuccessResponseInterceptor
```

Exception Filter:

```
HttpExceptionFilter global
```

---

# TDD

## US10 — Testes antes da implementação (ID10)

Como desenvolvedor
Quero gerar testes antes do código
Para validar comportamento esperado

Critérios:

* testes criados antes da lógica
* Jest configurado
* testes falhando inicialmente

---

## US11 — Execução automática dos testes (ID11)

Como desenvolvedor
Quero rodar testes automaticamente
Para garantir estabilidade

Critérios:

```
npm run test
```

retorna sucesso

Cobertura:

* sucesso
* erro
* validação

---

# DOCUMENTAÇÃO API

## US12 — Swagger ativo (ID12)

Como desenvolvedor
Quero documentar endpoints automaticamente
Para facilitar integração frontend

Critérios:

```
/api/docs
```

disponível

Endpoints documentados:

* auth
* clientes
* commissions

---

# 8. Métricas de Sucesso

Sistema considerado funcional quando:

* CRUD completo funcionando
* autenticação ativa
* testes passando
* swagger documentado
* deploy público disponível
* frontend consumindo API

---

# 9. Escopo da Primeira Entrega

Inclui:

* PRD
* SSD
* Diagrama ER
* Monorepo estruturado
* backlog criado
* GitFlow iniciado
