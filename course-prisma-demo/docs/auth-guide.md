# 🔐 CourseHub Authentication & Authorization Guide

This guide explains how to use and test the JWT-based authentication and role-based authorization in CourseHub.

## 🚀 Quick Start with Magic CLI

The auth module was scaffolded using the NestJS CLI:
```bash
npx nest generate module auth
npx nest generate controller auth
npx nest generate service auth
```

---

## 🔑 Auth API Endpoints (`/auth`)

**Base URL:** `http://localhost:9000/api/v1`

### 1. Register User
* **POST `/auth/register`**
* **Payload:**
  ```json
  {
    "email": "newuser@example.com",
    "name": "New User",
    "password": "password123"
  }
  ```
* **Returns:** `{ "access_token": "eyJhbG..." }`

### 2. Login
* **POST `/auth/login`**
* **Payload:**
  ```json
  {
    "email": "alice@coursehub.com",
    "password": "password123"
  }
  ```
* **Returns:** `{ "access_token": "eyJhbG..." }`

### 3. Get Profile
* **GET `/auth/profile`**
* **Security:** 🔓 Requires `Authorization: Bearer <JWT_TOKEN>`
* **Returns:** Decoed JWT payload (id, email, role)

---

## 🔒 Security Implementation

CourseHub uses a **Secure by Default** approach using Global Guards.

### 1. Global JWT Guard
Applied in `app.module.ts`, it protects **ALL** endpoints by default. You must provide a valid Bearer token for every request unless explicitly marked public.

### 2. Public Access (`@Public()`)
Used to allow anyone to access an endpoint (e.g., viewing the courses list).
```typescript
@Public()
@Get()
findAll() { ... }
```

### 3. Role-Based Access (`@Roles()`)
Used to restrict access to specific roles (e.g., only ADMIN can delete users).
```typescript
@Roles('ADMIN')
@Delete(':id')
remove() { ... }
```

---

## 🛡️ Endpoint Protection Map

| Module | Endpoint | Method | Access | Security |
| :--- | :--- | :--- | :--- | :--- |
| **Auth** | `/auth/register` | POST | Public | `@Public()` |
| | `/auth/login` | POST | Public | `@Public()` |
| | `/auth/profile` | GET | Protected | JWT Required |
| **Users** | `/users` | GET | Public | `@Public()` |
| | `/users/:id` | DELETE | Admin | `@Roles('ADMIN')` |
| **Courses** | `/courses` | GET | Public | `@Public()` |
| | `/courses` | POST | Protected | JWT Required |
| **Enrollments** | `/enrollments` | GET | Public | `@Public()` |

---

## 🧪 Testing with Postman

1. **Step 1:** Call `POST /auth/register` or `login` to get a token.
2. **Step 2:** Copy the `access_token` value.
3. **Step 3:** In your next request (e.g., `GET /auth/profile`), go to **Auth** tab.
4. **Step 4:** Select **Bearer Token** and paste your token.
5. **Step 5:** Send the request!

> [!TIP]
> Use the default seeded admin:  
> **Email:** `alice@coursehub.com`  
> **Password:** `password123`
