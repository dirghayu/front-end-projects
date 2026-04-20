# Resly — React learning checklist

5 apps · 1 day each · build in order

*Incorporating Resly's tech stack and practices: TypeScript, CI/CD, automated testing, AI-assisted development, GCP/Firebase deployment, code reviews, architecture improvements, and mentoring*

## 1. Personal finance dashboard

**Tech Stack:** Node.js, React, TypeScript, Jest (testing), GitHub Actions (CI/CD), GCP/Firebase

*Familiar fintech domain — build React confidence with modern engineering practices*

### Setup
- [ ] Initialise project with Vite + React + TypeScript
- [ ] Install axios, recharts (or chart.js), and testing libraries (Jest, React Testing Library)
- [ ] Set up GitHub repository with CI/CD pipeline (GitHub Actions for build/test/deploy)
- [ ] Create Node.js Express backend with TypeScript
- [ ] Configure AI-assisted development tools (e.g., GitHub Copilot for code suggestions)

### Backend (Node.js + TypeScript)
- [ ] Create GET /transactions endpoint returning mock JSON with proper TypeScript types
- [ ] Add POST /transactions to add a new entry with validation
- [ ] Add simple in-memory store or JSON file persistence with error handling
- [ ] Write unit tests for all endpoints using Jest
- [ ] Implement basic CI/CD checks (linting, tests on push)

### Frontend (React + TypeScript)
- [ ] Build income/expense entry form component with TypeScript and form validation
- [ ] Display transactions in a list with delete functionality and TypeScript interfaces
- [ ] Add bar/pie chart using recharts with TypeScript
- [ ] Show total income, total expenses, net balance as cards with proper typing
- [ ] Write component tests using React Testing Library

### Polish
- [ ] Filter transactions by category with TypeScript enums
- [ ] Deploy frontend and backend to GCP/Firebase (e.g., Firebase Hosting for frontend, Cloud Functions for backend)
- [ ] Perform code review on pull request
- [ ] Optimize performance and document architecture decisions
- [ ] Test in browser — screenshot for portfolio, include CI/CD status badges

## 2. Job application tracker

**Tech Stack:** Node.js, React, TypeScript, Jest, GitHub Actions, GCP/Firebase

*Directly useful right now — CRUD mastery with scalable architecture*

### Setup
- [ ] Initialise project with Vite + React + TypeScript
- [ ] Node.js backend with express + lowdb or JSON file, using TypeScript
- [ ] Plan data model with TypeScript interfaces: company, role, status, date, notes
- [ ] Set up GitHub repository with CI/CD pipeline
- [ ] Integrate AI-assisted development for rapid prototyping

### Backend (Node.js + TypeScript)
- [ ] GET /applications — list all with TypeScript response types
- [ ] POST /applications — add new with validation and error handling
- [ ] PATCH /applications/:id — update status with proper typing
- [ ] DELETE /applications/:id — remove with confirmation
- [ ] Add automated tests for all CRUD operations
- [ ] Implement CI/CD for backend testing and deployment

### Frontend (React + TypeScript)
- [ ] Add application form (company, role, status, date) with TypeScript and validation
- [ ] Table or card list of all applications with TypeScript props
- [ ] Status badge (applied / interview / offer / rejected) using TypeScript enums
- [ ] Click to edit status inline with optimistic updates
- [ ] Write comprehensive component and integration tests

### Polish
- [ ] Filter by status with TypeScript filtering logic
- [ ] Sort by date with efficient algorithms
- [ ] Deploy to GCP/Firebase with environment-specific configurations
- [ ] Conduct code review and incorporate feedback
- [ ] Document architecture for scalability and mentor junior developers on the implementation
- [ ] Add to GitHub portfolio with CI/CD badges

## 3. Team stand-up logger

**Tech Stack:** Next.js, Node.js, TypeScript, Jest, GitHub Actions, GCP/Firebase

*Intro to Next.js routing and SSR — deploy to Vercel with enterprise practices*

### Setup
- [ ] Create Next.js app with TypeScript using npx create-next-app
- [ ] Plan pages: / (today's standups), /history with TypeScript page props
- [ ] Use Next.js API routes with TypeScript instead of separate Node server
- [ ] Set up CI/CD pipeline for automated testing and deployment
- [ ] Leverage AI tools for Next.js best practices and SSR optimization

### API routes (Next.js + TypeScript)
- [ ] POST /api/standup — save entry with TypeScript request/response types
- [ ] GET /api/standup — get today's entries with proper typing
- [ ] GET /api/standup/history — get all past entries with pagination
- [ ] Add unit tests for API routes using Jest
- [ ] Implement error handling and validation

### Frontend (React + Next.js + TypeScript)
- [ ] Standup form: name, did, will do, blockers with TypeScript form handling
- [ ] Today page shows all team entries as cards with SSR
- [ ] History page lists by date with client-side sorting
- [ ] Add a simple name selector (no auth needed) with TypeScript
- [ ] Write tests for pages and components

### Polish
- [ ] Add timestamps with proper date handling
- [ ] Deploy to GCP/Firebase (or Vercel with GCP backend) in one command
- [ ] Perform thorough code review for SSR best practices
- [ ] Optimize for performance and scalability, document architectural decisions
- [ ] Share live URL — good for interview demo, include mentoring notes on Next.js patterns

## 4. AI code refactor suggester

**Tech Stack:** Node.js, React, TypeScript, Claude API, Jest, GitHub Actions, GCP/Firebase

*Directly addresses Resly's AI tooling requirement with full-stack engineering practices*

### Setup
- [ ] Get Claude API key from console.anthropic.com
- [ ] Node.js backend with express and TypeScript
- [ ] React frontend with TypeScript and textarea input
- [ ] Set up GitHub repository with CI/CD for AI-integrated workflows
- [ ] Use AI-assisted development throughout (prompt engineering for API calls)

### Backend (Node.js + TypeScript)
- [ ] POST /refactor endpoint — accepts code string with TypeScript validation
- [ ] Call Claude API with refactor prompt using best prompt engineering practices
- [ ] Stream or return suggestion as text with error handling
- [ ] Handle API rate limits and errors gracefully
- [ ] Add comprehensive tests for API integration and error scenarios
- [ ] Implement CI/CD for automated testing of AI features

### Frontend (React + TypeScript)
- [ ] Textarea for pasting code with syntax highlighting
- [ ] Language selector (Java / JavaScript / Python) using TypeScript enums
- [ ] Submit button — show loading state with progress indicators
- [ ] Display suggestion in formatted panel side by side with diff view
- [ ] Write tests for user interactions and AI response handling

### Polish
- [ ] Add copy-to-clipboard on suggestion with TypeScript utilities
- [ ] Show diff or before/after view using a library
- [ ] Deploy to GCP/Firebase with API key management
- [ ] Conduct code review focusing on AI integration best practices
- [ ] Optimize for scalability and document AI architecture decisions
- [ ] Record a short demo video for portfolio, include mentoring on AI-assisted development

## 5. Hotel availability checker

**Tech Stack:** Node.js, React, Next.js, TypeScript, Jest, GitHub Actions, GCP/Firebase

*Resly's exact domain — shows you've done your homework with scalable architecture*

### Setup
- [ ] Create Next.js project with TypeScript
- [ ] Plan mock data with TypeScript interfaces: rooms, bookings, dates
- [ ] Think about Resly's actual product as inspiration for domain modeling
- [ ] Set up CI/CD pipeline for continuous deployment
- [ ] Integrate AI-assisted development for complex availability logic

### Backend / API routes (Next.js + TypeScript)
- [ ] GET /api/rooms — list all rooms with type and price, using TypeScript
- [ ] POST /api/bookings — check availability for date range with validation
- [ ] POST /api/bookings/confirm — create booking with conflict resolution
- [ ] Mock availability logic (no DB needed) with scalable algorithms
- [ ] Add unit and integration tests for booking logic
- [ ] Implement automated testing in CI/CD

### Frontend (React + TypeScript)
- [ ] Date range picker (use react-datepicker) with TypeScript
- [ ] Room type filter (single/double/suite) using TypeScript enums
- [ ] Availability results as cards with price and TypeScript props
- [ ] Book now button — show confirmation modal with form validation
- [ ] Write tests for booking flow and edge cases

### Polish
- [ ] Show booked vs available clearly with visual indicators
- [ ] Add guest count selector with validation
- [ ] Deploy to GCP/Firebase with production optimizations
- [ ] Perform code review and incorporate scalability feedback
- [ ] Optimize performance for high availability, document architecture for Resly's domain
- [ ] Write a note in README: built to understand Resly's domain, include mentoring on hospitality tech patterns