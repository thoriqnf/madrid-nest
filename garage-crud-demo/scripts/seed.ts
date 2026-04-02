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

    /**
     * TODO 10: Populate the database with sample data.
     * Instructions:
     * 1. Use 'await pool.query(sql)' to run the seed script.
     * 2. Log a success message for each file seeded.
     * 3. Handle any errors if the seed fails.
     */
    
    // --- START YOUR CODE HERE ---
    
    // --- END YOUR CODE HERE ---
  }

  console.log('✨ All seeds completed successfully!');
  await pool.end();
}

runSeeds();
