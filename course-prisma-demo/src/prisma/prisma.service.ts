import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // ==========================================
    // TODO Prisma 4.1: PrismaClient Inheritance & Adapter
    // ==========================================
    // 1. Inherit from `PrismaClient` (already done via `extends`)
    // 2. Set up the PG Adapter inside the constructor and call `super({ adapter })`
    // ==========================================
    super(); 
  }

  // ==========================================
  // TODO Prisma 4.2: Database Connection
  // ==========================================
  // 1. Connect to the database inside `onModuleInit` (`await this.$connect()`)
  // 2. Disconnect from the database inside `onModuleDestroy` (`await this.$disconnect()`)
  // ==========================================
  async onModuleInit() {
    // TODO: await this.$connect();
  }

  async onModuleDestroy() {
    // TODO: await this.$disconnect();
  }
}
