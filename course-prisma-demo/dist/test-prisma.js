"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
console.log(Object.keys(new client_1.PrismaClient({ url: process.env.DATABASE_URL })));
//# sourceMappingURL=test-prisma.js.map