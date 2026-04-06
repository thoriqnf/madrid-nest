import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database (Simplified One-to-One)...');

  // Create Users with Profiles (Nested create: One-to-One)
  await prisma.user.upsert({
    where: { email: 'john@coursehub.com' },
    update: {},
    create: {
      email: 'john@coursehub.com',
      name: 'John Instructor',
      profile: {
        create: {
          bio: 'Senior Web Developer',
          phone: '+1234567890',
        },
      },
    },
  });

  await prisma.user.upsert({
    where: { email: 'alice@student.com' },
    update: {},
    create: {
      email: 'alice@student.com',
      name: 'Alice Learner',
      profile: {
        create: {
          bio: 'Aspiring developer',
        },
      },
    },
  });

  console.log('Seeding completed successfully! 🌱');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
