# Hotel Admin Dashboard

[![CI / Deploy](https://github.com/dirghayu/front-end-projects/actions/workflows/ci.yml/badge.svg)](https://github.com/dirghayu/front-end-projects/actions/workflows/ci.yml)

A full-stack hotel admin dashboard for managing bookings — search, sort, paginate, and update booking status.

**Live:** https://hotel-admin-a5563.web.app

---

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript, Vite |
| Backend | Node.js, Express 5, TypeScript |
| Database | In-memory (seeded on cold start) |
| Hosting | Firebase Hosting + Cloud Functions v2 (2nd gen) |
| Testing | Jest + Supertest (backend), Vitest + React Testing Library (frontend) |
| CI/CD | GitHub Actions — typecheck + test + deploy on every push to `master` |

---

## Architecture

```
apps/hotel-admin-dashboard/
├── backend/
│   ├── src/
│   │   ├── routes/app.ts           # Express routes (dependency-injected)
│   │   ├── repository/
│   │   │   ├── BookingRepository.ts    # Interface
│   │   │   └── InMemoryRepository.ts  # Implementation (seeded)
│   │   ├── types/Booking.ts        # Domain types
│   │   ├── index.ts                # Firebase Functions entry point
│   │   └── server.ts               # Local dev entry point
│   └── src/__tests__/
│       └── bookings.test.ts
└── frontend/
    ├── src/
    │   ├── api/bookings.ts         # HTTP layer (axios)
    │   ├── hooks/useTableControls.ts  # Search, sort, pagination state
    │   ├── components/
    │   │   ├── BookingsTable.tsx   # Sortable, paginated table
    │   │   ├── StatsBar.tsx        # Occupancy, revenue, status counts
    │   │   └── AddBookingModal.tsx
    │   └── types.ts
    └── src/__tests__/
```

### Key design decisions

**Repository pattern** — `BookingRepository` interface with `InMemoryRepository` implementation. Tests inject the in-memory repo directly — no mocking required. Same pattern as the finance dashboard and mirrors Spring `@Repository`.

**Split entry points** — `server.ts` for local dev, `index.ts` wraps the Express app in a Firebase Cloud Function via `onRequest`. App logic is unaware of either context.

**Frontend hook separation** — `useTableControls` owns all search/sort/pagination state as pure derived computation (`useMemo`). Components are stateless view layers.

---

## Running locally

### Backend
```bash
cd apps/hotel-admin-dashboard/backend
npm install
npm run dev        # Express on port 3002, seeded in-memory store
npm test           # Jest + Supertest
```

### Frontend
```bash
cd apps/hotel-admin-dashboard/frontend
npm install
npm run dev        # Vite on port 5173, proxies /bookings → localhost:3002
npm test           # Vitest + RTL
```

---

## CI/CD

Every push to `master`:
1. Hotel backend tests (Jest)
2. Hotel frontend typecheck + tests (Vitest)
3. Build backend (tsc) + frontend (vite build)
4. Deploy to Firebase Hosting + Cloud Functions v2
5. Smoke test — assert `/bookings` returns a JSON array

Deploy only runs if all tests pass (across both apps in the monorepo).
