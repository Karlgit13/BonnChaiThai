# Thai-Restaurang Projekt: Roadmap

## 1. Bygga grunden
- Bygga en ren Next.js App Router-struktur.
- Organisera mappar logiskt (app, components, lib).
- Fixa Tailwind så vi kan börja bygga lyxig design.


## 2. Auth & API Endpoints
- Fixa auth-systemet så vi kan logga in och ut och hantera användarroller (admin, staff, customer).
- jose & bcrypt används för att hantera auth.
- cookies används för att hantera session.
- fixa API endpoints för auth-systemet, admin-systemet, staff-systemet, customer-systemet.


## 3. Frontend & Design (WOW-faktorn)
- Landing Page: Fokus på atmosfär och familjekänslan.
- Menyn: Snygga kategorier, bilder, allergier.
- Bokningsflödet: Enkel kalender och bekräftelse.
- Om Oss: Personalens bakgrund och story.


## 4. Skapa Azure postgreSQL Flexible Server
- Skapa en Azure postgreSQL Flexible Server.
- Fixa connection string.


## 5. Sätta upp Azure web app
- Sätta upp Azure web app för hosting.
- Fixa GitHub Actions för automatisk deploy.

## 6. CI/CD
- Fixa GitHub Actions för automatisk deploy.


## 7. Database & Azure-fix
- Definiera schemat i `lib/db/schema.ts`:
- Meny-grejer (maträtter, kategorier, priser)
- Bokningssystemet (datum, tider, antal gäster)
- Personal-bios & Story
- Recensioner & Stars


## ~~Sätt upp AI chatbot~~ (REMOVED)
- Chatbot feature has been removed from the project.

## 8. Tester
- Vitest & React Testing Library.


## 9. Swagger UI
- Fixa swagger UI.
- Fixa API dokumentation.
- Presentation