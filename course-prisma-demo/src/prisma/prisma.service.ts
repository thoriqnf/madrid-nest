import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // ==========================================
    // PRISMA BOILERPLATE: Driver Adapter Setup
    // ==========================================
    // This is required for the application to boot when using @prisma/adapter-pg.
    // For more info, see: https://www.prisma.io/docs/orm/overview/databases/postgresql#driver-adapters
    const connectionString = `${process.env.DATABASE_URL}`;
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    super({ adapter });
  }

  // ==========================================
  // TODO Prisma 4.1: Database Connection
  // ==========================================
  // 1. Connect to the database inside `onModuleInit` (`await this.$connect()`)
  // 2. Disconnect from the database inside `onModuleDestroy` (`await this.$disconnect()`)
  // ==========================================
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
