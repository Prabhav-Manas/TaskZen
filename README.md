![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)

# 🚀 TaskZen: Plan | Trace | Achieve - Project Management Application
TaskZen is a modern full-stack Project Management application built with the **MEAN** stack. It enables teams to securely manage projects, collaborate with members, and streamline workflows through a scalable architecture, robust authentication system, and production-ready development practices.

## ✨ Features
### 🔐 Authentication and Security
- User sign up with email verification
- Secure sign in with JWT (Access + Refresh Tokens)
- HTTP-only cookie-based refresh token
- Refresh token rotation mechanism
- Account locked after multiple failed sign in attempts
- Rate limiting on authentication endpoints to prevent brute-force attacks
- Forgot & Reset password with OTP verification via registered email
- Token blacklisting for secure signout
- Angular HTTP Interceptor for token auto-refresh
- Route Guards for protected navigation

### 📁 Project Management
- Create Project
- Edit Project
- Delete Project
- View Project Details
- Assign multiple members to project
- Add project members
- Track project status (Active / Completed)
- Real-time UI refresh after CRUD operations

### 👥 User Management
- Fetch all users
- Assign members to project
- Multi-select dropdown for team collaboration
- Avatar initials for users

### 🧾 UI/UX
- Responsive dashboard layout
- Project details page
- Team member cards
- Loader & popup notifications
- Reusable components

#### Reusable Components
- Header
- Card
- Button
- Modal
- Multi-Select Dropdown
- Loader
- Popup Alert

## 🛠️ Tech Stack
### Frontend
- Angular
- TypeScript
- RxJS
- Bootstrap
- HTML5
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Containerization & CI/CD
- Docker
- Docker Compose
- GitHub Actions

## 🧩 Architecture Highlights
### Frontend Architecture
- Modular Angular Architecture
- Core / Features / Shared modules
- HTTP Interceptor
- Route Guards
- Centralized API Service

### Backend Architecture
- Module-based architecture
- Controller → Service → Repository pattern
- JWT Authentication
- Middleware-based error handling

## 🔐 Authentication Flow
1) User sign in → receives Access Token + Refresh Token (HTTP-only cookie)
2) Access Token used for API Request
3) On Expiry (Access Token) → interceptor calls Refresh Token API
4) Backend validates refresh token and issues a new access token

# 🐳 Docker Support
TaskZen is fully containerized for local development, production, and CI pipelines.

## Docker Files
### Frontend
 - Dockerfile
 - Dockerfile.dev
### Backend
 - Dockerfile
 - Dockerfile.dev
### Docker Compose
 - docker-compose.dev.yml
 - docker-compose.prod.yml
 - docker-compose.ci.yml

⚙️ CI/CD
GitHub Actions automates the project's build workflow.

### Current pipeline includes:
 - Install Dependencies
 - Frontend Build
 - Backend Build
 - Docker Image Build
 - Container Validation
 - Continuous Integration Checks

## 📦 Installations
### Clone Repository
```bash
git clone https://github.com/Prabhav-Manas/TaskZen.git
cd TaskZen
```

### Set up Backend
```bash
cd backend
npm install
npm run dev
```

### Set up Frontend
```bash
cd frontend
npm install
ng serve
```

## 🚀 Run with Docker
### Development
```bash
docker compose -f docker-compose.dev.yml up --build
```

### Production
```bash
docker compose -f docker-compose.prod.yml up --build
```

### CI Environment
```bash
docker compose -f docker-compose.ci.yml up --build
```

## 🚀 Upcoming Features
- Task Management
- Auto Logout on session expiry
- Activity logs
- Notifications
- File attachments
- Search & filter projects

## 📌 Status
✅ Authentication System
✅ Project CRUD
✅ Member Management
🚧 Task Management (In Progress)

→ Actively Improving & Scaling TaskZen for better performance and user experience.

## 👤 Author
Developed by **Prabhav Manas** Full-Stack Developer (MEAN)

## Contact Info
#### Email: prabhavmanas17@gmail.com