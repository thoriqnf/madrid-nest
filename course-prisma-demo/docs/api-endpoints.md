# 🌍 CourseHub API Endpoints

**Base URL:** `http://localhost:9000/api/v1`

> [!IMPORTANT]
> **Dynamic IDs Note:** Auto-increment IDs change after database resets. Always run `GET` requests first to find valid IDs (replace `<ID>`, `<USER_ID>`, and `<COURSE_ID>` in payloads below with actual integers from your DB).

---

## 👥 Users API (`/users`)
* **GET `/users`**: Fetch all users with profile, authored courses, and enrollments.
* **GET `/users/<ID>`**: Fetch user details across 4+ tables.
* **POST `/users` (Create)**:
  * **Payload (raw JSON):** `{"email": "diana@coursehub.com", "name": "Diana Prince", "bio": "Tech educator", "phone": "+1-555-0404"}`
* **PATCH `/users/<ID>` (Upsert)**:
  * **Payload (raw JSON):** `{"email": "new.email@example.com", "name": "Alice W.", "bio": "Updated bio"}`
* **DELETE `/users/<ID>`**: Deletes user and cascades to all relations.

---

## 📚 Courses API (`/courses`)
* **GET `/courses`**: Fetch all courses with authors, lessons, and enrollment count.
* **GET `/courses/<ID>`**: Fetch course details with enrolled students.
* **POST `/courses` (Create)**:
  * **Payload (raw JSON):** 
    ```json
    {
      "title": "GraphQL Fundamentals", "published": true, "authorId": <USER_ID>,
      "lessons": [ { "title": "What is GraphQL?", "order": 1 } ]
    }
    ```
* **PATCH `/courses/<ID>` (Update)**:
  * **Payload (raw JSON):** `{"title": "NestJS Masterclass v2"}`
* **DELETE `/courses/<ID>`**: Deletes course and cascades to lessons/enrollments.

---

## 🎓 Enrollments API (`/enrollments`)
* **GET `/enrollments`**: Fetch all enrollments.
* **GET `/enrollments/<ID>`**: Fetch enrollment with user profile and course lessons.
* **POST `/enrollments` (Enroll)**:
  * **Payload (raw JSON):** `{"userId": <USER_ID>, "courseId": <COURSE_ID>}`
* **PATCH `/enrollments/<ID>` (Progress)**:
  * **Payload (raw JSON):** `{"progress": 100}`
* **DELETE `/enrollments/<ID>` (Unenroll)**: Removes the enrollment record.
