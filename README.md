# Full Stack Portfolio

[![CI / Deploy](https://github.com/dirghayu/front-end-projects/actions/workflows/ci.yml/badge.svg)](https://github.com/dirghayu/front-end-projects/actions/workflows/ci.yml)

A monorepo of full-stack apps built with React 19, TypeScript, Node.js, and Firebase — demonstrating CI/CD, automated testing, cloud deployment, and layered architecture.

---

## Apps

| App | Description | Live |
|-----|-------------|------|
| [Personal Finance Dashboard](apps/personal-finance-dashboard/) | Track income and expenses with charts, category filtering, and a Firestore-backed REST API | [finance-dashboard-e51e4.web.app](https://finance-dashboard-e51e4.web.app) |
| [Hotel Admin Dashboard](apps/hotel-admin-dashboard/) | Manage hotel bookings with search, sorting, pagination, and real-time status updates | [hotel-admin-a5563.web.app](https://hotel-admin-a5563.web.app) |

---

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript, Vite |
| Backend | Node.js, Express 5, TypeScript |
| Database | Firestore (finance), In-memory (hotel) |
| Hosting | Firebase Hosting + Cloud Functions v2 |
| Testing | Jest + Supertest (backend), Vitest + React Testing Library (frontend) |
| CI/CD | GitHub Actions |

---

## CI/CD Pipeline

Every push to `master` runs 4 parallel test jobs, then deploys both apps only if all pass:

```
test-backend ──┐
test-frontend ─┤
               ├─► deploy → smoke test both live URLs
test-hotel-backend ─┤
test-hotel-frontend ┘
```

---

## Architecture

Both apps follow the same layered pattern:

```
backend/src/
├── routes/app.ts          # Express routes (dependency-injected)
├── repository/            # Interface + implementations (InMemory / Firestore)
├── index.ts               # Firebase Functions entry point
└── server.ts              # Local dev entry point

frontend/src/
├── api/                   # HTTP layer (axios)
├── hooks/                 # State + orchestration
└── components/            # Pure view components
```

The repository pattern means tests inject an `InMemoryRepository` directly — no mocking of Firebase Admin SDK required.

---

## Running locally

```bash
# Finance dashboard
cd apps/personal-finance-dashboard/backend && npm install && npm run dev   # port 3001
cd apps/personal-finance-dashboard/frontend && npm install && npm run dev  # port 5173

# Hotel admin dashboard
cd apps/hotel-admin-dashboard/backend && npm install && npm run dev        # port 3002
cd apps/hotel-admin-dashboard/frontend && npm install && npm run dev       # port 5173
```

---

## WIP

| Item | Status |
|------|--------|
| Category filtering with TypeScript enums (finance dashboard) | Not started |
| Pull request workflow + code review process | Not started |
| Performance optimisation (bundle analysis, React.memo) | Not started |
| Job application tracker app | Not started |
| AI code refactor suggester (Claude API) | Not started |
