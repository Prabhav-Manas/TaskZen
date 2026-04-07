![Angular](https://img.shields.io/badge/Frontend-Angular-red)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)

# 🚀 TaskZen: Plan | Trace | Achieve - Project Management Application
TaskZen is a full-stack project management application that enables users to create projects, manage tasks, and collaborate with team members efficiently.

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
- Real-time project refresh after CRUD operations

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
- Bootstrap
- RxJs

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

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

## 🚀 Upcoming Features
- Task CRUD
- Auto Logout on session expiry
- Activity logs
- Notifications
- File attachments
- Search & filter projects
- Docker deployment
- CI/CD pipeline

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