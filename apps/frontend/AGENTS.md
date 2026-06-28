# CommissionTrack — Frontend

## Stack
- React 19 + TypeScript 6
- Vite 8
- Tailwind CSS v4
- React Router v7
- Vitest + Testing Library

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

## Telas (ID13 — 9 telas)
| # | Tela | Rota | Role |
|---|---|---|---|
| 1 | **Login** | `/login` | Público |
| 2 | **Cadastro** | `/cadastro` | Público |
| 3 | **Landing Page** | `/` | Público |
| 4 | **Painel do Artista** | `/artista/painel` | Artista |
| 5 | **Gerenciar Clientes** | `/artista/clientes` | Artista |
| 6 | **Detalhes da Comissão (Artista)** | `/artista/comissoes/:id` | Artista |
| 7 | **Minhas Comissões** | `/cliente/comissoes` | Cliente |
| 8 | **Nova Comissão** | `/cliente/nova` | Cliente |
| 9 | **Detalhes da Comissão** | `/cliente/comissoes/:id` | Cliente |

## Regras
- TDD: test first, code second
- Prefixo da API: `/api/v1`
- npm run dev:web — inicia frontend
- npm run test -w apps/frontend — roda testes
