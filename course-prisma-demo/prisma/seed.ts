import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding CourseHub database...\n');
  const passwordHash = await bcrypt.hash('password123', 10);

  console.log('👤 Creating users with profiles...');
  const alice = await prisma.user.upsert({
    where: { email: 'alice@coursehub.com' },
    update: {},
    create: {
      email: 'alice@coursehub.com',
      name: 'Alice Admin',
      password: passwordHash,
      role: 'ADMIN',
      profile: {
        create: { bio: 'System Administrator', phone: '+123456789' }
      }
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: 'bob@coursehub.com' },
    update: {},
    create: {
      email: 'bob@coursehub.com',
      name: 'Bob Student',
      password: passwordHash,
      role: 'USER',
      profile: {
        create: { bio: 'Enthusiastic Learner' }
      }
    },
  });

  console.log('📚 Creating courses with lessons...');
  const nestjsCourse = await prisma.course.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'NestJS Zero to Hero',
      description: 'Master backend development with NestJS.',
      published: true,
      author: { connect: { id: alice.id } },
      lessons: {
        create: [
          { title: 'Introduction to Controllers', order: 1 },
          { title: 'Providers and DI', order: 2 }
        ]
      }
    }
  });

  console.log('🎓 Creating enrollments...');
  await prisma.enrollment.upsert({
    where: {
      userId_courseId: {
        userId: bob.id,
        courseId: nestjsCourse.id
      }
    },
    update: {},
    create: {
      user: { connect: { id: bob.id } },
      course: { connect: { id: nestjsCourse.id } },
      progress: 50
    }
  });

  console.log('\n✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
