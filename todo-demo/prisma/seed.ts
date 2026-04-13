import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const password = 'password123';
  const hashedPassword = await bcrypt.hash(password, 10);

  // 1. Create a test user
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      password: hashedPassword,
      name: 'Test User',
    },
  });

  console.log('Created User:', user.email);

  // 2. Create 10 todos for the user
  const todosData = [
    { title: 'Learn NestJS basics', description: 'Understand controllers, services, and modules', completed: true },
    { title: 'Setup Prisma ORM', description: 'Connect to PostgreSQL and run migrations', completed: true },
    { title: 'Implement Auth with JWT', description: 'Signup, signin, and refresh token logic', completed: false },
    { title: 'Create CRUD for Todos', description: 'Implement GET, POST, PATCH, DELETE endpoints', completed: false },
    { title: 'Write Unit Tests', description: 'Test business logic in services', completed: false },
    { title: 'Add API documentation', description: 'Document endpoints with Swagger or Markdown', completed: false },
    { title: 'Optimize Database Queries', description: 'Check for N+1 issues and add indexes', completed: false },
    { title: 'Implement Error Handling', description: 'Use global filters for consistent error responses', completed: true },
    { title: 'Prepare for Demo Day', description: 'Clean up code and prepare presentation slides', completed: false },
    { title: 'Deploy to Production', description: 'Set up CI/CD pipeline and host the app', completed: false },
  ];

  console.log('Seeding 10 todos...');

  for (const item of todosData) {
    await prisma.todo.create({
      data: {
        ...item,
        userId: user.id,
      },
    });
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
