import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { CoursesModule } from './modules/courses/courses.module';
import { EnrollmentsModule } from './modules/enrollments/enrollments.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    /**
     * TODO ADV AUTH: 5.1 - Rate Limiting
     * ThrottlerModule.forRoot([{
     *   ttl: 60000,
     *   limit: 10,
     * }]),
     */
    PrismaModule,
    UsersModule,
    CoursesModule,
    EnrollmentsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    /**
     * TODO ADV AUTH: 5.1 - Rate Limiting Guard
     * {
     *   provide: APP_GUARD,
     *   useClass: ThrottlerGuard,
     * },
     */
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
