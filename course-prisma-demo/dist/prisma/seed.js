"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new pg_1.Pool({ connectionString });
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    console.log('Seeding database (Simplified One-to-One)...');
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
//# sourceMappingURL=seed.js.map