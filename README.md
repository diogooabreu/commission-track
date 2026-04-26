# CommissionTrack

Sistema Full-Stack para gerenciamento de comissões artísticas desenvolvido com **NestJS + Prisma + PostgreSQL + Frontend SPA**, seguindo **Spec-Driven Development (SDD)** e **TDD assistido por IA**.

Projeto acadêmico da disciplina **Tópicos Especiais em Engenharia de Software com IA — UTFPR**.

---

# Autores

* Diogo Nery de Abreu

---

# Link em Produção

Backend:

```
(em breve)
```

Frontend:

```
(em breve)
```

Swagger:

```
(em breve)
```

---

# Stack Tecnológica

## Backend

* NestJS
* Prisma ORM
* PostgreSQL
* JWT Authentication
* Role Guards
* ValidationPipe (whitelist)
* Exception Filters
* Interceptors
* Swagger
* Jest

## Frontend

* React
* Tailwind

---

# Arquitetura do Projeto

Estrutura baseada em **Monorepo**

```
commission-track/
│
├── apps/
│   ├── backend/
│   └── frontend/
│
├── docs/
│   ├── prd.md
│   ├── sdd.md
│   └── checklist.md
│
└── README.md
```

---

# Funcionalidades

Usuários podem:

* registrar conta
* autenticar via JWT
* criar comissões
* acompanhar status
* visualizar entregas

Artistas podem:

* criar comissões
* atualizar status
* registrar entregas
* gerenciar clientes

Clientes podem:

* visualizar próprias comissões
* acompanhar progresso
* acessar entregas finais

---

# Modelo de Dados

Relacionamento principal:

```
USER 1:N COMMISSION
COMMISSION 1:N DELIVERY
```

Roles disponíveis:

```
ARTIST
CLIENT
```

Status disponíveis:

```
PENDING
IN_PROGRESS
WAITING_PAYMENT
COMPLETED
CANCELLED
```

---

# Quick Start

## 1 — Clonar repositório

```
git clone <repo-url>
cd commission-track
```

---

## 2 — Instalar dependências backend

```
cd apps/backend
npm install
```

---

## 3 — Criar arquivo .env

```
DATABASE_URL="postgresql://user:password@localhost:5432/commissiontrack"
JWT_SECRET="your-secret"
```

---

## 4 — Rodar migrations

```
npx prisma migrate dev
```

---

## 5 — Gerar Prisma Client

```
npx prisma generate
```

---

## 6 — Executar servidor

```
npm run start:dev
```

Swagger disponível em:

```
/api/docs
```

---

# Documentação Técnica (Docs as Code)

- [PRD](docs/prd.md): visao do produto, historias de usuario e regras de negocio.
- [SDD](docs/sdd.md): arquitetura, diagrama ER (Mermaid), contratos e decisoes tecnicas.
- [Checklist](docs/checklist.md): acompanhamento dos IDs e resultados de aprendizagem.```

Contém:

* PRD
* SSD
* Diagrama ER (Mermaid)
* Contrato da API
* Checklist dos IDs da disciplina

---

# Qualidade de Software

Pipeline planejado:

* ESLint
* Prettier
* Jest
* GitHub Actions (CI)

Testes cobrem:

```
controllers
services
guards
auth
```

---

# Segurança

Implementações previstas:

* JWT authentication
* Role Guards
* Ownership validation
* ValidationPipe whitelist
* Exception Filter global

---

# Deploy Planejado

Backend:

```
Render
```

Banco:

```
Neon PostgreSQL
```

Frontend:

```
Vercel
```

---

# Status do Projeto

Legenda:

```
[ ] não iniciado
[~] em progresso
[x] concluído
```

## RA1 — Arquitetura e Requisitos

```
[x] PRD criado
[x] SSD criado
[x] Diagrama ER Mermaid
[x] Monorepo estruturado
[~] GitHub Projects backlog
[x] GitFlow configurado
```

## RA2 — Backend

```
[x] Modelagem Prisma
[ ] DTOs
[ ] ValidationPipe whitelist
[ ] CRUD relacional
[ ] JWT auth
[ ] Role Guards
[ ] Interceptors
[ ] Exception Filters
```

## RA3 — TDD

```
[ ] Configuração Jest
[ ] Testes Services
[ ] Testes Controllers
[ ] Testes Auth
```

## RA4 — Frontend

```
[ ] Swagger ativo
[ ] SPA criada
[ ] Integração API
[ ] Auth JWT frontend
```

## RA5 — Deploy

```
[ ] Variáveis ambiente seguras
[ ] CI GitHub Actions
[ ] Deploy backend
[ ] Deploy frontend
[ ] Banco produção
```

---

# Licença

Projeto acadêmico
