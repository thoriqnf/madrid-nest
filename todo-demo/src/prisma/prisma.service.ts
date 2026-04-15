import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    const connectionString = `${process.env.DATABASE_URL}`;
    console.log('📌 PrismaService: Creating PG Pool...');
    console.log('📌 PrismaService: DB host:', connectionString.split('@')[1]?.split('/')[0] || 'unknown');
    const pool = new Pool({ connectionString });

    pool.on('error', (err) => {
      console.error('🔴 PG Pool error (idle client):', err.message);
    });

    pool.on('connect', () => {
      console.log('✅ PG Pool: New client connected');
    });

    const adapter = new PrismaPg(pool);
    super({ adapter });
    console.log('✅ PrismaService: PrismaClient created with PG adapter');
  }

  async onModuleInit() {
    console.log('⏳ PrismaService: Connecting...');
    await this.$connect();
    console.log('✅ PrismaService: Connected successfully');
  }

  async onModuleDestroy() {
    console.log('⏳ PrismaService: Disconnecting...');
    await this.$disconnect();
    console.log('✅ PrismaService: Disconnected');
  }
}
