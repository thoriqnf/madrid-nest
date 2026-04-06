# 🌍 CourseHub API Endpoints

This document outlines all the available REST API endpoints for the CourseHub application.

**Base URL:** `http://localhost:9000/api/v1`

---

## 👥 Users API

Manage users and their nested profile data.

### 1. Get All Users
Returns a list of all users along with their 1-to-1 profile data.
* **Method:** `GET`
* **Endpoint:** `/users`
* **Example:**
  ```bash
  curl -s http://localhost:9000/api/v1/users
  ```

### 2. Get User Details
Fetches a specific user with nested profile.
* **Method:** `GET`
* **Endpoint:** `/users/:id`
* **Example:**
  ```bash
  curl -s http://localhost:9000/api/v1/users/1
  ```

### 3. Create a New User
Creates a user and their linked profile in a single database transaction (Nested Write).
* **Method:** `POST`
* **Endpoint:** `/users`
* **Payload:**
  ```json
  {
    "email": "bruce@web.com",
    "name": "Bruce Tech",
    "bio": "Tech reviewer",
    "phone": "+9876543210"
  }
  ```
* **Example:**
  ```bash
  curl -X POST http://localhost:9000/api/v1/users \
       -H "Content-Type: application/json" \
       -d '{"email":"bruce@web.com", "name":"Bruce Tech", "bio":"Tech reviewer", "phone":"+9876543210"}'
  ```

### 4. Update a User (Upsert Profile)
Updates user basic info and upserts their profile.
* **Method:** `PATCH`
* **Endpoint:** `/users/:id`
* **Payload:**
  ```json
  {
    "name": "Bruce Wayne",
    "bio": "I am Batman"
  }
  ```
* **Example:**
  ```bash
  curl -X PATCH http://localhost:9000/api/v1/users/1 \
       -H "Content-Type: application/json" \
       -d '{"name":"Bruce Wayne", "bio":"I am Batman"}'
  ```

### 5. Delete User
Deletes a user. The related profile is also deleted automatically due to `onDelete: Cascade`.
* **Method:** `DELETE`
* **Endpoint:** `/users/:id`
* **Example:**
  ```bash
  curl -X DELETE http://localhost:9000/api/v1/users/1
  ```
