import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// ===== GLOBAL ERROR HANDLERS =====
process.on('unhandledRejection', (reason, promise) => {
  console.error('🔴 Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('🔴 Uncaught Exception:', error);
});

async function bootstrap() {
  console.log('====================================');
  console.log('🚀 BOOTSTRAP STARTING');
  console.log('====================================');
  console.log('📌 NODE_ENV:', process.env.NODE_ENV);
  console.log('📌 PORT env:', process.env.PORT);
  console.log('📌 DATABASE_URL exists:', !!process.env.DATABASE_URL);
  console.log('📌 JWT_SECRET exists:', !!process.env.JWT_SECRET);
  console.log('📌 Process PID:', process.pid);
  console.log('📌 Node version:', process.version);
  console.log('====================================');

  try {
    console.log('⏳ Creating NestFactory...');
    const app = await NestFactory.create(AppModule, { logger: ['log', 'error', 'warn', 'debug', 'verbose'] });
    console.log('✅ NestFactory created');

    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    console.log('✅ ValidationPipe registered');

    const port = Number(process.env.PORT) || 8000;
    const host = '0.0.0.0';

    console.log(`⏳ Attempting to listen on ${host}:${port}...`);
    await app.listen(port, host);

    const url = await app.getUrl();
    console.log('====================================');
    console.log(`✅ Application listening on: ${url}`);
    console.log(`✅ Health check: ${url}/`);
    console.log(`✅ Auth signup: ${url}/auth/signup`);
    console.log(`✅ Todos: ${url}/todos`);
    console.log('====================================');
  } catch (error) {
    console.error('🔴 BOOTSTRAP FAILED:', error);
    process.exit(1);
  }
}
bootstrap();

