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

### Project Management
- Create and manage projects
- Assign multiple members to a project
- Track project status (Active / Completed)

### User Management
- Fetch and assign members to project
- Muti-select dropdown for members selection