import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Simple Database Reset Script for Beginners
 * DANGER: This will DROP all tables. Use only for demo/development!
 */
async function resetDatabase() {
  const pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const query = `
    DROP TABLE IF EXISTS transaction_details CASCADE;
    DROP TABLE IF EXISTS transactions CASCADE;
    DROP TABLE IF EXISTS services CASCADE;
    DROP TABLE IF EXISTS customers CASCADE;
    DROP TABLE IF EXISTS outlets CASCADE;
  `;

  console.log('🧹 Resetting database (dropping all tables)...');

  try {
    await pool.query(query);
    console.log('✅ Database is now blank.');
  } catch (err) {
    console.error('❌ Reset failed:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

resetDatabase();
