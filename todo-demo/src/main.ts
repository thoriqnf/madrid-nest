console.log('🏁 NODE PROCESS STARTING...');
console.log('PID:', process.pid);
console.log('Version:', process.version);
console.log('Argv:', process.argv);

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
  console.log('📌 RT_SECRET exists:', !!process.env.RT_SECRET);
  console.log('====================================');

  try {
    console.log('⏳ Creating NestFactory...');
    const app = await NestFactory.create(AppModule, { 
      logger: ['log', 'error', 'warn', 'debug', 'verbose'],
      bufferLogs: true 
    });
    console.log('✅ NestFactory created');

    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    console.log('✅ ValidationPipe registered');

    // Ensure port is handled correctly, default to 8000 for local, 
    // but Railway MUST provide a PORT if it expects one.
    const rawPort = process.env.PORT;
    const port = rawPort ? Number(rawPort) : 8000;
    const host = '0.0.0.0';

    if (isNaN(port)) {
      console.error(`🔴 INVALID PORT DETECTED: "${rawPort}"`);
      process.exit(1);
    }

    console.log(`⏳ Attempting to listen on ${host}:${port}...`);
    await app.listen(port, host);

    const url = await app.getUrl();
    console.log('====================================');
    console.log(`✅ Application listening on: ${url}`);
    console.log(`✅ Health check: ${url}/`);
    console.log('====================================');
  } catch (error) {
    console.error('🔴 BOOTSTRAP FAILED:', error);
    console.error(error.stack);
    process.exit(1);
  }
}
bootstrap();

