import { Module, Global } from '@nestjs/common';
import { Pool } from 'pg';
import { ConfigModule, ConfigService } from '@nestjs/config';

/**
 * DatabaseModule sets up our connection to PostgreSQL.
 * Beginners: We use @Global() so we only have to import this module once in AppModule.
 */
@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'DATABASE_POOL',
      useFactory: async (configService: ConfigService) => {
        /**
         * TODO 1: Initialize the PostgreSQL Pool.
         * Instructions:
         * 1. Create a new 'Pool' from 'pg' library.
         * 2. Use 'configService.get<string>()' or 'process.env' to get DB host, port, user, password, and name.
         * 3. Return the Pool instance.
         */

        const pool = new Pool({
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          user: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_name'),
        });

        try {
          await pool.query('SELECT NOW()');
          console.log('DB Connected ✅');
        } catch (error) {
          console.error('DB not connected 🚫', error.message);
        }
        return pool;
      },
      inject: [ConfigService],
    },
  ],
  exports: ['DATABASE_POOL'],
})
export class DatabaseModule {}
