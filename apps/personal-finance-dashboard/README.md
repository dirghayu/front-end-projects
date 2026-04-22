# Personal Finance Dashboard

[![CI / Deploy](https://github.com/dirghayu/front-end-projects/actions/workflows/ci.yml/badge.svg)](https://github.com/dirghayu/front-end-projects/actions/workflows/ci.yml)

A full-stack personal finance dashboard for tracking income and expenses.

**Live:** https://finance-dashboard-e51e4.web.app

---

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript, Vite, Recharts, React DatePicker |
| Backend | Node.js, Express 5, TypeScript |
| Database | Firestore (GCP) |
| Hosting | Firebase Hosting + Cloud Functions v2 |
| Testing | Jest + Supertest (backend), Vitest + React Testing Library (frontend) |
| CI/CD | GitHub Actions — test + deploy on every push to `master` |

---

## Architecture

```
apps/personal-finance-dashboard/
├── backend/
│   ├── src/
│   │   ├── app.ts                  # Express routes (dependency-injected)
│   │   ├── repository.ts           # TransactionRepository interface
│   │   ├── InMemoryRepository.ts   # Used in tests and local dev
│   │   ├── FirestoreRepository.ts  # Used in production (Cloud Functions)
│   │   ├── index.ts                # Firebase Functions entry point
│   │   ├── server.ts               # Local dev entry point (npm run dev)
│   │   └── types.ts                # Shared domain types
│   └── __tests__/
│       └── transactions.test.ts
└── frontend/
    ├── src/
    │   ├── api/transactions.ts     # HTTP layer (axios)
    │   ├── hooks/useTransactions.ts # State + side effects
    │   ├── components/             # TransactionForm, TransactionList, Charts
    │   └── types.ts
    └── __tests__/
```

### Key design decisions

**Repository pattern** — `TransactionRepository` interface with two implementations: `InMemoryRepository` for tests and local dev, `FirestoreRepository` for production. Tests inject the in-memory version directly — no mocking of Firebase Admin SDK required. Same pattern as Spring `@Repository` + dependency injection.

**Split entry points** — `server.ts` calls `app.listen()` for local dev. `index.ts` wraps the same Express app in a Firebase Cloud Function via `onRequest`. The app logic in `app.ts` is unaware of either deployment context.

**Frontend layering** — raw HTTP calls live in `api/transactions.ts`, state and orchestration in `useTransactions.ts` hook, components are pure view. This mirrors a backend service/repository split.

---

## Running locally

### Backend
```bash
cd apps/personal-finance-dashboard/backend
npm install
npm run dev        # Express on port 3001, in-memory store
npm test           # Jest + Supertest (9 tests)
```

### Frontend
```bash
cd apps/personal-finance-dashboard/frontend
npm install
npm run dev        # Vite on port 5173, proxies /transactions → localhost:3001
npm test           # Vitest + RTL (17 tests)
```

---

## CI/CD

Every push to `master`:
1. Backend tests (Jest)
2. Frontend tests (Vitest)
3. Build backend (tsc) + frontend (vite build)
4. Deploy to Firebase Hosting + Cloud Functions
5. Smoke test — assert `/transactions` returns a JSON array

Deploy only runs if all tests pass.

---

## Firebase CLI (Windows)

```powershell
npx firebase login
npx firebase deploy
npx firebase emulators:start   # Run Firestore locally
```
