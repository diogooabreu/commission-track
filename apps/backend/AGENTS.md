# CommissionTrack — Backend

## Stack
- NestJS 11 + Prisma 7 + Neon PostgreSQL
- Validação: class-validator + class-transformer
- Testes: Jest 30 + ts-jest + Supertest

## Atenção — Prisma v7
- Usa `prisma-client-js` (não `prisma-client`) por compatibilidade com Jest CJS
- Configuração do CLI em `prisma.config.ts` (não no schema)
- `url` do datasource removida do schema; fica no `prisma.config.ts`
- `.env` carregado via `dotenv/config` no `prisma.config.ts`

## Arquitetura
- `src/main.ts` — bootstrap, global prefix `/api/v1`, ValidationPipe, Interceptors, Filters
- Cada domínio tem Module + Controller + Service + DTO
- `src/prisma/` — PrismaService (GlobalModule, injetável em todos Services)
- `src/common/` — Interceptors, Filters (futuramente Guards, Decorators, Pipes)
- `src/config/` — ConfigModule (carrega .env globalmente)

## Módulos Implementados
| Módulo | Rotas | DTOs |
|---|---|---|
| Users | POST, GET, GET/:id, PATCH/:id, DELETE/:id | CreateUserDto, UpdateUserDto |
| Commissions | POST, GET, GET/:id, PATCH/:id, DELETE/:id | CreateCommissionDto, UpdateCommissionDto |
| Deliveries | POST, GET/:commissionId | CreateDeliveryDto |

## Relacionamentos (1:N)
- User (artist) 1:N Commission
- User (client) 1:N Commission
- Commission 1:N Delivery

## Comandos
```bash
npm run start:dev          # servidor em http://localhost:3000/api/v1
npm run test               # 40 testes unitários
npm run test:e2e           # 1 teste e2e
npm run build              # compila para ./dist
npm run lint               # ESLint + Prettier
```

## Testes
- Services mockam PrismaService (não batem no banco real)
- E2E mocka PrismaService (não precisa de banco rodando)
- Cobertura: happy paths + NotFoundException + ConflictException (email duplicado)

## Padrão de Resposta
- Sucesso: `{ success: true, data: ... }` (ResponseInterceptor)
- Erro: `{ success: false, statusCode, message[], timestamp, path }` (HttpExceptionFilter)

## Pendente (IDs futuros)
- ID8: JWT + AuthModule + Guards (login, register, roles)
- ID12: Swagger
- Pipeline CI/CD

## Sessão Anterior (07/06/2026)
- Criada branch `feature/backend-crud-tdd`
- Implementados IDs 4, 5, 6, 7, 9, 10, 11
- Prisma v7 adaptado: trocado `prisma-client` → `prisma-client-js` por compatibilidade Jest
- 5 commits atômicos, 40 testes unitários + 1 e2e passando
