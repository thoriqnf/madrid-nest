import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Simple Data Seeder for Beginners
 * This script runs all .sql files in scripts/seeds/ to populate the DB.
 */
async function runSeeds() {
  const pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const seedsDir = path.join(__dirname, 'seeds');
  const files = fs.readdirSync(seedsDir).filter(f => f.endsWith('.sql')).sort();

  console.log(`🌱 Starting seeds in: ${seedsDir}`);

  for (const file of files) {
    const filePath = path.join(seedsDir, file);
    const sql = fs.readFileSync(filePath, 'utf8');

    try {
      console.log(`  - Seeding: ${file}...`);
      await pool.query(sql);
      console.log(`  ✅ Success: ${file}`);
    } catch (err) {
      console.error(`  ❌ Failed: ${file}`);
      console.error(`     Error: ${err.message}`);
      process.exit(1);
    }
  }

  console.log('✨ All seeds completed successfully!');
  await pool.end();
}

runSeeds();
