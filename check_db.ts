
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function checkData() {
  try {
    const res = await pool.query('SELECT count(*) FROM procedures');
    console.log('Procedures count:', res.rows[0].count);
    
    const res2 = await pool.query('SELECT table_name FROM information_schema.tables WHERE table_schema = \'public\'');
    console.log('Tables:', res2.rows.map(r => r.table_name).join(', '));
  } catch (e) {
    console.error(e);
  } finally {
    await pool.end();
  }
}

checkData();
