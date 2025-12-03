import express from 'express';
import cors from 'cors';
import { 
  query, // Importar query para uso direto nas rotas customizadas
  getUsers, 
  getUserByEmail, 
  createUser,
  getClients,
  getClientById,
  createClient,
  getProcedures,
  getProcedureById,
  createProcedure,
  getProducts,
  getProductById,
  createProduct,
  getFinancialEntries,
  getFinancialEntryById,
  createFinancialEntry,
  getPurchaseHistory,
  getPurchaseHistoryByClientId,
  createPurchaseHistory
} from '../utils/db';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rotas para Usuários
app.get('/api/users', async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

app.get('/api/users/email/:email', async (req, res) => {
  try {
    const user = await getUserByEmail(req.params.email);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

// Rotas para Clientes
app.get('/api/clients', async (req, res) => {
  try {
    const clients = await getClients();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
});

app.get('/api/clients/search', async (req, res) => {
  const queryStr = req.query.q as string;
  if (!queryStr) {
    return res.status(400).json({ error: 'Parâmetro de busca "q" é obrigatório' });
  }
  try {
    const result = await query(
      'SELECT * FROM clients WHERE name ILIKE $1 OR email ILIKE $1 OR phone ILIKE $1 LIMIT 10', 
      [`%${queryStr}%`]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Erro na busca de clientes:', error);
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
});

app.get('/api/clients/:id', async (req, res) => {
  try {
    const client = await getClientById(parseInt(req.params.id));
    if (client) {
      res.json(client);
    } else {
      res.status(404).json({ error: 'Cliente não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar cliente' });
  }
});

app.post('/api/clients', async (req, res) => {
  try {
    const client = await createClient(req.body);
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar cliente' });
  }
});

// Rotas para Procedimentos
app.get('/api/procedures', async (req, res) => {
  try {
    const procedures = await getProcedures();
    res.json(procedures);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar procedimentos' });
  }
});

app.get('/api/procedures/:id', async (req, res) => {
  try {
    const procedure = await getProcedureById(parseInt(req.params.id));
    if (procedure) {
      res.json(procedure);
    } else {
      res.status(404).json({ error: 'Procedimento não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar procedimento' });
  }
});

app.post('/api/procedures', async (req, res) => {
  try {
    const procedure = await createProcedure(req.body);
    res.status(201).json(procedure);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar procedimento' });
  }
});

// Rotas para Produtos
app.get('/api/products', async (req, res) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await getProductById(parseInt(req.params.id));
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produto' });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const product = await createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
});

// Rotas para Entradas Financeiras
app.get('/api/financial-entries', async (req, res) => {
  try {
    const entries = await getFinancialEntries();
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar entradas financeiras' });
  }
});

app.get('/api/financial-entries/:id', async (req, res) => {
  try {
    const entry = await getFinancialEntryById(parseInt(req.params.id));
    if (entry) {
      res.json(entry);
    } else {
      res.status(404).json({ error: 'Entrada financeira não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar entrada financeira' });
  }
});

app.post('/api/financial-entries', async (req, res) => {
  try {
    const entry = await createFinancialEntry(req.body);
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar entrada financeira' });
  }
});

// Rotas para Histórico de Compras
app.get('/api/purchase-history', async (req, res) => {
  try {
    const history = await getPurchaseHistory();
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar histórico de compras' });
  }
});

app.get('/api/purchase-history/client/:clientId', async (req, res) => {
  try {
    const history = await getPurchaseHistoryByClientId(parseInt(req.params.clientId));
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar histórico de compras do cliente' });
  }
});

app.post('/api/purchase-history', async (req, res) => {
  try {
    const history = await createPurchaseHistory(req.body);
    res.status(201).json(history);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar registro no histórico de compras' });
  }
});

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API está funcionando corretamente' });
});

export default app;