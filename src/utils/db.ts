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

// Funções específicas para operações comuns

// Usuários
export const getUsers = async () => {
  const result = await query('SELECT * FROM users ORDER BY created_at DESC');
  return result.rows;
};

export const getUserByEmail = async (email: string) => {
  const result = await query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

export const createUser = async (userData: { name: string; email: string; phone: string; password: string }) => {
  const result = await query(
    'INSERT INTO users (name, email, phone, password) VALUES ($1, $2, $3, $4) RETURNING *',
    [userData.name, userData.email, userData.phone, userData.password]
  );
  return result.rows[0];
};

// Clientes
export const getClients = async () => {
  const result = await query('SELECT * FROM clients ORDER BY created_at DESC');
  return result.rows;
};

export const getClientById = async (id: number) => {
  const result = await query('SELECT * FROM clients WHERE id = $1', [id]);
  return result.rows[0];
};

export const createClient = async (clientData: { name: string; email: string; phone: string; birth_date?: string; address?: string; loyalty_points: number }) => {
  const result = await query(
    'INSERT INTO clients (name, email, phone, birth_date, address, loyalty_points) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [clientData.name, clientData.email, clientData.phone, clientData.birth_date, clientData.address, clientData.loyalty_points]
  );
  return result.rows[0];
};

// Procedimentos
export const getProcedures = async () => {
  const result = await query('SELECT * FROM procedures ORDER BY created_at DESC');
  return result.rows;
};

export const getProcedureById = async (id: number) => {
  const result = await query('SELECT * FROM procedures WHERE id = $1', [id]);
  return result.rows[0];
};

export const createProcedure = async (procedureData: { name: string; description: string; price: number; duration: number; category: string }) => {
  const result = await query(
    'INSERT INTO procedures (name, description, price, duration, category) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [procedureData.name, procedureData.description, procedureData.price, procedureData.duration, procedureData.category]
  );
  return result.rows[0];
};

// Produtos
export const getProducts = async () => {
  const result = await query('SELECT * FROM products ORDER BY created_at DESC');
  return result.rows;
};

export const getProductById = async (id: number) => {
  const result = await query('SELECT * FROM products WHERE id = $1', [id]);
  return result.rows[0];
};

export const createProduct = async (productData: { name: string; price: number; category: string; image_url: string; is_new: boolean }) => {
  const result = await query(
    'INSERT INTO products (name, price, category, image_url, is_new) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [productData.name, productData.price, productData.category, productData.image_url, productData.is_new]
  );
  return result.rows[0];
};

// Entradas financeiras
export const getFinancialEntries = async () => {
  const result = await query('SELECT * FROM financial_entries ORDER BY date DESC');
  return result.rows;
};

export const getFinancialEntryById = async (id: number) => {
  const result = await query('SELECT * FROM financial_entries WHERE id = $1', [id]);
  return result.rows[0];
};

export const createFinancialEntry = async (entryData: { type: string; category: string; description: string; amount: number; date: Date; source: string }) => {
  const result = await query(
    'INSERT INTO financial_entries (type, category, description, amount, date, source) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [entryData.type, entryData.category, entryData.description, entryData.amount, entryData.date, entryData.source]
  );
  return result.rows[0];
};

// Histórico de compras
export const getPurchaseHistory = async () => {
  const result = await query('SELECT * FROM purchase_history ORDER BY date DESC');
  return result.rows;
};

export const getPurchaseHistoryByClientId = async (clientId: number) => {
  const result = await query('SELECT * FROM purchase_history WHERE client_id = $1 ORDER BY date DESC', [clientId]);
  return result.rows;
};

export const createPurchaseHistory = async (historyData: { client_id: number; product_id?: number; service_id?: number; amount: number; date: Date; type: string }) => {
  const result = await query(
    'INSERT INTO purchase_history (client_id, product_id, service_id, amount, date, type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [historyData.client_id, historyData.product_id, historyData.service_id, historyData.amount, historyData.date, historyData.type]
  );
  return result.rows[0];
};

// Agendamentos
export const getAppointments = async () => {
  const result = await query('SELECT * FROM appointments ORDER BY date DESC, time DESC');
  return result.rows;
};

export const getAppointmentsByClientId = async (clientId: number) => {
  const result = await query('SELECT * FROM appointments WHERE client_id = $1 ORDER BY date DESC, time DESC', [clientId]);
  return result.rows;
};

export const createAppointment = async (aptData: { client_id: number; procedure_id: number; professional_name: string; date: string; time: string; status: 'upcoming' | 'completed' | 'cancelled'; price?: number }) => {
  const result = await query(
    'INSERT INTO appointments (client_id, procedure_id, professional_name, date, time, status, price) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [aptData.client_id, aptData.procedure_id, aptData.professional_name, aptData.date, aptData.time, aptData.status, aptData.price]
  );
  return result.rows[0];
};

export default pool;
