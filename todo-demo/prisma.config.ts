import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // We use process.env directly to avoid build-time errors if DATABASE_URL is missing
    // Prisma Migrate will require this to be present at runtime
    url: process.env["DATABASE_URL"],
  },
});
