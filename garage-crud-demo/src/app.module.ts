import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './common/database/database.module';
import { ServicesModule } from './modules/services/services.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { LibraryModule } from './modules/library/library.module';

@Module({
  imports: [
    // Load .env variables globally
    ConfigModule.forRoot({ isGlobal: true }),

    // Database connection provider
    DatabaseModule,

    // Feature Modules
    ServicesModule,
    TransactionsModule,
    LibraryModule,
  ],
})
export class AppModule {}
