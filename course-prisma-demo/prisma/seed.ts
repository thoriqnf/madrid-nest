import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database (Starter Template)...');

  // ==========================================
  // TODO Prisma 3.1: Insert a mock User with a nested Profile
  // ==========================================
  // 1. Write a Prisma query (upsert or create) to insert a User.
  // 2. Use a "Nested Write" to simultaneously create their associated Profile!
  // ==========================================

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
