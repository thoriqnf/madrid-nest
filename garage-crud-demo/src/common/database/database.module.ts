import { Module, Global } from '@nestjs/common';
import { Pool } from 'pg';
import { ConfigModule, ConfigService } from '@nestjs/config';

/**
 * DatabaseModule sets up our connection to PostgreSQL.
 * Beginners: We use @Global() so we only have to import this module once in AppModule.
 * Every other module will then have access to the database!
 */
@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      /**
       * We create a "Provider" called DATABASE_POOL.
       * Think of this as a shared object that any Service can ask for.
       */
      provide: 'DATABASE_POOL',
      useFactory: (configService: ConfigService) => {
        /**
         * We create a new Pool (connection group) using our environment variables.
         * This is better than one single connection because it can handle more requests.
         */
        return new Pool({
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          user: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['DATABASE_POOL'],
})
export class DatabaseModule {}
