# Rancang

**The planning layer for AI builders.** Type an app idea in plain language and get back a structured, executable blueprint — product summary, user roles, database schema, workflow logic, integrations, acceptance criteria, an ROI estimate, and a final build prompt you can paste straight into an AI builder (Trae, Cursor, etc.).

Inspired by the [TanpaCoding / TACO](https://tanpacoding.com/) concept. Built as a working full-stack reference.

---

## What it does

You describe an idea like:

> "Lean CRM for small agencies — manage leads, deal stages, follow-ups, monthly revenue forecast."

Rancang classifies the domain, then produces a blueprint covering **8 layers**:

| # | Layer | Output |
|---|-------|--------|
| 01 | Product summary | One framing paragraph |
| 02 | User roles | Roles + permissions |
| 03 | Database schema | Tables, columns, relations |
| 04 | Workflow logic | Step-by-step business rules |
| 05 | Integration plan | Payment, email, messaging, etc. |
| 06 | Acceptance criteria | Testable definition of done |
| 07 | ROI estimate | Hours saved, speedup, fewer revisions |
| 08 | Build prompt | Copy-paste payload for your AI builder |

It also computes a **readiness score** that surfaces what the idea still needs to clarify.

Built-in domains: **CRM, booking, inventory, helpdesk, marketplace**, plus a generic fallback. Bilingual **Indonesian / English** throughout.

---

## Tech stack

- **Next.js 15** (App Router, **static export**) + **React 19** + **TypeScript**
- **Tailwind CSS** for styling
- Offline-first **heuristic generation engine** that runs **entirely in the browser** (no API key, no server, fully deterministic)
- Deployed as a static site on **Cloudflare Pages**

The matching target stack for *generated* apps is Next.js / PostgreSQL / Drizzle / Tailwind / shadcn — reflected in the build prompt.

---

## Getting started

```bash
# install dependencies
npm install      # or: bun install

# run the dev server
npm run dev

# open http://localhost:3000
```

Other scripts:

```bash
npm run build      # static export to ./out
npm run start      # serve production build
npm run typecheck  # tsc --noEmit
npm run lint       # next lint
npm run deploy     # build + deploy to Cloudflare Pages (needs CLOUDFLARE_* env)
```

Live at **https://rancang.basim.id**.

---

## Project structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                 # landing + result orchestration
├── components/                  # Hero, Nav, Sections, BlueprintResult, …
└── lib/
    ├── blueprint/
    │   ├── domains.ts           # keyword classifier (ID + EN)
    │   ├── templates.ts         # per-domain knowledge base
    │   ├── readiness.ts         # readiness scoring
    │   ├── buildPrompt.ts       # renders the final build prompt
    │   ├── generator.ts         # the engine
    │   └── types.ts
    └── i18n.ts                  # bilingual UI dictionary
```

---

## How generation works

1. `classifyIdea()` keyword-matches the idea text against domain signatures (works in ID and EN).
2. The matched `DomainTemplate` supplies realistic roles, schema, workflow, integrations, and acceptance criteria.
3. `computeReadiness()` scores clarity, domain fit, roles, monetization, and integrations, and lists gaps.
4. `renderBuildPrompt()` assembles everything into a paste-ready prompt.

Everything runs in the browser with no external calls, so it works offline and nothing about your idea leaves your machine.

---

## License

MIT — use it as a starting point for your own planning layer.
