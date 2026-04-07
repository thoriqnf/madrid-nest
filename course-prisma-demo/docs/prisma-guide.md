# 📖 Prisma Relationships Guide

Quick reference for the Prisma ORM relationships implemented in this CourseHub demo.

## 1. Prisma 7 Configuration
Prisma 7 removes `url` from `schema.prisma`. Connections are configured in `prisma.config.ts`. Run operations with `npx prisma <cmd>`.

## 2. One-to-One — User ↔ Profile
Strict one-to-one enforced by `@unique` on the foreign key (`userId`).

*   **Schema:** `Profile` holds `userId Int @unique`.
*   **Create:** `prisma.user.create({ data: { ..., profile: { create: { ... } } } })`
*   **Upsert:** `prisma.user.update({ where: { id: 1 }, data: { profile: { upsert: { create: {}, update: {} } } } })`

## 3. One-to-Many — User → Course
One user creates many courses. The "Many" side holds the foreign key.

*   **Schema:** `Course` holds `authorId Int` mapping to `User`.
*   **Connect:** `prisma.course.create({ data: { ..., author: { connect: { id: 1 } } } })`

## 4. Many-to-Many (Explicit) — User ↔ Course via Enrollment
Manual join table (`Enrollment`) holding extra metadata (`progress`, `enrolledAt`).

*   **Schema:** `Enrollment` holds `userId` and `courseId`. Has `@@unique([userId, courseId])`.
*   **Enroll (Create):** `prisma.enrollment.create({ data: { user: { connect: { id: 1 } }, course: { connect: { id: 2 } } } })`
*   **Update Extra Fields:** `prisma.enrollment.update({ where: { id: 1 }, data: { progress: 100 } })`

## 5. Multi-Table JOINs
Use `include` to deeply join tables in a single DB hit.

```typescript
// Joins: User → Profile, Courses → Lessons, Enrollments → Course
this.prisma.user.findUnique({
  where: { id: 1 },
  include: {
    profile: true,
    courses: { include: { lessons: true } },
    enrollments: { include: { course: true } }
  }
});
```

## 6. Cascade Deletes
All foreign keys use `onDelete: Cascade`. Deleting a parent automatically scrubs children.
*   **Delete User:** Cascades to `Profile`, `Courses`, `Lessons` (via Course), and `Enrollments`.

## 7. Useful Workflow Commands
1.  **Iterate Schema:** Modify `prisma/schema.prisma`
2.  **Migrate:** `npx prisma migrate dev --name <msg>`
3.  **Generate Typings:** `npx prisma generate` *(Crucial: Run this every time you change the schema to update TypeScript types, fix IDE errors, and rebuild the client!)*
4.  **Reset DB:** `npx prisma migrate reset --force`
5.  **Seed Data:** `npx prisma db seed`
