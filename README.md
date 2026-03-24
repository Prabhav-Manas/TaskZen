# TaskZen - Project Management Application
TaskZen is a full-stack project management application that helps users create projects, manage tasks, and collaborate with team members.

## Features
### Authorization, Authentication and Security
- User sign up with email verification
- Secure sign in with JWT (Access + Refresh Tokens)
- HTTP-only cookie-based authentication
- Refresh token rotation
- Account locked after multiple failed attempts
- Forgot password and Reset Password with verify OTP to registerd email
- Implemented Black-list token
- HTTP-INTERCEPTOR for token handling
- Route Guard to develop proper navigation

### Project Management
- Create and manage projects
- Assign multiple members to a project
- Track project status (Active / Completed)

### User Management
- Fetch and assign members to project
- Muti-select dropdown for members selection

### UI/UX
- Reusable components (form inputs, buttons, header, cards, multi-select, modal)
- Module-based project architecture (both frontend and backend)
- Clean and responsive dashboard

## Tech Stack
### Frontend
- Angular
- TypeScript
- Bootstrap

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose

## Architecture Highlights
- Modular Angular architecture (core, features, shared)
- Reusable UI components
- Centralized API service
- Module Backend architecture (repository-service-controller pattern)

## Authentication Flow
1) User sign in → receives Access Token + Refresh Token (cookie)
2) Access Token used for API Request
3) On Expiry (Access Token) → interceptor calls Refresh Token API
4) Backend validates refresh token and issue new access token