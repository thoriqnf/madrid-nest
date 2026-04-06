import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// ==========================================
// TODO Prisma 4.1: PrismaClient Inheritance & Adapter
// ==========================================
// 1. Inherit from `PrismaClient` 
// 2. Set up the PG Adapter inside the constructor
// ==========================================

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    const connectionString = `${process.env.DATABASE_URL}`;
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    super({ adapter });
  }

  // ==========================================
  // TODO Prisma 4.2: Database Connection
  // ==========================================
  // 1. Connect to the database inside `onModuleInit` (`await this.$connect()`)
  // 2. Disconnect from the database inside `onModuleDestroy` (`await this.$disconnect()`)
  // ==========================================
  async onModuleInit() {
    // await this.$connect();
  }

  async onModuleDestroy() {
    // await this.$disconnect();
  }
}
