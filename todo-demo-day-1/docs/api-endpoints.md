# 🌍 Todo App API Endpoints

**Base URL:** `http://localhost:8000`

> [!IMPORTANT]
> **Authentication Note:** Most endpoints require a Bearer Token in the `Authorization` header.
> Use the `access_token` returned from `/auth/signup` or `/auth/signin`.

---

## 🔐 Auth API (`/auth`)

* **POST `/auth/signup`**: Create a new user account.
  * **Payload (JSON):** 
    ```json
    {
      "email": "user@example.com",
      "password": "password123",
      "name": "John Doe"
    }
    ```
* **POST `/auth/signin`**: Log in to an existing account.
  * **Payload (JSON):** 
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```
* **POST `/auth/logout`**: Log out (requires Access Token).
* **POST `/auth/refresh`**: Refresh access token (requires Refresh Token in Authorization header).

---

## 📝 Todos API (`/todos`)

* **GET `/todos`**: Fetch all todos for the authenticated user.
* **GET `/todos/<ID>`**: Fetch a specific todo by ID.
* **POST `/todos`**: Create a new todo.
  * **Payload (JSON):** 
    ```json
    {
      "title": "Buy groceries",
      "description": "Milk, eggs, and bread"
    }
    ```
* **PATCH `/todos/<ID>`**: Update a todo (title, description, or status).
  * **Payload (JSON):** 
    ```json
    {
      "completed": true
    }
    ```
* **DELETE `/todos/<ID>`**: Permanently delete a todo.
