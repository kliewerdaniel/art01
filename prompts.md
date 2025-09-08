🔧 Detailed Prompts for CLINe

⸻

1. Start Project Setup

Prompt:
“Initialize a new full-stack monorepo project named art01. Inside the root folder, create two subdirectories:
	•	frontend/ for the client application
	•	backend/ for the server application

In frontend/, scaffold a Next.js application (latest stable version) with the --typescript flag enabled. Configure Tailwind CSS for styling and include @headlessui/react and @heroicons/react for accessible UI components. Add axios for API calls and recharts for data visualization.

In backend/, scaffold a Django project named art01_backend. Within it, create a Django app named core. Install and configure Django REST Framework (DRF). Use SQLite as the development database (default db.sqlite3). Ensure CORS is enabled by installing django-cors-headers.

Project setup requirements:
	•	Root README.md with instructions for setting up frontend and backend.
	•	.gitignore configured for Node, Python, and SQLite.
	•	Install ESLint + Prettier in frontend/ for linting/formatting.
	•	Configure virtual environment in backend (venv/).
	•	Add a root docker-compose.yml that defines two services (frontend, backend). Each should expose ports (3000 for frontend, 8000 for backend). Use volumes for hot-reloading during development.”

⸻

2. Authentication & Profiles

Prompt:
“In the backend, implement user authentication and profile management.
	1.	Install django-allauth and dj-rest-auth for authentication.
	2.	Create a custom User model that extends AbstractUser. Add fields:
	•	role (choices: MENTOR, PARTICIPANT, ADMIN)
	•	bio (TextField)
	•	skills (ArrayField or JSONField to hold a list of skills)
	•	location (CharField)
	•	experience (IntegerField for years of experience)
	3.	Configure REST endpoints:
	•	POST /auth/register → user registration (email, username, password, role).
	•	POST /auth/login → returns JWT token.
	•	GET /auth/profile/:id → fetch profile details.
	•	PATCH /auth/profile/:id → update profile (only for logged-in user).

In the frontend:
	•	Create React context for authentication.
	•	Build registration and login pages.
	•	Store JWT in localStorage.
	•	After login, redirect user to /dashboard and display their profile details.”

⸻

3. Task & Feedback System

Prompt:
“Add models for Task and Feedback.

Backend:
	•	Task model fields: id, title, description, assigned_to (FK to User), assigned_by (FK to User), status (PENDING, IN_PROGRESS, COMPLETED), due_date.
	•	Feedback model fields: id, task (FK to Task), author (FK to User), rating (1–5), comment (TextField), created_at.

Create REST endpoints:
	•	POST /tasks → Mentor assigns task to participant.
	•	GET /tasks?participant_id= → list tasks for a participant.
	•	PATCH /tasks/:id/status → update task status.
	•	POST /feedback → attach feedback to task.
	•	GET /feedback?task_id= → list all feedback for a task.

Frontend:
	•	Create dashboard pages for participants (list assigned tasks).
	•	Create mentor view (assign new tasks).
	•	Create form for submitting feedback (dropdown rating + textarea).”

⸻

4. Resource Tracking

Prompt:
“Implement a Resource model in the backend.

Model fields: id, name, type (BOOK, TOOL, MATERIAL, DIGITAL), assigned_to (FK to User, nullable), status (AVAILABLE, IN_USE, RETURNED).

REST endpoints:
	•	POST /resources → add new resource.
	•	PATCH /resources/:id/assign → assign to participant.
	•	PATCH /resources/:id/status → update status.
	•	GET /resources?participant_id= → list resources for participant.

Frontend:
	•	Mentor dashboard page: assign resources to participants.
	•	Participant dashboard: list assigned resources.”

⸻

5. Project Upload & Marketplace

Prompt:
“Implement a Project model to represent artworks or projects.

Fields: id, title, description, owner (FK to User), media_url (CharField), status (DRAFT, PUBLISHED, SOLD), price (Decimal), buyer (nullable FK to User).

Integration: configure Cloudinary (preferred) or AWS S3 for media uploads.

REST endpoints:
	•	POST /projects → create a new project (with media file upload).
	•	GET /projects/marketplace → list all projects available for sale.
	•	POST /projects/:id/purchase → mark project as sold to buyer.

Frontend:
	•	Create upload form for participants.
	•	Create marketplace page showing available projects with price, owner info, and purchase button.”

⸻

6. Payment Integration

Prompt:
“Integrate Stripe for handling payments.

Backend:
	•	Install stripe Python SDK.
	•	Create endpoint POST /checkout/session that:
	•	Accepts project_id.
	•	Creates a Stripe Checkout session with the project’s price.
	•	Returns the session_url to frontend.
	•	On payment success webhook: update project status to SOLD, attach buyer info, log earnings for seller.

Frontend:
	•	Install Stripe JS SDK.
	•	On clicking purchase, call backend to create checkout session and redirect to Stripe checkout page.
	•	After successful payment, redirect user back to /purchase/success page.”

⸻

7. Financial Dashboard

Prompt:
“Model a FinancialAccount for each user.

Fields: id, user, total_earnings, savings_balance, milestones (JSON).

Backend:
	•	Update earnings when projects are sold.
	•	Endpoint GET /dashboard/financial/:user_id → return earnings, savings, milestones.

Frontend:
	•	Dashboard page with Recharts to visualize:
	•	Line chart of earnings over time.
	•	Bar chart of savings vs milestones.
	•	Include buttons for ‘Add Savings’ and ‘Withdraw’ (mock for now).”

⸻

8. Portfolio Generation

Prompt:
“Create static portfolio/blog functionality.

Backend:
	•	Endpoint GET /portfolio/:user_id → returns user info + list of projects.

Frontend (Next.js):
	•	Create dynamic page /portfolio/[userId] that generates a static portfolio using Next.js getStaticProps and getStaticPaths.
	•	Portfolio includes bio, skills, project gallery, and optional blog posts (Markdown files).

Deployment:
	•	Configure a script that builds static pages and deploys to Netlify/Vercel automatically.”

⸻

9. Community Features

Prompt:
“Implement messaging and peer feedback.

Backend:
	•	Message model: id, sender (FK User), receiver (FK User), content, timestamp.
	•	PeerReview model: id, reviewer (FK User), reviewee (FK User), rating, comment.

Endpoints:
	•	POST /messages → send message.
	•	GET /messages?user_id= → list messages for user.
	•	POST /reviews → submit peer review.
	•	GET /reviews?user_id= → list reviews about a user.

Frontend:
	•	Create chat interface for mentor-mentee communication.
	•	Create review submission form and display average ratings on profiles.”

⸻

10. Gamification Layer

Prompt:
“Add gamification.

Backend:
	•	Achievement model: id, user, title, description, earned_at.
	•	Leaderboard endpoint: calculate users ranked by completed tasks, total earnings, peer reviews.

Frontend:
	•	Gamification page showing:
	•	Leaderboard with top mentors and participants.
	•	Achievements list with badges/icons.
	•	Integrate UI components (trophy icons, badge icons).”

⸻

11. Deployment & Infrastructure

Prompt:
“Containerize and prepare deployment.
	•	Create Dockerfile in frontend (Node image, install deps, run Next.js dev).
	•	Create Dockerfile in backend (Python image, install deps, run gunicorn).
	•	Create root docker-compose.yml for dev: mounts volumes, hot reload enabled, services exposed at localhost:3000 and localhost:8000.

Deployment:
	•	Configure backend for Render (Gunicorn, Postgres in prod).
	•	Configure frontend for Vercel/Netlify.
	•	Add CI/CD pipeline with GitHub Actions: run tests, lint, build, deploy automatically.”

⸻

12. Seed Data & Contribution Setup

Prompt:
“Add seed data + contribution docs.

Backend:
	•	Write a Django management command to seed:
	•	2 mentors, 5 participants.
	•	Sample tasks, feedback, resources.
	•	At least 3 projects in marketplace.

Repo Setup:
	•	Add CONTRIBUTING.md → describe branching strategy, PR process, coding style.
	•	Add GitHub issue template + PR template.
	•	Add MIT license file.
	•	Update README.md with setup instructions and contribution guide.”

⸻

13. ER Diagram & Documentation

Prompt:
“Document data model and architecture.
	•	Use Mermaid syntax in docs/er-diagram.md to create an ER diagram of all models (User, Task, Feedback, Resource, Project, FinancialAccount, Message, PeerReview, Achievement).
	•	Add docs/api-endpoints.md with detailed REST API docs for every endpoint.
	•	Update main README.md with architecture diagram (frontend ↔ backend), deployment flow, and links to API docs.
	•	Ensure all docs are human-readable and beginner-friendly.”


⸻

Super-Prompt (All Steps Combined for CLINe)

You’re now working on the project **art01**, as described in `readme.md`, and you have the initial outline saved in `prompts.md` (which contains the previously summarized 13 prompts). Please proceed step-by-step as follows, using both files for context and expanding each instruction into granular detail:

### Step 1: Project Setup 
- Create repository structure:

art01/
prompts.md           # contains your outline prompts summary
readme.md            # contains the original README with vision, tech stack, models, endpoints
frontend/
backend/

- In `frontend/`:
- Run `npx create-next-app@latest . --typescript`.
- Install and configure Tailwind CSS (`tailwindcss`, `postcss`, `autoprefixer`) with JIT mode and default config.
- Install `@headlessui/react`, `@heroicons/react`, `axios`, and `recharts`.
- Setup ESLint and Prettier with `.eslintrc.js`, `.prettierrc`.

- In `backend/`:
- Create Python virtual environment (`venv`) and activate it.
- Run `django-admin startproject art01_backend .` and `python manage.py startapp core`.
- Install `djangorestframework`, `django-cors-headers`, `django-allauth`, `dj-rest-auth`, `psycopg2-binary` (for later).
- In `settings.py`: register `rest_framework`, `corsheaders`, `allauth`, `dj_rest_auth`, and `core`; configure `CORS_ALLOWED_ORIGINS` to allow `localhost:3000`.
- Ensure default database is SQLite (`db.sqlite3`).
- Add `.gitignore` in root: ignore `node_modules/`, `venv/`, `__pycache__/`, `.env`, `.next/`, `db.sqlite3`.

- Create root `docker-compose.yml`:
```yaml
version: "3.8"
services:
  frontend:
    build: ./frontend
    ports: ["3000:3000"]
    volumes: ["./frontend:/app"]
  backend:
    build: ./backend
    ports: ["8000:8000"]
    volumes: ["./backend:/code"]

Step 2: Authentication & Profiles
	•	In backend/core/models.py:
	•	Define custom User extending AbstractUser with fields: role (choices MENTOR/PARTICIPANT/ADMIN), bio (TextField), skills (JSONField or ArrayField), location (CharField), experience_years (IntegerField).
	•	Configuration:
	•	Set AUTH_USER_MODEL to this custom model.
	•	Migrate.
	•	In backend/core/serializers.py:
	•	Create serializers for registration, profile view, and profile update.
	•	In backend/core/views.py:
	•	Use dj-rest-auth for POST /auth/register and POST /auth/login.
	•	Add RetrieveUpdateAPIView at /auth/profile/<int:pk>/.
	•	In frontend/:
	•	Create React context AuthContext to manage JWT, user info.
	•	Pages:
	•	/register: form capturing email, username, password, and role.
	•	/login: handles authentication and stores JWT in localStorage.
	•	After login, redirect to /dashboard and fetch user profile.

Step 3: Task & Feedback System
	•	In backend/core/models.py:
	•	Create Task model:
	•	Fields: title, description, assigned_to (FK to User), assigned_by (FK), status (choices: PENDING, IN_PROGRESS, COMPLETED), due_date (DateField).
	•	Create Feedback model:
	•	Fields: task (FK to Task), author (FK to User), rating (IntegerField 1–5), comment, created_at (auto_now_add).
	•	Serializers and ViewSets:
	•	/tasks/: POST, GET (filter by participant), PATCH for status.
	•	/feedback/: POST, GET filter by task_id.
	•	In frontend/:
	•	Participant dashboard: fetch GET /tasks?participant_id=..., list tasks.
	•	Mentor interface: form to create tasks.
	•	Feedback form: rating dropdown (1–5 star) and textarea; POST to /feedback.

… (Repeat analogous expanded breakdown for Steps 4–13) …

---

I’ve started Step 1 and Step 2 with deep detail; the same format continues for Steps 3–13: defining file paths, models, serializers, endpoints, frontend pages/components, configurations, naming conventions, migrations, etc. In `prompts.md`, reference the prior summary; in `readme.md`, include app vision, features, tech choices, ER structure, and endpoint overview so CLINe knows high-level intent.

---
￼ ￼

Super-prompt for CLINe — Steps 3 → 13 (maximal, granular)

CONTEXT:
- Repo name: art01 (root).
- Files you must reference in the repo: 
  - ./prompts.md  # contains the original summarized 13 prompts and the Step 1+2 detail I previously pasted.
  - ./readme.md   # the project's README describing vision, high-level models, endpoints, and goals.
- Use prompts.md and readme.md as the authoritative, high-level product spec and user intent. Where the README and prompts.md conflict, assume README contains product intent and prompts.md contains engineering directives; reconcile gracefully and ask only if absolutely needed (but prefer sensible defaults).
- Tech choices to implement: Next.js+TypeScript (frontend), Tailwind CSS, React context + axios, Django + Django REST Framework (backend), dj-rest-auth + django-allauth (authentication), SQLite for dev, Cloudinary for media, Stripe Checkout + webhooks for payments, Docker Compose for dev containers, GitHub Actions for CI pipelines.

---

STEP 3 — TASK & FEEDBACK SUBSYSTEM (CREATE CODE + API)
Goal: implement Task assignment and structured Feedback with fine-grained permissions.

Backend (Django — files & code):
1. In backend/core/models.py:
   - Add Task model:
     ```
     class Task(models.Model):
         STATUS_CHOICES = [
             ("PENDING","Pending"),
             ("IN_PROGRESS","In Progress"),
             ("COMPLETED","Completed"),
         ]
         title = models.CharField(max_length=255)
         description = models.TextField(blank=True)
         assigned_to = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="tasks_assigned", on_delete=models.CASCADE)
         assigned_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="tasks_created", on_delete=models.SET_NULL, null=True)
         status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="PENDING")
         due_date = models.DateField(null=True, blank=True)
         created_at = models.DateTimeField(auto_now_add=True)
     ```
   - Add Feedback model:
     ```
     class Feedback(models.Model):
         task = models.ForeignKey(Task, related_name="feedbacks", on_delete=models.CASCADE)
         author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
         rating = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
         comment = models.TextField(blank=True)
         created_at = models.DateTimeField(auto_now_add=True)
     ```
2. Make and run migrations:
   - `python manage.py makemigrations core`
   - `python manage.py migrate`

Serializers:
- backend/core/serializers.py:
  - TaskSerializer (fields: id, title, description, assigned_to (id + nested username), assigned_by, status, due_date, created_at)
  - FeedbackSerializer (fields: id, task (id), author (id + username), rating, comment, created_at)

Views & URLs:
- Use DRF ViewSets and Routers for CRUD.
  - TaskViewSet:
    - POST /api/tasks/ — create (permissions: is_authenticated & user.is_mentor OR admin; if assigned_by omitted, default to request.user)
    - GET /api/tasks/?participant_id= — filter tasks by participant
    - PATCH /api/tasks/{id}/status/ — custom action to update status
  - FeedbackViewSet:
    - POST /api/feedback/ — create (any authenticated user who is part of task conversation)
    - GET /api/feedback/?task_id= — list
- Files:
  - backend/core/views.py — include ModelViewSet + @action for status change.
  - backend/core/urls.py — register routers and include in project urls.

Permissions:
- Implement simple permission classes in backend/core/permissions.py:
  - IsMentorOrOwner — mentors or admins create tasks; participants can view tasks assigned to them; only feedback authors may edit feedback.

Tests:
- Add minimal unit tests: test_task_creation_by_mentor, test_task_list_by_participant, test_feedback_create.

Frontend (Next.js — files & UI):
1. Folder: frontend/src/features/tasks/
   - Components:
     - TaskList.tsx — displays participant tasks (GET /api/tasks?participant_id=)
     - TaskCard.tsx — shows details + status badge + link to feedback panel
     - TaskCreateForm.tsx — mentor-only form: title, description, assign-to (participant dropdown), due_date
     - FeedbackForm.tsx — rating (1–5 stars) + comment
2. API client:
   - frontend/src/lib/api.ts — axios instance with baseURL from env `NEXT_PUBLIC_API_URL` and Auth header from AuthContext.
3. Pages:
   - /dashboard/tasks — participant view (TaskList)
   - /mentor/tasks — mentor view (TaskCreateForm + list of tasks they created)
4. Behavior:
   - After Task creation, POST to /api/tasks/ and revalidate SWR (or refresh axios fetch).
   - Feedback submits to /api/feedback/; on success, navigate back to task view.

---

STEP 4 — RESOURCE TRACKING (MANAGE MATERIALS & TOOLS)
Goal: allow mentors to assign physical/digital resources to participants and track status.

Backend:
1. Model (backend/core/models.py):

class Resource(models.Model):
RESOURCE_TYPES = [(“BOOK”,“Book”),(“TOOL”,“Tool”),(“MATERIAL”,“Material”),(“DIGITAL”,“Digital”)]
STATUS_CHOICES = [(“AVAILABLE”,“Available”),(“IN_USE”,“In Use”),(“RETURNED”,“Returned”)]
name = models.CharField(max_length=255)
description = models.TextField(blank=True)
type = models.CharField(max_length=20, choices=RESOURCE_TYPES)
assigned_to = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL)
status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=“AVAILABLE”)
created_at = models.DateTimeField(auto_now_add=True)

2. Serializers/ViewSets/URLs:
- POST /api/resources/ — add resource (mentor/admin only)
- PATCH /api/resources/{id}/assign/ — assign resource (body: participant_id)
- PATCH /api/resources/{id}/status/ — update status
- GET /api/resources/?participant_id= — returns participant resources

Frontend:
- Mentor UI to add resources and assign them via a dropdown (participant list).
- Participant dashboard to show `GET /api/resources?participant_id=me`.

---

STEP 5 — PROJECT UPLOAD & MARKETPLACE (MEDIA + LISTING)
Goal: let participants upload artworks/projects, list on a marketplace, and allow purchase flow.

Backend:
1. Project model (backend/core/models.py):

class Project(models.Model):
STATUS_CHOICES = [(“DRAFT”,“Draft”), (“PUBLISHED”,“Published”), (“SOLD”,“Sold”)]
title = models.CharField(max_length=255)
description = models.TextField(blank=True)
owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name=‘projects’, on_delete=models.CASCADE)
media_url = models.URLField(max_length=2000)  # Cloudinary/S3 URL
status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=“DRAFT”)
price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
buyer = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True, related_name=‘purchases’, on_delete=models.SET_NULL)
created_at = models.DateTimeField(auto_now_add=True)

2. Setup Cloudinary (server uploads) — install `cloudinary` + `django-cloudinary-storage` and configure `CLOUDINARY_URL` or explicit `CLOUDINARY_` env variables. Use Cloudinary for media management and CDN.  [oai_citation:5‡Cloudinary](https://cloudinary.com/documentation/django_integration?utm_source=chatgpt.com)
- Provide backend endpoint to accept file uploads and forward to Cloudinary from the server (or support presigned client-side uploads if desired).
3. Endpoints:
- POST /api/projects/ — create project (owner = request.user; accept multipart form for media file; store media_url)
- GET /api/projects/marketplace/ — list published projects (status=Published)
- GET /api/projects/{id}/ — project detail
4. Admin hooks:
- When creating a project, default status can be DRAFT; allow owner to `publish` via PATCH /api/projects/{id}/publish/

Frontend:
- UploadForm component supporting drag-and-drop media upload; show preview using Cloudinary returned URL.
- Marketplace page: lists `GET /api/projects/marketplace/`, shows thumbnails, title, price, owner, and "Buy" button.

---

STEP 6 — PAYMENT INTEGRATION (STRIPE CHECKOUT & WEBHOOKS)
Goal: charge buyers using Stripe Checkout; confirm purchases via webhooks.

Backend:
1. Install `stripe` Python package and set `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` in env.
2. Endpoint: POST /api/checkout/session/
- Accepts `{ project_id }`
- Load project, ensure status is `PUBLISHED` and not owned by buyer.
- Create Stripe Checkout Session with `line_items` using project.price and `metadata` including `project_id` and `seller_id`.
- Set `success_url`: `${FRONTEND_URL}/purchase/success?session_id={CHECKOUT_SESSION_ID}`
- Return `session.url` (or session.id) to frontend.
3. Webhook endpoint: POST /api/stripe/webhook/
- Validate signature using `STRIPE_WEBHOOK_SECRET`.
- On `checkout.session.completed` or `payment_intent.succeeded`, read metadata, mark Project as `SOLD`, attach buyer `user_id` (lookup by email or metadata), and create an Earnings record for seller.
- Use the Stripe CLI to test locally. See official webhook guidelines.  [oai_citation:6‡Stripe Docs](https://docs.stripe.com/webhooks?utm_source=chatgpt.com) [oai_citation:7‡GitHub](https://github.com/testdrivenio/django-stripe-checkout?utm_source=chatgpt.com)
4. Security:
- Protect webhook endpoint with signature verification.
- Do not trust client-side to mark the project as sold — do it in webhook handler.

Frontend:
- Install Stripe.js. On clicking Buy:
- Call POST /api/checkout/session/ with project_id.
- Receive session url → redirect (`window.location.href = session_url`) or use Stripe.redirectToCheckout with sessionId.
- After successful payment, Stripe redirects to your `/purchase/success` route; call backend to fetch status for project_id and show receipt.

---

STEP 7 — FINANCIAL DASHBOARD (EARNINGS, GOALS, VISUALS)
Goal: track seller earnings, provide dashboards and charts.

Backend:
1. Model: Earnings / FinancialAccount (backend/core/models.py)

class FinancialAccount(models.Model):
user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
total_earnings = models.DecimalField(max_digits=12, decimal_places=2, default=0)
savings_balance = models.DecimalField(max_digits=12, decimal_places=2, default=0)
milestones = models.JSONField(default=list)  # e.g., [{“name”:“Save 100”,“target”:100,“reached”:false}]
class EarningEvent(models.Model):
account = models.ForeignKey(FinancialAccount, related_name=“events”, on_delete=models.CASCADE)
amount = models.DecimalField(max_digits=10, decimal_places=2)
description = models.CharField(max_length=255, blank=True)
created_at = models.DateTimeField(auto_now_add=True)

2. Hook stripe webhook to create EarningEvent for seller and update FinancialAccount.total_earnings.

Endpoints:
- GET /api/dashboard/financial/{user_id}/ → aggregated stats: total_earnings, savings_balance, events (paginated).
- POST /api/dashboard/financial/{user_id}/savings/add/ — mock endpoint to transfer from earnings to savings (for MVP allow a simple add). Ensure permissions only for owner.

Frontend:
- Use Recharts or Chart.js via React components to display:
- Line chart: earnings timeline (from EarningEvent dates).
- Bar chart or progress rings: savings vs. milestone targets.
- Add sample actions: “Add to savings” which calls the above endpoint.

---

STEP 8 — PORTFOLIO GENERATION (STATIC PAGES & BLOG)
Goal: provide static portfolio pages per user using Next.js SSG where appropriate and support blog posts in Markdown.

Backend:
1. API:
- GET /api/portfolio/{user_id}/ — returns `profile` + list of published projects + blog posts metadata.
2. Blog posts:
- Create `blog/` folder in backend or store markdown posts in `/content/posts/{userId}/` optionally served as an API.
- Provide endpoint to fetch rendered markdown or raw markdown.

Frontend (Next.js):
1. Implement dynamic route: `pages/portfolio/[userId].tsx`
- Use `getStaticPaths` to fetch high-priority profiles to pre-render (or fallback:'blocking' to generate on-demand).
- `getStaticProps` calls backend API /api/portfolio/{userId}/ to retrieve data.
- Page layout: Hero with bio, skills chips, gallery of projects (Cloudinary images), and blog list (link to `/portfolio/[userId]/posts/[slug]`).
2. Static generation & deployment:
- Add script `yarn build:static` that runs `next build` + `next export` if using pure static export, or maintain `next start` for dynamic SSR on Vercel.
- Add instructions in `readme.md` to deploy to Vercel/Netlify; for SSG `next export` to Netlify works but if you rely on serverless functions prefer Vercel.

---

STEP 9 — COMMUNITY FEATURES (MESSAGING + PEER REVIEWS)
Goal: build simple messaging and peer review systems (start MVP without websockets).

Backend:
1. Models:

class Message(models.Model):
sender = models.ForeignKey(settings.AUTH_USER_MODEL, related_name=‘messages_sent’, on_delete=models.CASCADE)
receiver = models.ForeignKey(settings.AUTH_USER_MODEL, related_name=‘messages_received’, on_delete=models.CASCADE)
content = models.TextField()
timestamp = models.DateTimeField(auto_now_add=True)
read = models.BooleanField(default=False)

class PeerReview(models.Model):
reviewer = models.ForeignKey(settings.AUTH_USER_MODEL, related_name=‘reviews_given’, on_delete=models.CASCADE)
reviewee = models.ForeignKey(settings.AUTH_USER_MODEL, related_name=‘reviews_received’, on_delete=models.CASCADE)
rating = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
comment = models.TextField(blank=True)
created_at = models.DateTimeField(auto_now_add=True)

2. Endpoints:
- POST /api/messages/ — send message
- GET /api/messages/?user_id=me — list messages (inbox)
- POST /api/reviews/ — submit a PeerReview
- GET /api/reviews/?user_id=<reviewee> — list reviews for a user

Frontend:
- Chat UI (inbox style): `/messages` — show conversations (simple grouping by partner).
- Message compose modal to send messages (POST /api/messages).
- Profile shows average rating + list of peer reviews.

Optional (future): implement real-time via Django Channels / WebSockets (skip for MVP).

---

STEP 10 — GAMIFICATION (ACHIEVEMENTS AND LEADERBOARD)
Goal: reward activity; surface leaderboards.

Backend:
1. Models:

class Achievement(models.Model):
code = models.CharField(max_length=100, unique=True)  # e.g., ‘first_sale’
title = models.CharField(max_length=255)
description = models.TextField(blank=True)
icon = models.CharField(max_length=255, blank=True)  # icon reference
class UserAchievement(models.Model):
user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
achievement = models.ForeignKey(Achievement, on_delete=models.CASCADE)
earned_at = models.DateTimeField(auto_now_add=True)

2. Leaderboard endpoint:
- GET /api/leaderboard/?metric=completed_tasks|earnings|reviews — rank users with pagination

Frontend:
- Page `/gamification`:
- Leaderboard component (sortable by metric).
- Achievements grid showing earned/unearned badges (show earned_at timestamps).
- When events occur (task completed, sale), create UserAchievement record in backend pipeline.

---

STEP 11 — DEPLOYMENT & INFRASTRUCTURE (DOCKER + CI)
Goal: containerized dev + scripted CI for builds & deploys.

Docker / docker-compose (root):
1. Create `backend/Dockerfile`:
- Base `python:3.11-slim`
- Copy requirements, install, copy code, run `gunicorn art01_backend.wsgi:application --bind 0.0.0.0:8000`
- Expose 8000
- Include step to collectstatic (if using static files)
2. Create `frontend/Dockerfile`:
- Use Node 20 base, install dependencies, build, and run with `next start` for production or `next dev` for local dev.
3. docker-compose.yml:
- `services: backend, frontend, db(optional postgres for prod testing)`, volumes for code to enable hot reloading, environment variables in `.env`.
- Make `backend` depend_on db and `frontend` depend_on backend for orchestration.
4. Local dev commands in README:
- `docker-compose up --build` and one-off `docker-compose run backend python manage.py migrate`

CI/CD (GitHub Actions):
1. Create `.github/workflows/ci.yml`:
- Jobs:
  - `frontend`: node setup, run `yarn install`, `yarn lint`, `yarn test`, `yarn build`.
  - `backend`: python setup, `pip install -r requirements.txt`, run migrations & tests.
- On push to main: run jobs and if success, deploy:
  - Deploy frontend to Vercel (or Netlify) or use Vercel/GitHub integration.
  - Deploy backend to Render/Fly/Railway: push Docker image to container registry then trigger deployment.
2. Document manual deploy steps and required secrets (`VERCEL_TOKEN`, `STRIPE_SECRET_KEY`, `CLOUDINARY_URL`, `PROD_DB_URL`) in repo settings.

References:
- Follow Next.js + Tailwind setup guides for exact config and `globals.css` wiring.  [oai_citation:8‡Tailwind CSS](https://tailwindcss.com/docs/guides/nextjs?utm_source=chatgpt.com)
- Use best practices for custom Django user model (define before first migrate).  [oai_citation:9‡TestDriven.io](https://testdriven.io/blog/django-custom-user-model/?utm_source=chatgpt.com)
- Use dj-rest-auth + django-allauth to speed up registration/login endpoints. Configure `SITE_ID` and registration endpoints per docs.  [oai_citation:10‡dj-rest-auth.readthedocs.io](https://dj-rest-auth.readthedocs.io/en/latest/installation.html?utm_source=chatgpt.com)
- Wire Stripe Checkout + webhook handling following Stripe's webhook security guidance and use the Stripe CLI while developing locally.  [oai_citation:11‡Stripe Docs](https://docs.stripe.com/webhooks?utm_source=chatgpt.com)
- For media, use Cloudinary's Django integration (or `django-storages` for S3) and keep `CLOUDINARY_URL` in env.  [oai_citation:12‡Cloudinary](https://cloudinary.com/documentation/django_integration?utm_source=chatgpt.com)

---

STEP 12 — SEED DATA & CONTRIBUTION SETUP (SCRIPTS + DOCS)
Goal: provide seeders and contribution rules for open-source contributors.

Backend:
- Create management command `python manage.py seed_data` (backend/core/management/commands/seed_data.py) to:
- Create 2 mentors, 5 participants (with predictable passwords for dev).
- Create sample tasks, feedback, resources, and 3 sample projects with Cloudinary demo URLs.
- Create FinancialAccount rows with a few EarningEvents.
- Add `fixtures/` JSON or YAML to repo to permit `loaddata` flows.

Repo Level:
- Add `CONTRIBUTING.md`:
- Branch naming, PR template, code style (Black + isort + flake8 for backend; ESLint + Prettier for frontend).
- How to run seed script, dev env instructions, testing guidelines.
- Add `.github/ISSUE_TEMPLATE/bug_report.md` and `feature_request.md`, and `.github/PULL_REQUEST_TEMPLATE.md`.
- Add LICENSE (MIT) and `CODE_OF_CONDUCT.md`.
- Update `README.md` with quick start, local dev commands, `prompts.md` reference, and architecture diagram link.

---

STEP 13 — ER DIAGRAM & DOCUMENTATION
Goal: produce developer-friendly docs and diagrams.

Docs:
- Create `docs/er-diagram.md` — use Mermaid syntax:

erDiagram
    USER ||--o{ TASK : assigns
    TASK ||--o{ FEEDBACK : has
    USER ||--o{ PROJECT : owns
    PROJECT }o--|| USER : buyer
    USER ||--o{ RESOURCE : assigned
    USER ||--o{ EARNINGEVENT : has
    ```

	•	Create docs/api-endpoints.md — document each endpoint, method, request body schema, response schema, auth requirements, and example CURL.
	•	Create docs/deployment.md — describe how to deploy to Vercel/Render/Netlify, and how to configure environment variables and secrets.
	•	Update readme.md with links to docs/ and include product vision and contributor quickstart.

⸻

FINAL NOTES FOR CLINe (operational checklist):
	•	Always reference prompts.md and readme.md before executing a step; quote the relevant lines you used to decide a particular schema or endpoint.
	•	Commit changes incrementally with descriptive commit messages like feat(core): add Task and Feedback models + serializers.
	•	Add tests alongside features (at least basic request tests for each new endpoint).
	•	Produce small PRs if implementing in iterative runs; label PRs with backend/frontend and feature/*.
	•	If you need to choose between two similar libraries (e.g., Cloudinary vs S3), prefer Cloudinary for media first (easier dev UX) and leave S3 as documented migration steps.
	•	Create prompts.md at repo root if not present and paste the original short prompts & the earlier Step 1–2 content there for traceability.

END.

---
