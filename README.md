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
  Header.tsx           # Barra fixa com título da aula atual e botão hambúrguer (44×44px)
  ProgressCounter.tsx  # Contador "x / y"
  FlashCard.tsx        # Card com flip 3D (dvh height, touch-first)
  ExplanationBlock.tsx # Bloco de explicação (truncado em 180 chars)
  SideMenu.tsx         # Overlay fullscreen com lista de aulas + swipe-down

lib/
  flashcards.ts    # Lê todos os .json em /data, une arquivos com mesmo id → Theme[], valida IDs únicos

types/
  index.ts         # Flashcard · Lesson · Theme

data/
  example.json.bak             # Tema de exemplo desativado (renomeie para .json para reativar)
  logica-0{1-4}-*.json         # Lógica de Programação — 4 aulas, 1 arquivo por aula

.github/
  workflows/
    deploy.yml     # Lint → Build → Deploy no Vercel
```

---

## Adicionar um novo tema/aula

### Um JSON por aula

Cada arquivo `.json` em `/data` representa **uma aula** de um tema. O loader une
automaticamente todos os arquivos que compartilham o mesmo `theme.id` em um único
tema com várias aulas.

```json
{
  "id": "id-do-tema",
  "title": "Título do Tema",
  "lessons": [
    {
      "id": "id-unico-da-aula",
      "title": "Título da Aula",
      "slidesUrl": "https://drive.google.com/drive/folders/SEU_ID_AQUI?usp=sharing",
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

> **`slidesUrl`** (opcional) — link da pasta ou arquivo de slides da aula (Google Drive ou qualquer URL). Quando presente, um botão com ícone de apresentação aparece no Header e abre o link em nova aba. Quando ausente, o botão não é renderizado.

### Ordem das aulas

A ordem das aulas dentro de um tema segue a **ordem alfabética do nome do arquivo**.
Use prefixos numéricos para controlar a sequência:

```
data/logica-01-algoritmos.json   → Aula 1
data/logica-02-variaveis.json    → Aula 2
data/logica-03-condicionais.json → Aula 3
data/logica-04-loops.json        → Aula 4
```

### IDs únicos globalmente

Os IDs de aula (`lesson.id`) e de card (`flashcard.id`) **devem ser únicos entre
todos os arquivos JSON**. O loader valida isso no momento do build e lança um erro
descritivo se encontrar duplicatas — impedindo o deploy de conteúdo inválido.

Use slugs descritivos e prefixados com o tema: `logica-aula-1-algoritmos`, `alg-1`.

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
