![Angular](https://img.shields.io/badge/Frontend-Angular-red)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)

# 🚀 TaskZen: Plan | Trace | Achieve - Project Management Application
TaskZen is a full-stack project management application that enables users to create projects, manage tasks, and collaborate with team members efficiently.

## ✨ Features
### 🔐 Authentication and Security
- User sign up with email verification
- Secure sign in with JWT (Access + Refresh Tokens)
- HTTP-only cookie-based authentication
- Refresh token rotation mechanism
- Account locked after multiple failed sign in attempts
- Forgot & Reset password with OTP verification via registered email
- Token blacklisting for secure signout
- Angular HTTP Interceptor for token handling
- Route Guards for protected navigation

### 📁 Project Management
- Create and manage projects
- Assign multiple members to a project
- Track project status (Active / Completed)

### 👥 User Management
- Fetch and assign members to project
- Multi-select dropdown for member selection

### 🧾 UI/UX
- Reusable components (form inputs, buttons, header, cards, multi-select, modal)
- Module-based project architecture (both frontend and backend)
- Clean and responsive dashboard

## 🛠️ Tech Stack
### Frontend
- Angular
- TypeScript
- Bootstrap

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose

## 🧩 Architecture Highlights
- Modular Angular architecture (core, features, shared)
- Reusable UI components
- Centralized API service
- Module Backend architecture (repository-service-controller pattern)

## 🔐 Authentication Flow
1) User sign in → receives Access Token + Refresh Token (cookie)
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
- Delete projects (for Owner only)
- Notification system
- Manage tasks
- Docker + CI/CD

## 📌 Status
→ Currently **in Development** (actively improving and adding features)

## 👤 Author
Developed by **Prabhav Manas** Full-Stack Developer (MEAN)

## Contact Info
#### Email: prabhavmanas17@gmail.com