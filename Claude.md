# Full Stack Portfolio — Monorepo

## Project Overview
Building a full-stack portfolio to demonstrate senior-level skills. Two apps in one monorepo: a personal finance dashboard and a hotel admin dashboard. Incorporating: TypeScript, CI/CD, automated testing, AI-assisted development, GCP/Firebase deployment, and modern engineering practices.

## Apps

| App | Live URL | Frontend | Backend |
|-----|----------|----------|---------|
| Personal Finance Dashboard | https://finance-dashboard-e51e4.web.app | React 19 + Vite | Express 5 + Firestore |
| Hotel Admin Dashboard | https://hotel-admin-a5563.web.app | React 19 + Vite | Express 5 + In-memory |

## Current Status

### ✅ Completed
- **Both apps**: Full-stack CRUD, TypeScript throughout, layered architecture (api → hooks → components)
- **Finance dashboard**: Transactions with income/expense filtering, charts (Recharts), category pills
- **Hotel admin dashboard**: Bookings table with search, sorting, pagination, status updates, stats bar
- **Automated Testing**: 27+ tests across both apps (Jest + Supertest backend, Vitest + RTL frontend)
- **CI/CD**: GitHub Actions — 4 parallel test jobs (typecheck + tests), deploy job gated on all passing
- **Firebase Deployment**:
  - Finance dashboard → `finance-dashboard-e51e4` (Blaze, Firestore backend)
  - Hotel dashboard → `hotel-admin-a5563` (Blaze, in-memory backend, Cloud Functions v2)
  - Both deployed via `FIREBASE_TOKEN` secret in GitHub Actions
  - Smoke tests assert JSON array response post-deploy
- **CI/CD badges**: In both READMEs

### ❌ Not Started
- **Category filtering with TypeScript enums** (finance dashboard)
- **Code review process** (pull request workflow documentation)
- **Performance optimisation**

## Architecture

```
apps/
├── personal-finance-dashboard/
│   ├── backend/src/
│   │   ├── app.ts                  # Express routes
│   │   ├── repository.ts           # TransactionRepository interface
│   │   ├── InMemoryRepository.ts   # Tests + local dev
│   │   ├── FirestoreRepository.ts  # Production
│   │   ├── index.ts                # Firebase Functions entry point
│   │   └── server.ts               # Local dev entry point
│   └── frontend/src/
│       ├── api/transactions.ts
│       ├── hooks/useTransactions.ts
│       └── components/
└── hotel-admin-dashboard/
    ├── backend/src/
    │   ├── routes/app.ts
    │   ├── repository/
    │   │   ├── BookingRepository.ts
    │   │   └── InMemoryRepository.ts
    │   ├── index.ts                # Firebase Functions entry point
    │   └── server.ts
    └── frontend/src/
        ├── api/bookings.ts
        ├── hooks/useTableControls.ts
        └── components/
```

## CI/CD Pipeline (.github/workflows/ci.yml)

4 parallel test jobs → 1 deploy job (master push only):
1. `test-backend` — finance backend Jest
2. `test-frontend` — finance frontend typecheck + Vitest
3. `test-hotel-backend` — hotel backend Jest
4. `test-hotel-frontend` — hotel frontend typecheck + Vitest
5. `deploy` — builds + deploys both apps + smoke tests

## Commands

```bash
# Finance backend
cd apps/personal-finance-dashboard/backend
npm run dev && npm test

# Finance frontend
cd apps/personal-finance-dashboard/frontend
npm run dev && npm test && npm run typecheck

# Hotel backend
cd apps/hotel-admin-dashboard/backend
npm run dev && npm test

# Hotel frontend
cd apps/hotel-admin-dashboard/frontend
npm run dev && npm test && npm run typecheck
```

## Firebase CLI (Windows)
Always use `npx` prefix — `firebase` not in PATH after global install:

```powershell
npx firebase login
npx firebase projects:list
npx firebase deploy
```

## Notes
- Finance backend: port 3001, Hotel backend: port 3002
- Vite proxies `/transactions` → 3001, `/bookings` → 3002
- Hotel Cloud Functions deploy as 2nd gen — hosting rewrites use `run.serviceId` not `function`
- 2nd gen Cloud Functions require `allUsers` Cloud Functions Invoker IAM binding for public access
- `type="date"` replaced with `type="text"` + pattern — jsdom can't interact with browser date pickers
- jsdom@25 used (not happy-dom) — React 19 event delegation requires root container propagation
