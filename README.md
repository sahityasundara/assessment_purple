# Mini User Management System

A full-stack **User Management System** built as part of the **Backend Developer Intern Assessment** for **Purple Merit Technologies**.

The application supports **JWT authentication, role-based access control (RBAC), admin user management, and secure API access**, with full cloud deployment.

---
To login as admin, use admin@gmail.com , password: admin123
## 🚀 Project Overview

This application allows users to:
- Sign up and log in securely
- View and update their profile
- Change their password
- Access protected routes using JWT authentication

Admins can:
- View all users with pagination
- Activate or deactivate user accounts
- Access admin-only dashboards and actions

This project demonstrates:
- Secure authentication flows
- Role-based authorization
- RESTful API design
- Clean backend architecture
- Cloud deployment best practices

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (JSON Web Tokens)
- bcryptjs

### Frontend
- React (Vite)
- React Router DOM
- Axios
- Custom CSS

### Deployment
- **Backend**: Render
- **Frontend**: Netlify
- **Database**: MongoDB Atlas (Cloud)

---

## 🌐 Live Deployment Links

- **Frontend (Netlify)**  
  https://zingy-mousse-bfab8c.netlify.app/signup

- **Backend (Render)**  
  https://assessment-purple.onrender.com

---

## 🔐 Authentication & Authorization

- JWT-based authentication
- Protected routes for authenticated users
- Role-based access control:
  - `user`
  - `admin`

---

## 👤 Admin Access

Admin access is **securely managed from the backend/database**.

### How to access Admin Dashboard:
1. Sign up or log in as a user
2. Open **MongoDB Atlas**
3. Navigate to:
   userdb → users

4. Update the user document:
```json
  "role": "admin"

```
Log out and log in again

Once logged in as admin, the Admin Dashboard becomes accessible.

📋 Features Implemented
Authentication

User signup with validation

User login with JWT token

Secure password hashing

Logout functionality

User Features

View profile

Update name and email

Change password

Admin Features

View all users (with pagination)

Activate / deactivate users

Admin-only protected routes

Security

Password hashing with bcrypt

JWT token validation

Role-based route protection

Environment variables for secrets

CORS configuration

🗄️ Database Schema (User)
{
  "fullName": "String",
  "email": "String (unique)",
  "password": "Hashed String",
  "role": "user | admin",
  "status": "active | inactive",
  "lastLogin": "Date",
  "createdAt": "Date",
  "updatedAt": "Date"
}

⚙️ Environment Variables

Create a .env file in the backend directory:

PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret


.env is excluded from version control using .gitignore.

▶️ Running Locally
Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm run dev

🧪 Testing

Backend unit tests implemented using Jest

Authentication and RBAC logic covered

Run tests:

cd backend
npm test
