# PRD — CommissionTrack
Sistema de Gestão de Comissões Artísticas

---

# 1. Visão do Produto

O **CommissionTrack** é uma aplicação web full-cycle destinada a artistas independentes que realizam trabalhos sob encomenda (comissões). O sistema permite organizar clientes, acompanhar pedidos artísticos e controlar o progresso das entregas por meio de uma API segura e uma interface web integrada.

O objetivo principal é centralizar o fluxo de trabalho de comissões artísticas em uma plataforma estruturada, permitindo maior controle sobre prazos, status e relacionamento com clientes.

A aplicação será desenvolvida utilizando arquitetura moderna full-cycle com:

- Backend: NestJS
- ORM: Prisma
- Banco relacional: PostgreSQL
- Frontend: React / Angular / Vue
- Autenticação: JWT
- Documentação: Swagger
- Testes: Jest
- CI: GitHub Actions

---

# 2. Objetivos do Sistema

Permitir que artistas:

- cadastrem clientes
- registrem comissões
- acompanhem status de produção
- mantenham histórico de trabalhos
- organizem fluxo de entrega

Permitir que o sistema:

- mantenha autenticação segura
- proteja dados por usuário
- valide entradas da API
- padronize respostas
- forneça documentação Swagger

---

# 3. Personas

## Artista Independente

Profissional que realiza comissões artísticas sob demanda e precisa organizar pedidos de clientes, acompanhar status e controlar entregas.

Necessidades principais:

- organizar pedidos
- acompanhar progresso
- evitar perda de informações
- manter histórico de clientes

---

# 4. Escopo do Produto

O sistema permitirá:

### Autenticação

- cadastro de usuário
- login com JWT
- proteção de rotas autenticadas

### Gestão de Clientes

- cadastrar clientes
- listar clientes
- atualizar clientes
- remover clientes

### Gestão de Comissões

- registrar nova comissão
- atualizar status da comissão
- listar comissões
- visualizar histórico de comissões

---

# 5. Entidades do Sistema

## User (Artista)

Representa o usuário autenticado do sistema.

Campos:

- id
- name
- email
- password
- role
- createdAt

Relacionamentos:

User 1:N Client  
User 1:N Commission

---

## Client

Representa o cliente do artista.

Campos:

- id
- name
- contactInfo
- createdAt
- userId

Relacionamentos:

Client N:1 User  
Client 1:N Commission

---

## Commission

Representa um pedido artístico.

Campos:

- id
- title
- description
- status
- price
- deadline
- createdAt
- clientId
- userId

Relacionamentos:

Commission N:1 Client  
Commission N:1 User

---

# 6. Status da Comissão

A entidade Commission utilizará controle de status por enum:
- pending
- approved
- sketch
- lineart
- coloring
- completed
- delivered
- cancelled

---

# 7. Regras de Negócio

RN01  
Cada artista só pode visualizar seus próprios clientes.

RN02  
Cada artista só pode visualizar suas próprias comissões.

RN03  
Uma comissão deve obrigatoriamente pertencer a um cliente.

RN04  
Uma comissão deve possuir status válido definido pelo enum.

RN05  
Usuários devem estar autenticados para acessar rotas protegidas.

RN06  
Entradas da API devem ser validadas utilizando DTOs e ValidationPipe com whitelist ativa.

RN07  
Respostas da API devem seguir padrão estruturado via Interceptors.

RN08  
Erros da aplicação devem ser tratados por ExceptionFilter global.

RN09  
Cada comissão deve possuir status inicial igual a:
- pending

RN10  
Clientes pertencem exclusivamente ao artista que os criou.

---

# 8. Requisitos Funcionais

RF01  
Sistema deve permitir cadastro de usuário.

RF02  
Sistema deve permitir autenticação via JWT.

RF03  
Sistema deve permitir cadastro de clientes.

RF04  
Sistema deve permitir listagem de clientes.

RF05  
Sistema deve permitir atualização de clientes.

RF06  
Sistema deve permitir remoção de clientes.

RF07  
Sistema deve permitir criação de comissões.

RF08  
Sistema deve permitir atualização de status de comissão.

RF09  
Sistema deve permitir listagem de comissões.

RF10  
Sistema deve permitir filtragem de comissões por usuário autenticado.

RF11  
Sistema deve expor documentação Swagger interativa.

RF12  
Sistema deve possuir testes automatizados cobrindo sucesso e erro.

---

# 9. Requisitos Não Funcionais

RNF01  
Backend deve ser desenvolvido com NestJS utilizando arquitetura em camadas:

- Controllers
- Services
- Modules

RNF02  
Banco relacional deve ser acessado via Prisma ORM.

RNF03  
Autenticação deve utilizar JWT.

RNF04  
Entradas devem ser protegidas com DTO + ValidationPipe whitelist.

RNF05  
Sistema deve possuir interceptors globais de resposta.

RNF06  
Sistema deve possuir exception filters globais.

RNF07  
Testes automatizados devem ser executados com Jest.

RNF08  
API deve possuir documentação Swagger.

RNF09  
Projeto deve utilizar monorepo (frontend + backend).

RNF10  
Pipeline CI deve validar testes antes do merge.

---

# 10. Fluxo Principal do Sistema

Fluxo esperado de uso:
- Usuário cria conta
→ realiza login
→ cadastra cliente
→ cria comissão
→ atualiza status da comissão
→ acompanha progresso
→ finaliza entrega

---

# 11. Critérios de Sucesso do Projeto

O sistema será considerado completo quando:

- possuir autenticação JWT funcional
- implementar CRUD relacional com Prisma
- utilizar DTO + ValidationPipe whitelist
- possuir interceptors globais
- possuir exception filters globais
- possuir testes automatizados Jest
- expor documentação Swagger
- possuir estrutura monorepo
- utilizar GitFlow com Pull Requests
- executar pipeline CI com sucesso