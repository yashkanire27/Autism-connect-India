# Autism Connect India — Build Status

By current agreement, this build is scoped to three complete modules:
**Child Profiles**, **Activities**, and **Activity Recommendations**. No
other modules (Consultants, Donations, Puzzles, Admin panel, etc.) are being
added right now. Everything below is real, working, end-to-end code — no
placeholders.

## ✅ Complete modules

### 1. Child Profile
- Full basic-info capture: name, age, gender, autism level, interests,
  communication skills, behavior notes, therapist notes, medical notes,
  favorite activities
- Create / Read / Update / Delete, both via API and a working UI form
  (`ParentDashboard.js` + `ChildFormModal.js`)
- Scoped per parent — a parent only ever sees their own children
  (enforced server-side via JWT + the `parents` → `children` relationship)

### 2. Activities
- Full card fields: title, description, image, difficulty, duration, age
  group, materials needed, benefits, instructions, category, YouTube link,
  Instagram link
- Create / Read / Update / Delete via a working UI (`Activities.js` +
  `ActivityFormModal.js`)
- Search by keyword and filter by category (12 categories from the spec)

### 3. Recommendations
- Each child's dashboard card shows 3 "Recommended activities" matched to
  their autism level (`utils/recommendations.js` maps level → categories)
- Each recommended activity shows its thumbnail plus YouTube/Instagram links
  so parents can actually watch how to do it

## Backend (`/backend/autism-connect-backend`) — Spring Boot 3 / Java 17
- Layered architecture: entity → repository → service → controller → dto → security → config → exception
- JWT authentication (register, login, forgot/reset password, logout)
- Spring Security with role-based route protection, BCrypt hashing
- Global exception handling → clean JSON error responses
- Bean validation on all request DTOs

## Frontend (`/frontend/autism-connect-frontend`) — React 18
- Routing, AuthContext, axios with JWT interceptor
- i18next: English / Hindi / Marathi / Kannada
- Glassmorphism design system, dark mode, responsive grid
- Pages: Landing, Login, Register, Parent Dashboard, Activities, 404

## How to run

**Database**
```bash
mysql -u root -p < database/schema.sql
```

**Backend**
```bash
cd backend/autism-connect-backend
# edit src/main/resources/application.properties with your MySQL password
mvn spring-boot:run
# API runs on http://localhost:8080/api
```

**Frontend**
```bash
cd frontend/autism-connect-frontend
npm install
npm start
# App runs on http://localhost:3000
```

## Try it end-to-end

1. Register a Parent account → lands on the dashboard
2. Click "+ Add Child Profile" → fill in the full form → save → card appears
   with recommended activities underneath
3. Click "Activities" in the navbar → add/edit/delete activity cards, filter
   by category, search by keyword, click through to YouTube/Instagram links

## Documentation included

- `documentation/child-profile-test-cases.md` — 18 manual test cases for
  the Child Profile module (Testing Report format)

## Out of scope for now

Consultants + appointments, donations, puzzles/games, progress-tracking
charts, camera capture, admin panel, blogs/notifications/feedback, and the
diagram/synopsis documentation set. These are intentionally paused per your
current request — say the word whenever you want to pick one back up.
