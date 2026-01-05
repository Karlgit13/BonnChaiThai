# BonnChaiThai

En fullstack webbapplikation för en thailändsk restaurang i Stockholm. Projektet är byggt som mitt examensarbete för att visa upp kompetens i moderna webteknologier och molninfrastruktur på Azure.

## Tech Stack

**Frontend & Backend**
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion

**Databas**
- Azure PostgreSQL Flexible Server
- Drizzle ORM

**Hosting & CI/CD**
- Azure Web App (Linux Container)
- Azure Container Registry
- GitHub Actions

**Övrigt**
- Google Gemini AI (chatbot)
- React Hook Form + Zod
- Bcrypt (lösenordshashning)
- JWT (autentisering)

## Projektstruktur

```
├── app/                 # Next.js pages och API routes
├── components/          # Återanvändbara React-komponenter
├── lib/                 # Databas-schema, utils och helpers
│   └── db/             # Drizzle schema och seed-filer
├── drizzle/            # Genererade migrations
├── public/             # Statiska filer och bilder
└── scripts/            # Utility scripts (db check, dev server)
```

## Kom igång

### 1. Installation

```bash
pnpm install
```

### 2. Miljövariabler

Skapa en `.env` fil i root med följande variabler:

```env
DATABASE_URL=postgresql://user:password@host:5432/database
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_jwt_secret
```

### 3. Databas Setup

Projektet använder Drizzle ORM för databashantering. Här är de viktigaste kommandona:

**Skapa migrations från schema-ändringar:**
```bash
pnpm db:generate
```

**Kör migrations mot databasen:**
```bash
pnpm db:migrate
```

**Push schema direkt till databasen (utveckling):**
```bash
pnpm db:push
```

**Seeda databasen med testdata:**
```bash
pnpm db:seed
```

Detta skapar:
- Meny-kategorier och rätter
- Personal och deras bakgrund
- Recensioner
- Admin-användare (email: `admin@bonnchaithai.se`, lösenord: `admin123`)

**Seeda endast admin-användare:**
```bash
pnpm db:seed-admin
```

**Öppna Drizzle Studio (GUI för databasen):**
```bash
pnpm db:studio
```

### 4. Utveckling

Starta utvecklingsservern:

```bash
pnpm dev
```

Servern startar på:
- App: http://localhost:3000
- Swagger API docs: http://localhost:3000/api-doc

## Deployment

Projektet deployas automatiskt till Azure via GitHub Actions när kod pushas till `production` branchen.

**Deployment flow:**
1. Kör databas-connection test
2. Bygger Docker image
3. Pushar till Azure Container Registry
4. Deployas till Azure Web App

Live URL: [bonnchaithai123-hjhxfjgeg4e0fqd5.swedencentral-01.azurewebsites.net](https://bonnchaithai123-hjhxfjgeg4e0fqd5.swedencentral-01.azurewebsites.net/)

## Funktioner

- Bokningssystem för bord
- Interaktiv meny med filter och kategorier
- Personalpresentation med bakgrundshistorier
- Recensionssystem
- Admin-panel för hantering
- AI-chatbot för kundsupport (Gemini)
- Swagger API-dokumentation

## Utvecklingsflöde

Vi använder tre branches:
- `dev` - Aktiv utveckling
- `main` - Stabil kod
- `production` - Kod i produktion (triggar deployment)

## Scripts

```bash
pnpm dev              # Starta dev server
pnpm build            # Bygga för produktion
pnpm start            # Starta production build
pnpm lint             # Kör linting
pnpm test             # Kör tester
pnpm test:watch       # Kör tester i watch mode
pnpm db:generate      # Generera migrations
pnpm db:migrate       # Kör migrations
pnpm db:push          # Pusha schema till DB
pnpm db:seed          # Seeda databasen
pnpm db:seed-admin    # Seeda endast admin
pnpm db:studio        # Öppna Drizzle Studio
```

## Mer information

Se `Roadmap/Roadmap.md` för projektplanering och status.
