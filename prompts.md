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

