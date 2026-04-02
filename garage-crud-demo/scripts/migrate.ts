import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

async function runMigrations() {
  const pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const migrationsDir = path.join(__dirname, 'migrations');
  const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort();

  console.log(`🚀 Starting migrations in: ${migrationsDir}`);

  for (const file of files) {
    const filePath = path.join(migrationsDir, file);
    const sql = fs.readFileSync(filePath, 'utf8');

    try {
      console.log(`  - Executing: ${file}...`);
      await pool.query(sql);
      console.log(`  ✅ Success: ${file}`);
    } catch (err) {
      console.error(`  ❌ Failed: ${file}`);
      console.error(`     Error: ${err.message}`);
      process.exit(1);
    }
  }

  console.log('✨ All migrations completed successfully!');
  await pool.end();
}

runMigrations();
