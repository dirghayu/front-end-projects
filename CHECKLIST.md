# Portfolio Checklist

## App 1 — Personal Finance Dashboard
**Stack:** Node.js, React · **Status:** ✅ Complete · **Live:** https://finance-dashboard-e51e4.web.app

- [x] Initialise project with Vite
- [x] Install axios, recharts, react-datepicker
- [x] Create Node.js Express backend
- [x] GET /transactions endpoint
- [x] POST /transactions endpoint
- [x] DELETE /transactions endpoint
- [x] In-memory store + Firestore (production)
- [x] Income/expense entry form component
- [x] Transaction list with delete
- [x] Bar/pie chart using recharts
- [x] Summary cards (income, expenses, net balance)
- [x] Filter transactions by type (income/expense)
- [x] Deploy to Firebase
- [x] CI/CD pipeline (GitHub Actions)
- [ ] Filter by category (TypeScript enums)

---

## App 2 — Hotel Admin Dashboard
**Stack:** Node.js, React · **Status:** ✅ Complete · **Live:** https://hotel-admin-a5563.web.app

- [x] Initialise project with Vite + React
- [x] Node.js backend with Express
- [x] Plan data model: guest, room, status, dates, amount
- [x] GET /bookings — list all
- [x] POST /bookings — add new
- [x] PATCH /bookings/:id/status — update status
- [x] DELETE /bookings/:id — remove
- [x] Bookings table with sortable columns
- [x] Search by guest name or room
- [x] Pagination
- [x] Status badge with click-to-change
- [x] Stats bar (checked-in, pending, occupancy, revenue)
- [x] Add booking modal
- [x] Deploy to Firebase
- [x] CI/CD pipeline

---

## App 3 — Job Application Tracker
**Stack:** Node.js, React · **Status:** ⬜ Not started

### Setup
- [ ] Initialise project with Vite + React
- [ ] Node.js backend with Express
- [ ] Plan data model: company, role, status, date, notes

### Backend
- [ ] GET /applications — list all
- [ ] POST /applications — add new
- [ ] PATCH /applications/:id — update status
- [ ] DELETE /applications/:id — remove

### Frontend
- [ ] Add application form (company, role, status, date)
- [ ] Table or card list of all applications
- [ ] Status badge (applied / interview / offer / rejected)
- [ ] Click to edit status inline

### Polish
- [ ] Filter by status
- [ ] Sort by date
- [ ] Deploy to Firebase
- [ ] Add to GitHub portfolio

---

## App 4 — Team Stand-up Logger
**Stack:** Next.js, Node.js · **Status:** ⬜ Not started

### Setup
- [ ] Create Next.js app
- [ ] Plan pages: / (today's standups), /history
- [ ] Use Next.js API routes instead of separate Node server

### API routes
- [ ] POST /api/standup — save entry
- [ ] GET /api/standup — get today's entries
- [ ] GET /api/standup/history — get all past entries

### Frontend
- [ ] Standup form: name, did, will do, blockers
- [ ] Today page shows all team entries as cards
- [ ] History page lists by date
- [ ] Simple name selector (no auth needed)

### Polish
- [ ] Add timestamps
- [ ] Deploy to Vercel or Firebase
- [ ] Share live URL

---

## App 5 — AI Code Refactor Suggester
**Stack:** Node.js, React, Claude API · **Status:** ⬜ Not started

### Setup
- [ ] Get Claude API key from console.anthropic.com
- [ ] Node.js backend with Express
- [ ] React frontend with textarea input

### Backend
- [ ] POST /refactor endpoint — accepts code string
- [ ] Call Claude API with refactor prompt
- [ ] Stream or return suggestion as text
- [ ] Handle errors gracefully

### Frontend
- [ ] Textarea for pasting code
- [ ] Language selector (Java / JavaScript / Python)
- [ ] Submit button with loading state
- [ ] Display suggestion in formatted panel (side by side)

### Polish
- [ ] Add copy-to-clipboard on suggestion
- [ ] Show diff or before/after view
- [ ] Deploy and add to portfolio
