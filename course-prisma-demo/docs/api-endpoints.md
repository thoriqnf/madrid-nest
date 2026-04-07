# 🌍 CourseHub API Endpoints

All available REST API endpoints for the CourseHub application.

**Base URL:** `http://localhost:9000/api/v1`

---

## 👥 Users API (`/users`)

Manage users with nested profile, courses, and enrollments.

### 1. Get All Users
Returns all users with profile, authored courses, and enrollments.
* **Method:** `GET`
* **Endpoint:** `/users`
* **Prisma Concept:** Multi-table JOIN (User → Profile + Courses + Enrollments)
* **Example:**
  ```bash
  curl -s http://localhost:9000/api/v1/users | jq
  ```

### 2. Get User Details
Deep join across 4+ tables: User → Profile + Courses (→ Lessons, Categories) + Enrollments (→ Course → Author).
* **Method:** `GET`
* **Endpoint:** `/users/:id`
* **Prisma Concept:** Deep `include` nesting
* **Example:**
  ```bash
  curl -s http://localhost:9000/api/v1/users/1 | jq
  ```

### 3. Create a New User
Creates user + profile simultaneously (nested write).
* **Method:** `POST`
* **Endpoint:** `/users`
* **Prisma Concept:** Nested create (1-to-1)
* **Payload:**
  ```json
  {
    "email": "diana@coursehub.com",
    "name": "Diana Prince",
    "bio": "Tech educator",
    "phone": "+1-555-0404"
  }
  ```
* **Example:**
  ```bash
  curl -X POST http://localhost:9000/api/v1/users \
       -H "Content-Type: application/json" \
       -d '{"email":"diana@coursehub.com","name":"Diana Prince","bio":"Tech educator","phone":"+1-555-0404"}'
  ```

### 4. Update User (Upsert Profile)
Updates user info + upserts profile (create if missing, update if exists).
* **Method:** `PATCH`
* **Endpoint:** `/users/:id`
* **Prisma Concept:** Nested upsert
* **Example:**
  ```bash
  curl -X PATCH http://localhost:9000/api/v1/users/1 \
       -H "Content-Type: application/json" \
       -d '{"name":"Alice W.","bio":"Updated bio"}'
  ```

### 5. Delete User (Cascade)
Deletes user AND cascades to Profile, Courses, Lessons, Enrollments.
* **Method:** `DELETE`
* **Endpoint:** `/users/:id`
* **Prisma Concept:** `onDelete: Cascade` across 5 tables
* **Example:**
  ```bash
  curl -X DELETE http://localhost:9000/api/v1/users/1
  ```

---

## 📚 Courses API (`/courses`)

Manage courses with author, lessons, categories, and enrollment counts.

### 1. Get All Courses
Returns courses with author info, lessons, categories, and enrollment count.
* **Method:** `GET`
* **Endpoint:** `/courses`
* **Prisma Concept:** Multi-table JOIN (4 tables)
* **Example:**
  ```bash
  curl -s http://localhost:9000/api/v1/courses | jq
  ```

### 2. Get Course Details
Full detail with enrolled students.
* **Method:** `GET`
* **Endpoint:** `/courses/:id`
* **Example:**
  ```bash
  curl -s http://localhost:9000/api/v1/courses/1 | jq
  ```

### 3. Create a Course
Creates course with nested lessons and connected categories.
* **Method:** `POST`
* **Endpoint:** `/courses`
* **Prisma Concept:** Nested `createMany` + `connect`
* **Payload:**
  ```json
  {
    "title": "GraphQL Fundamentals",
    "description": "Learn GraphQL from scratch.",
    "published": true,
    "authorId": 1,
    "categoryIds": [1],
    "lessons": [
      { "title": "What is GraphQL?", "content": "An introduction.", "order": 1 },
      { "title": "Queries & Mutations", "content": "Core concepts.", "order": 2 }
    ]
  }
  ```
* **Example:**
  ```bash
  curl -X POST http://localhost:9000/api/v1/courses \
       -H "Content-Type: application/json" \
       -d '{"title":"GraphQL Fundamentals","description":"Learn GraphQL from scratch.","published":true,"authorId":1,"categoryIds":[1],"lessons":[{"title":"What is GraphQL?","content":"An introduction.","order":1},{"title":"Queries & Mutations","content":"Core concepts.","order":2}]}'
  ```

### 4. Update Course (Replace Categories)
Updates course fields. Uses `set` to replace all linked categories.
* **Method:** `PATCH`
* **Endpoint:** `/courses/:id`
* **Prisma Concept:** M2M `set` (replace all)
* **Example:**
  ```bash
  curl -X PATCH http://localhost:9000/api/v1/courses/1 \
       -H "Content-Type: application/json" \
       -d '{"title":"NestJS Masterclass v2","categoryIds":[1,3]}'
  ```

### 5. Delete Course (Cascade)
Deletes course → cascades to Lessons + Enrollments. Categories are just unlinked.
* **Method:** `DELETE`
* **Endpoint:** `/courses/:id`
* **Prisma Concept:** Cascade (1-to-many) + M2M unlinking
* **Example:**
  ```bash
  curl -X DELETE http://localhost:9000/api/v1/courses/1
  ```

---

## 📁 Categories API (`/categories`)

Manage categories (implicit many-to-many with courses).

### 1. Get All Categories
Returns categories with course count.
* **Method:** `GET`
* **Endpoint:** `/categories`
* **Prisma Concept:** `_count` on implicit M2M
* **Example:**
  ```bash
  curl -s http://localhost:9000/api/v1/categories | jq
  ```

### 2. Get Category Details
Returns category with all linked courses and their authors.
* **Method:** `GET`
* **Endpoint:** `/categories/:id`
* **Prisma Concept:** Reverse M2M `include`
* **Example:**
  ```bash
  curl -s http://localhost:9000/api/v1/categories/1 | jq
  ```

### 3. Create Category
* **Method:** `POST`
* **Endpoint:** `/categories`
* **Example:**
  ```bash
  curl -X POST http://localhost:9000/api/v1/categories \
       -H "Content-Type: application/json" \
       -d '{"name":"Mobile Development","slug":"mobile-development"}'
  ```

### 4. Delete Category
Deletes category and unlinks from all courses (courses are NOT deleted).
* **Method:** `DELETE`
* **Endpoint:** `/categories/:id`
* **Prisma Concept:** Implicit M2M unlink (no cascade)
* **Example:**
  ```bash
  curl -X DELETE http://localhost:9000/api/v1/categories/1
  ```

---

## 🎓 Enrollments API (`/enrollments`)

Manage enrollments (explicit many-to-many join table with extra fields).

### 1. Get All Enrollments
Returns enrollments with user and course info.
* **Method:** `GET`
* **Endpoint:** `/enrollments`
* **Prisma Concept:** Explicit M2M join table query
* **Example:**
  ```bash
  curl -s http://localhost:9000/api/v1/enrollments | jq
  ```

### 2. Get Enrollment Details
Returns enrollment with user profile and course lessons/categories.
* **Method:** `GET`
* **Endpoint:** `/enrollments/:id`
* **Example:**
  ```bash
  curl -s http://localhost:9000/api/v1/enrollments/1 | jq
  ```

### 3. Enroll User in Course
Creates a new enrollment (explicit M2M record).
* **Method:** `POST`
* **Endpoint:** `/enrollments`
* **Prisma Concept:** Explicit M2M `create` with `connect`
* **Example:**
  ```bash
  curl -X POST http://localhost:9000/api/v1/enrollments \
       -H "Content-Type: application/json" \
       -d '{"userId":3,"courseId":4}'
  ```

### 4. Update Enrollment Progress
Updates progress. Auto-sets `completedAt` when progress reaches 100.
* **Method:** `PATCH`
* **Endpoint:** `/enrollments/:id`
* **Prisma Concept:** Update join table extra fields
* **Example:**
  ```bash
  curl -X PATCH http://localhost:9000/api/v1/enrollments/1 \
       -H "Content-Type: application/json" \
       -d '{"progress":100}'
  ```

### 5. Unenroll (Delete Enrollment)
Removes the enrollment record without affecting user or course.
* **Method:** `DELETE`
* **Endpoint:** `/enrollments/:id`
* **Prisma Concept:** Explicit M2M delete
* **Example:**
  ```bash
  curl -X DELETE http://localhost:9000/api/v1/enrollments/1
  ```
