# Prisma ORM & NestJS Guide 🎓 — All Relationship Types

Welcome to **CourseHub**, a complete Prisma ORM demo covering **every relationship type**, **multi-table JOINs**, and **cascade operations**.

---

## 1. Relationship Types Overview

| Relationship | Models | Prisma Approach |
|---|---|---|
| **One-to-One** | User ↔ Profile | `@unique` on FK field |
| **One-to-Many** | User → Course, Course → Lesson | FK on child model |
| **Many-to-Many (implicit)** | Course ↔ Category | Prisma auto-creates join table |
| **Many-to-Many (explicit)** | User ↔ Course via Enrollment | Manual join table with extra fields |

---

## 2. One-to-One — User ↔ Profile

A `User` can only have **one** `Profile`.

```prisma
model Profile {
  id        Int     @id @default(autoincrement())
  bio       String?
  avatarUrl String? @map("avatar_url")
  phone     String?

  // @unique enforces strict 1-to-1
  userId    Int     @unique @map("user_id")
  user      User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("profiles")
}
```

**Why `@unique`?** Without it, Prisma would allow many profiles per user (1-to-many). Adding `@unique` on the FK enforces the 1-to-1 constraint.

### Query: Nested Create
```typescript
this.prisma.user.create({
  data: {
    email: 'alice@example.com',
    name: 'Alice',
    profile: {
      create: { bio: 'Hello!', phone: '+1234567890' }
    }
  }
});
```

---

## 3. One-to-Many — User → Course, Course → Lesson

A `User` can author **many** `Courses`. A `Course` can have **many** `Lessons`.

```prisma
model Course {
  id        Int      @id @default(autoincrement())
  title     String
  authorId  Int      @map("author_id")
  author    User     @relation(fields: [authorId], references: [id], onDelete: Cascade)
  lessons   Lesson[]

  @@map("courses")
}

model Lesson {
  id       Int    @id @default(autoincrement())
  title    String
  order    Int    @default(0)
  courseId  Int    @map("course_id")
  course   Course @relation(fields: [courseId], references: [id], onDelete: Cascade)

  @@map("lessons")
}
```

### Query: Nested createMany
```typescript
this.prisma.course.create({
  data: {
    title: 'NestJS Masterclass',
    author: { connect: { id: 1 } },
    lessons: {
      createMany: {
        data: [
          { title: 'Intro', order: 1 },
          { title: 'Prisma', order: 2 },
        ]
      }
    }
  }
});
```

---

## 4. Many-to-Many (Implicit) — Course ↔ Category

Prisma automatically creates a join table `_CategoryToCourse`. No FK needed in either model.

```prisma
model Course {
  categories Category[] // Just list the other model!
}

model Category {
  id      Int      @id @default(autoincrement())
  name    String   @unique
  slug    String   @unique
  courses Course[] // Back-relation

  @@map("categories")
}
```

### Query: Connect & Set
```typescript
// Connect categories when creating a course
this.prisma.course.create({
  data: {
    title: 'Docker Course',
    author: { connect: { id: 1 } },
    categories: { connect: [{ id: 1 }, { id: 3 }] }
  }
});

// Replace ALL categories on a course
this.prisma.course.update({
  where: { id: 1 },
  data: {
    categories: { set: [{ id: 2 }] } // Removes old, connects new
  }
});
```

---

## 5. Many-to-Many (Explicit) — User ↔ Course via Enrollment

When a join table needs **extra fields** (like `progress`, `enrolledAt`), use an explicit join model.

```prisma
model Enrollment {
  id          Int       @id @default(autoincrement())
  enrolledAt  DateTime  @default(now()) @map("enrolled_at")
  completedAt DateTime? @map("completed_at")
  progress    Int       @default(0)

  userId  Int    @map("user_id")
  user    User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  courseId Int    @map("course_id")
  course  Course @relation(fields: [courseId], references: [id], onDelete: Cascade)

  @@unique([userId, courseId]) // Prevent duplicate enrollments
  @@map("enrollments")
}
```

### Query: CRUD on join table
```typescript
// Enroll a user
this.prisma.enrollment.create({
  data: {
    user: { connect: { id: 3 } },
    course: { connect: { id: 1 } }
  }
});

// Update progress
this.prisma.enrollment.update({
  where: { id: 1 },
  data: { progress: 75 }
});
```

---

## 6. Multi-Table JOINs (4+ Tables)

Prisma's `include` lets you join as many tables as needed:

```typescript
// JOIN across User → Profile + Courses → Lessons + Categories + Enrollments → Course
this.prisma.user.findUnique({
  where: { id: 1 },
  include: {
    profile: true,                  // +1 table (profiles)
    courses: {                      // +1 table (courses)
      include: {
        lessons: true,              // +1 table (lessons)
        categories: true,           // +1 table (categories via join table)
        _count: { select: { enrollments: true } }
      }
    },
    enrollments: {                  // +1 table (enrollments)
      include: {
        course: {
          include: { author: true } // +1 table (back to users)
        }
      }
    }
  }
});
```

This single query touches **6 tables**: users, profiles, courses, lessons, categories (_CategoryToCourse), enrollments.

---

## 7. Cascade Operations

All FKs use `onDelete: Cascade`. When you delete a parent, all children are automatically removed.

### Delete User → Cascades to:
- ✅ Profile (1-to-1)
- ✅ Courses (1-to-many)
- ✅ Lessons (via Course cascade)
- ✅ Enrollments (as student)

### Delete Course → Cascades to:
- ✅ Lessons (1-to-many)
- ✅ Enrollments (explicit M2M)
- ❌ Categories (implicit M2M — just unlinked, not deleted)

```typescript
// This single call removes the user AND all related data across 5 tables
this.prisma.user.delete({ where: { id: 1 } });
```

---

## 8. Recommended Workflow

1. Update `prisma/schema.prisma`
2. Run `npx prisma migrate dev --name <description>`
3. Seed the database: `npx prisma db seed`
4. Start the API: `npm run start:dev`
5. Test endpoints: `curl http://localhost:9000/api/v1/users`
