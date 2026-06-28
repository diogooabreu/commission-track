# CommissionTrack — Frontend

## Stack
- React 19 + TypeScript 6
- Vite 8 + Tailwind CSS v4
- React Router v7
- axios + @tanstack/react-query
- Vitest + Testing Library (40 testes)

## Design Tokens (Tailwind `@theme`)
Extraídos do Stitch — protótipo "CommissionTrack Landing Page" (light mode, minimalist + soft modern).

```css
@theme {
  --color-primary: #e60023;
  --color-secondary: #111111;
  --color-tertiary: #767676;
  --color-bg: #f9f9f9;
  --color-surface: #ffffff;
  --color-on-surface: #1a1c1c;

  --font-display: 'Plus Jakarta Sans', sans-serif;
  --font-body: 'Inter', sans-serif;

  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-full: 9999px;

  --shadow-card: 0px 4px 12px rgba(0, 0, 0, 0.05);
  --shadow-card-hover: 0px 8px 24px rgba(0, 0, 0, 0.1);
}
```

## Arquitetura
```
src/
├── components/
│   ├── ui/           # Button, Input, Card, StatusBadge, Loading
│   └── layout/       # Header, AppLayout, ProtectedRoute
├── pages/            # 9 telas (uma pasta cada)
├── services/         # api.ts (axios + JWT interceptor)
├── stores/           # AuthContext (AuthProvider + useAuth)
├── types/            # api.ts (Role, CommissionStatus, User, etc.)
```

## Telas (ID13 — 9 telas)
| # | Tela | Rota | Role | Status |
|---|---|---|---|---|
| 1 | **Login** | `/login` | Público | [x] |
| 2 | **Cadastro** | `/cadastro` | Público | [x] |
| 3 | **Landing Page** | `/` | Público | [ ] |
| 4 | **Painel do Artista** | `/artista/painel` | Artista | [ ] |
| 5 | **Gerenciar Clientes** | `/artista/clientes` | Artista | [ ] |
| 6 | **Detalhes da Comissão (Artista)** | `/artista/comissoes/:id` | Artista | [ ] |
| 7 | **Minhas Comissões** | `/cliente/comissoes` | Cliente | [ ] |
| 8 | **Nova Comissão** | `/cliente/nova` | Cliente | [ ] |
| 9 | **Detalhes da Comissão** | `/cliente/comissoes/:id` | Cliente | [ ] |

## Regras
- TDD: test first, code second
- Prefixo da API: `/api/v1`
- Rotas protegidas via ProtectedRoute + RolesGuard
- npm run dev:web — inicia frontend (localhost:5173)
- npm run test -w apps/frontend — roda testes
- npm run build -w apps/frontend — valida TS + build
- npm run lint -w apps/frontend — lint
