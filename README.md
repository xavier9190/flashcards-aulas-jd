# Flashcards — Estágio

Aplicação minimalista de flashcards organizada por temas e aulas. Dark mode único, mobile-first, sem banco de dados — conteúdo em arquivos JSON estáticos.

## Stack

- **Next.js 16** (App Router) + **TypeScript** `strict: true`
- **Tailwind CSS v4** (configuração em `app/globals.css` via `@theme`)
- **Dados:** arquivos JSON em `/data`, lidos via `fs` em Server Components
- **Deploy:** Vercel · **CI/CD:** GitHub Actions

---

## Rodar localmente

```bash
npm install
npm run dev
# → http://localhost:3000
```

---

## Estrutura do projeto

```
app/
  layout.tsx       # Root layout (viewport meta, lang, safe-area)
  page.tsx         # Server component — carrega temas via lib/flashcards.ts
  StudyShell.tsx   # Client shell — gerencia estado de tema/aula/card
  globals.css      # Tailwind v4 @theme tokens + animação de flip

components/
  Header.tsx           # Barra fixa com título e botão hambúrguer (44×44px)
  ProgressCounter.tsx  # Contador "x / y"
  FlashCard.tsx        # Card com flip 3D (dvh height, touch-first)
  ExplanationBlock.tsx # Bloco de explicação (truncado em 180 chars)
  SideMenu.tsx         # Overlay fullscreen com lista de aulas + swipe-down

lib/
  flashcards.ts    # Lê todos os .json em /data → Theme[]

types/
  index.ts         # Flashcard · Lesson · Theme

data/
  example.json     # Tema de exemplo (Fundamentos Web)

.github/
  workflows/
    deploy.yml     # Lint → Build → Deploy no Vercel
```

---

## Adicionar um novo tema/aula

1. Crie um arquivo em `data/seu-tema.json` seguindo o schema:

```json
{
  "id": "id-unico-do-tema",
  "title": "Título do Tema",
  "lessons": [
    {
      "id": "id-unico-da-aula",
      "title": "Título da Aula",
      "flashcards": [
        {
          "id": "card-1",
          "question": "Pergunta do card",
          "answer": "Resposta do card",
          "explanation": "Explicação breve (máx. ~180 chars para não ser truncada)"
        }
      ]
    }
  ]
}
```

2. Salve o arquivo — nenhuma outra alteração necessária. O app lê todos os `.json` em `/data` automaticamente.

> **IDs:** devem ser únicos globalmente entre todos os arquivos JSON. Use slugs descritivos (`html-semantico`, `css-box-model`).

---

## Deploy no Vercel

### Primeira vez (via Vercel CLI)

```bash
npx vercel
# Responda as perguntas e anote o Project ID e Org ID exibidos
```

### Secrets necessários no GitHub

Vá em **Settings → Secrets and variables → Actions** e adicione:

| Secret | Como obter |
|---|---|
| `VERCEL_TOKEN` | [vercel.com/account/tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | `.vercel/project.json` após `npx vercel` (campo `orgId`) |
| `VERCEL_PROJECT_ID` | `.vercel/project.json` após `npx vercel` (campo `projectId`) |

Após configurar, cada push na `main` executa lint → build → deploy automaticamente.

---

## Lint & Formatação

```bash
npm run lint      # ESLint (Next.js config)
npm run format    # Prettier (sobrescreve in-place)
```
