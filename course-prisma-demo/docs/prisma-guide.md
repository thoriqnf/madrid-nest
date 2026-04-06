# Prisma ORM & NestJS Guide 🎓 (Beginner Friendly)

Welcome to the **CourseHub Prisma Demo**. This guide demonstrates how to set up Prisma ORM from zero and successfully build a beginner-friendly One-to-One relationship.

---

## 1. Defining Relationships

Prisma's `schema.prisma` allows you to define relationships visually and strictly.

### One-to-One Relationship
A `User` can only have one `Profile`.
```prisma
model Profile {
  id        Int     @id @default(autoincrement())
  bio       String?
  avatarUrl String? @map("avatar_url")
  phone     String?
  
  // The UNIQUE constraint here makes it strictly 1-to-1!
  userId    Int     @unique @map("user_id")
  user      User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("profiles")
}
```
* **Why `@unique`?** Without it, Prisma would think a user could have *many* profiles. Adding `@unique` on the foreign key (`userId`) enforces the One-to-One mathematical relationship.

---

## 2. Query Patterns

### Nested Database Writes
Prisma allows you to write to multiple tables in one go. Here we create a `User` AND their `Profile` simultaneously (Nested Create):
```typescript
this.prisma.user.create({
  data: {
    email: 'new@example.com',
    name: 'New User',
    profile: {
      create: { bio: 'A short bio', phone: '+1234567890' } // Creates profile in one transaction
    }
  }
});
```

### Upsert (Update or Insert)
A very common pattern where you want to update a profile if it exists, or create it if it doesn't.
```typescript
this.prisma.user.update({
  where: { id: 1 },
  data: {
    profile: {
      upsert: {
        create: { bio: 'Brand new bio' }, // If profile missing -> Insert
        update: { bio: 'Updated bio' }    // If profile exists -> Update
      }
    }
  }
});
```

### Includes
Prisma can automatically JOIN your One-to-One relational tables.
```typescript
this.prisma.user.findMany({
  include: {
    profile: true // Pulls the inner nested profile along with user data
  }
});
```

---

## 3. Recommended Workflow

1. Update `prisma/schema.prisma`
2. Run `npx prisma migrate dev --name <description>`
3. Check the seed file and test your data using `npx prisma db seed`
4. Serve the API locally with `npm run start:dev`
