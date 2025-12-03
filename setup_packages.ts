
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function setupPackages() {
  try {
    console.log('Starting database setup for packages...');

    // 1. Add quantity to purchase_history if it doesn't exist
    try {
      await pool.query('ALTER TABLE purchase_history ADD COLUMN quantity INTEGER DEFAULT 1');
      console.log('Added quantity column to purchase_history');
    } catch (e: any) {
      if (e.code === '42701') { // duplicate_column
        console.log('Column quantity already exists in purchase_history');
      } else {
        console.error('Error adding quantity column:', e);
      }
    }

    // 2. Create client_packages table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS client_packages (
        id SERIAL PRIMARY KEY,
        client_id INTEGER REFERENCES clients(id),
        service_id INTEGER REFERENCES procedures(id),
        total_sessions INTEGER NOT NULL,
        used_sessions INTEGER DEFAULT 0,
        purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(20) DEFAULT 'active'
      )
    `);
    console.log('Created client_packages table');

    // 3. Verify tables
    const res = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
    console.log('Tables:', res.rows.map(r => r.table_name).join(', '));

  } catch (e) {
    console.error('Error in setupPackages:', e);
  } finally {
    await pool.end();
  }
}

setupPackages();
