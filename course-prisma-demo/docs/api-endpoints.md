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
* **Postman Setup:**
  * **Method:** `GET`
  * **URL:** `http://localhost:9000/api/v1/users`
  * Click **Send** to view the response.

### 2. Get User Details
Deep join across 4+ tables: User → Profile + Courses (→ Lessons, Categories) + Enrollments (→ Course → Author).
* **Method:** `GET`
* **Endpoint:** `/users/:id`
* **Prisma Concept:** Deep `include` nesting
* **Postman Setup:**
  * **Method:** `GET`
  * **URL:** `http://localhost:9000/api/v1/users/1`
  * Click **Send** to view the response.

### 3. Create a New User
Creates user + profile simultaneously (nested write).
* **Method:** `POST`
* **Endpoint:** `/users`
* **Prisma Concept:** Nested create (1-to-1)
* **Postman Setup:**
  * **Method:** `POST`
  * **URL:** `http://localhost:9000/api/v1/users`
  * **Body:** Select `raw` and `JSON` from the dropdown.
  * **Payload:**
    ```json
    {
      "email": "diana@coursehub.com",
      "name": "Diana Prince",
      "bio": "Tech educator",
      "phone": "+1-555-0404"
    }
    ```

### 4. Update User (Upsert Profile)
Updates user info + upserts profile (create if missing, update if exists).
* **Method:** `PATCH`
* **Endpoint:** `/users/:id`
* **Prisma Concept:** Nested upsert
* **Postman Setup:**
  * **Method:** `PATCH`
  * **URL:** `http://localhost:9000/api/v1/users/1`
  * **Body:** Select `raw` and `JSON` from the dropdown.
  * **Payload:**
    ```json
    {
      "name": "Alice W.",
      "bio": "Updated bio"
    }
    ```

### 5. Delete User (Cascade)
Deletes user AND cascades to Profile, Courses, Lessons, Enrollments.
* **Method:** `DELETE`
* **Endpoint:** `/users/:id`
* **Prisma Concept:** `onDelete: Cascade` across 5 tables
* **Postman Setup:**
  * **Method:** `DELETE`
  * **URL:** `http://localhost:9000/api/v1/users/1`
  * Click **Send** to view the response.

---

## 📚 Courses API (`/courses`)

Manage courses with author, lessons, categories, and enrollment counts.

### 1. Get All Courses
Returns courses with author info, lessons, categories, and enrollment count.
* **Method:** `GET`
* **Endpoint:** `/courses`
* **Prisma Concept:** Multi-table JOIN (4 tables)
* **Postman Setup:**
  * **Method:** `GET`
  * **URL:** `http://localhost:9000/api/v1/courses`
  * Click **Send** to view the response.

### 2. Get Course Details
Full detail with enrolled students.
* **Method:** `GET`
* **Endpoint:** `/courses/:id`
* **Postman Setup:**
  * **Method:** `GET`
  * **URL:** `http://localhost:9000/api/v1/courses/1`
  * Click **Send** to view the response.

### 3. Create a Course
Creates course with nested lessons and connected categories.
* **Method:** `POST`
* **Endpoint:** `/courses`
* **Prisma Concept:** Nested `createMany` + `connect`
* **Postman Setup:**
  * **Method:** `POST`
  * **URL:** `http://localhost:9000/api/v1/courses`
  * **Body:** Select `raw` and `JSON` from the dropdown.
  * **Payload:**
    ```json
    {
      "title": "GraphQL Fundamentals",
      "description": "Learn GraphQL from scratch.",
      "published": true,
      "authorId": 1,
      "lessons": [
        { "title": "What is GraphQL?", "content": "An introduction.", "order": 1 },
        { "title": "Queries & Mutations", "content": "Core concepts.", "order": 2 }
      ]
    }
    ```

### 4. Update Course
Updates course fields.
* **Method:** `PATCH`
* **Endpoint:** `/courses/:id`
* **Postman Setup:**
  * **Method:** `PATCH`
  * **URL:** `http://localhost:9000/api/v1/courses/1`
  * **Body:** Select `raw` and `JSON` from the dropdown.
  * **Payload:**
    ```json
    {
      "title": "NestJS Masterclass v2"
    }
    ```

### 5. Delete Course (Cascade)
Deletes course → cascades to Lessons + Enrollments.
* **Method:** `DELETE`
* **Endpoint:** `/courses/:id`
* **Prisma Concept:** Cascade (1-to-many)
* **Postman Setup:**
  * **Method:** `DELETE`
  * **URL:** `http://localhost:9000/api/v1/courses/1`
  * Click **Send** to view the response.



---

## 🎓 Enrollments API (`/enrollments`)

Manage enrollments (explicit many-to-many join table with extra fields).

### 1. Get All Enrollments
Returns enrollments with user and course info.
* **Method:** `GET`
* **Endpoint:** `/enrollments`
* **Prisma Concept:** Explicit M2M join table query
* **Postman Setup:**
  * **Method:** `GET`
  * **URL:** `http://localhost:9000/api/v1/enrollments`
  * Click **Send** to view the response.

### 2. Get Enrollment Details
Returns enrollment with user profile and course lessons.
* **Method:** `GET`
* **Endpoint:** `/enrollments/:id`
* **Postman Setup:**
  * **Method:** `GET`
  * **URL:** `http://localhost:9000/api/v1/enrollments/1`
  * Click **Send** to view the response.

### 3. Enroll User in Course
Creates a new enrollment (explicit M2M record).
* **Method:** `POST`
* **Endpoint:** `/enrollments`
* **Prisma Concept:** Explicit M2M `create` with `connect`
* **Postman Setup:**
  * **Method:** `POST`
  * **URL:** `http://localhost:9000/api/v1/enrollments`
  * **Body:** Select `raw` and `JSON` from the dropdown.
  * **Payload:**
    ```json
    {
      "userId": 3,
      "courseId": 4
    }
    ```

### 4. Update Enrollment Progress
Updates progress. Auto-sets `completedAt` when progress reaches 100.
* **Method:** `PATCH`
* **Endpoint:** `/enrollments/:id`
* **Prisma Concept:** Update join table extra fields
* **Postman Setup:**
  * **Method:** `PATCH`
  * **URL:** `http://localhost:9000/api/v1/enrollments/1`
  * **Body:** Select `raw` and `JSON` from the dropdown.
  * **Payload:**
    ```json
    {
      "progress": 100
    }
    ```

### 5. Unenroll (Delete Enrollment)
Removes the enrollment record without affecting user or course.
* **Method:** `DELETE`
* **Endpoint:** `/enrollments/:id`
* **Prisma Concept:** Explicit M2M delete
* **Postman Setup:**
  * **Method:** `DELETE`
  * **URL:** `http://localhost:9000/api/v1/enrollments/1`
  * Click **Send** to view the response.
