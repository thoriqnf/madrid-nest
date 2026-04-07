import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding CourseHub database...\n');

  // ─── 1. Users + Profiles (1-to-1 nested write) ────────────────────
  console.log('👤 Creating users with profiles...');
  const alice = await prisma.user.upsert({
    where: { email: 'alice@coursehub.com' },
    update: {},
    create: {
      email: 'alice@coursehub.com',
      name: 'Alice Johnson',
      profile: {
        create: {
          bio: 'Full-stack engineer & instructor. Loves NestJS and React.',
          phone: '+1-555-0101',
          avatarUrl: 'https://i.pravatar.cc/150?u=alice',
        },
      },
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: 'bob@coursehub.com' },
    update: {},
    create: {
      email: 'bob@coursehub.com',
      name: 'Bob Smith',
      profile: {
        create: {
          bio: 'Data scientist & DevOps enthusiast. Python advocate.',
          phone: '+1-555-0202',
          avatarUrl: 'https://i.pravatar.cc/150?u=bob',
        },
      },
    },
  });

  const charlie = await prisma.user.upsert({
    where: { email: 'charlie@coursehub.com' },
    update: {},
    create: {
      email: 'charlie@coursehub.com',
      name: 'Charlie Lee',
      profile: {
        create: {
          bio: 'Eager learner transitioning into tech.',
          phone: '+1-555-0303',
        },
      },
    },
  });

  // ─── 2. Courses + Lessons (1-to-many) ─────────────────────────────
  console.log('📚 Creating courses with lessons...');

  const nestjsCourse = await prisma.course.create({
    data: {
      title: 'NestJS Masterclass',
      description:
        'Build production-grade APIs with NestJS, Prisma, and PostgreSQL.',
      published: true,
      author: { connect: { id: alice.id } },
      lessons: {
        createMany: {
          data: [
            {
              title: 'Introduction to NestJS',
              content: 'Learn the basics of NestJS modules, controllers, and providers.',
              order: 1,
            },
            {
              title: 'Prisma ORM Integration',
              content: 'Set up Prisma, define schemas, and run migrations.',
              order: 2,
            },
            {
              title: 'Building REST APIs',
              content: 'Create full CRUD endpoints with validation and error handling.',
              order: 3,
            },
          ],
        },
      },
    },
  });

  const reactCourse = await prisma.course.create({
    data: {
      title: 'React for Beginners',
      description: 'Learn React from scratch — components, hooks, and state management.',
      published: true,
      author: { connect: { id: alice.id } },
      lessons: {
        createMany: {
          data: [
            {
              title: 'JSX and Components',
              content: 'Understand JSX syntax and build your first component.',
              order: 1,
            },
            {
              title: 'State & Hooks',
              content: 'Master useState, useEffect, and custom hooks.',
              order: 2,
            },
          ],
        },
      },
    },
  });

  const pythonCourse = await prisma.course.create({
    data: {
      title: 'Python ML Bootcamp',
      description:
        'Hands-on machine learning with Python, Pandas, and scikit-learn.',
      published: true,
      author: { connect: { id: bob.id } },
      lessons: {
        createMany: {
          data: [
            {
              title: 'Python Fundamentals',
              content: 'Variables, loops, functions — the Python crash course.',
              order: 1,
            },
            {
              title: 'Data Wrangling with Pandas',
              content: 'Load, clean, and transform datasets.',
              order: 2,
            },
            {
              title: 'Building ML Models',
              content: 'Train your first model with scikit-learn.',
              order: 3,
            },
          ],
        },
      },
    },
  });

  const dockerCourse = await prisma.course.create({
    data: {
      title: 'Docker & Kubernetes',
      description: 'Containerize and orchestrate your apps like a pro.',
      published: false, // draft course
      author: { connect: { id: bob.id } },
      lessons: {
        createMany: {
          data: [
            {
              title: 'Docker Basics',
              content: 'Images, containers, volumes, and networking.',
              order: 1,
            },
            {
              title: 'Kubernetes Intro',
              content: 'Pods, deployments, services, and ingress.',
              order: 2,
            },
          ],
        },
      },
    },
  });

  // ─── 3. Enrollments (M2M explicit — join table with extra fields) ──
  console.log('🎓 Creating enrollments...');

  await prisma.enrollment.createMany({
    data: [
      // Bob enrolls in Alice's courses
      {
        userId: bob.id,
        courseId: nestjsCourse.id,
        progress: 50,
      },
      {
        userId: bob.id,
        courseId: reactCourse.id,
        progress: 100,
        completedAt: new Date(),
      },
      // Charlie enrolls in courses
      {
        userId: charlie.id,
        courseId: nestjsCourse.id,
        progress: 25,
      },
      {
        userId: charlie.id,
        courseId: pythonCourse.id,
        progress: 0,
      },
      // Alice enrolls in Bob's Docker course
      {
        userId: alice.id,
        courseId: dockerCourse.id,
        progress: 75,
      },
    ],
  });

  console.log('\n✅ Seeding completed successfully!');
  console.log('   - 3 Users (with Profiles)');
  console.log('   - 4 Courses (with 10 Lessons)');
  console.log('   - 5 Enrollments');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
