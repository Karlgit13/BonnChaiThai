# Thai-Restaurang Projekt: Roadmap

## 1. Grunden
- Rensa bort monorepo/Express-krånglet.
- Sätt upp en ren Next.js App Router-struktur.
- Organisera mappar logiskt (app, components, lib).
- Fixa Tailwind så vi kan börja bygga lyxig design.

## 2. Database & Azure-fix
- Rigga Azure PostgreSQL Flexible Server.
- Definiera schemat i `lib/db/schema.ts`:
- Meny-grejer (maträtter, kategorier, priser)
- Bokningssystemet (datum, tider, antal gäster)
- Personal-bios & Story
- Recensioner & Stars
- Fixa seed-data (redo att köras när DB är kopplad).


## 3. Backend & Logik (Next.js API)
- Bygga API Routes i `app/api/...`
- Fixa bokningslogiken så vi inte dubbelbokar.
- Integrera AI-assistenten för kundfrågor.

## 4. Frontend & Design (WOW-faktorn)
- Landing Page: Fokus på atmosfär och familjekänslan.
- Menyn: Snygga kategorier, bilder, allergier.
- Bokningsflödet: Enkel kalender och bekräftelse.
- Om Oss: Personalens bakgrund och story.
- AI-Chat: Integrera assistenten i ett smidigt UI.

## 5. Shipping & Infra
- Sätta upp Azure Web App för hosting.
- Fixa GitHub Actions för automatisk deploy.
- Sätta upp tester.