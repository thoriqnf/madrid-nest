"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
require("dotenv/config");
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new pg_1.Pool({ connectionString });
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);
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
//# sourceMappingURL=seed.js.map