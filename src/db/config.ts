import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Configuração do pool de conexões com o banco de dados
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Função para conectar ao banco de dados
export const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log('Conectado ao banco de dados PostgreSQL com sucesso!');
    client.release();
    return pool;
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    throw err;
  }
};

// Função para executar queries
export const query = async (text: string, params?: any[]) => {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('Query executada:', { text, duration, rows: res.rowCount });
  return res;
};

export default pool;