# Personal Finance Dashboard - Resly Learning Project

## Project Overview
Building a full-stack personal finance dashboard to demonstrate senior-level skills for Resly's Full Stack Developer position. Incorporating all required technologies: TypeScript, CI/CD, automated testing, AI-assisted development, GCP/Firebase deployment, and modern engineering practices.

## Current Status

### ✅ Completed
- **Backend (Express.js + TypeScript)**: REST API with GET/POST/DELETE endpoints, fully typed with interfaces, split into `app.ts` (testable) and `server.ts` (entry point)
- **Frontend (React 19 + Vite + TypeScript)**: All components in `.tsx`, typed props/state, layered architecture:
  - `src/api/transactions.ts` — HTTP calls (repository layer)
  - `src/hooks/useTransactions.ts` — state + orchestration (service layer)
  - `src/components` — pure view components
- **Shared Types**: `Transaction`, `CreateTransactionBody`, `TransactionType`
- **Git Setup**: Repository initialised at project root with `.gitignore`
- **TypeScript**: Zero `tsc` errors on both backend and frontend
- **Automated Testing**:
  - Backend: Jest + Supertest — 10 tests covering GET/POST/DELETE, validation, isolation via `resetTransactions()`
  - Frontend: Vitest + React Testing Library — 17 tests covering form, list, and `useTransactions` hook
- **Code Quality**: Accessible form labels, empty states, error banners, `useMemo` for chart data, `useCallback` for stable callbacks, cancellable `useEffect`

### 🔄 In Progress
- **CI/CD Pipeline**: GitHub Actions workflow (Increment 3)
- **Deployment**: Firebase Hosting + Functions (Increment 3)

### ❌ Not Started
- **Category filtering** (TypeScript enums)
- **Code review process** (pull request workflow)
- **Architecture documentation**
- **CI/CD status badges in README**

## Architecture

```
apps/personal-finance-dashboard/
├── backend/
│   ├── src/
│   │   ├── app.ts          # Express app + routes + types (imported by tests)
│   │   ├── server.ts       # Entry point — calls app.listen() only
│   │   └── __tests__/
│   │       └── transactions.test.ts
│   ├── tsconfig.json
│   └── jest.config.ts
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── transactions.ts     # Raw HTTP calls
    │   ├── hooks/
    │   │   └── useTransactions.ts  # State + side effects
    │   ├── __tests__/
    │   │   ├── setup.ts
    │   │   ├── TransactionForm.test.tsx
    │   │   ├── TransactionList.test.tsx
    │   │   └── useTransactions.test.tsx
    │   ├── App.tsx
    │   ├── TransactionForm.tsx
    │   ├── TransactionList.tsx
    │   ├── Charts.tsx
    │   └── types.ts
    ├── tsconfig.json
    └── vite.config.ts
```

## Tech Stack
- **Frontend**: React 19, Vite, TypeScript, axios, recharts, Vitest, React Testing Library
- **Backend**: Node.js, Express 5, TypeScript, Jest, Supertest
- **Next**: GitHub Actions (CI/CD), Firebase Hosting + Functions (deployment)

## Checklist Progress
- [x] Basic CRUD operations
- [x] React components (form, list, charts)
- [x] Express API endpoints
- [x] Git repository setup
- [x] TypeScript implementation (frontend + backend)
- [x] Automated testing (Jest + Vitest, 27 tests total)
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Cloud deployment (Firebase)
- [ ] Code review process
- [ ] Performance optimisation
- [ ] Architecture documentation

## Commands

```bash
# Backend
cd apps/personal-finance-dashboard/backend
npm run dev          # ts-node + nodemon
npm test             # Jest
npm run test:coverage

# Frontend
cd apps/personal-finance-dashboard/frontend
npm run dev          # Vite dev server
npm test             # Vitest
npm run test:coverage
npm run typecheck    # tsc --noEmit
```

## Firebase CLI (Windows)
`firebase` is not added to PATH after `npm install -g firebase-tools` on Windows.
Always use `npx` prefix:

```powershell
npx firebase login
npx firebase projects:list
npx firebase init
npx firebase deploy
npx firebase emulators:start
```

## Notes
- Backend runs on port 3001
- Frontend Vite proxy forwards `/transactions` → `localhost:3001` (no hardcoded URLs in source)
- `type="date"` input replaced with `type="text"` + pattern — browser date pickers are untestable in jsdom and production apps use picker libraries (react-datepicker etc.)
- happy-dom dropped in favour of jsdom@25 — React 19 changed event delegation to root container; happy-dom doesn't propagate events up to it
