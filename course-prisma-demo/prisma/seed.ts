import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding CourseHub database...\n');

  // TODO Relation 2.1: Seed Users and utilize nested writes for Profiles.
  console.log('👤 Creating users with profiles...');
  /*
  const alice = await prisma.user.upsert({ ... });
  */

  // TODO Relation 2.2: Seed Courses and utilize nested `createMany` for Lessons.
  console.log('📚 Creating courses with lessons...');
  /*
  const nestjsCourse = await prisma.course.create({ ... });
  */

  // TODO Relation 2.3: Seed Enrollments (Explicit M2M).
  console.log('🎓 Creating enrollments...');
  /*
  await prisma.enrollment.createMany({ ... });
  */

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
