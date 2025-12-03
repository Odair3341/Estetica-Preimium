import { query } from './config';

async function seedDatabase() {
  try {
    // Verificar se já existem usuários
    const userCount = await query('SELECT COUNT(*) FROM users');
    if (parseInt(userCount.rows[0].count) === 0) {
      // Inserir usuários iniciais
      await query(`
        INSERT INTO users (name, email, phone, password) VALUES
        ('Administrador', 'admin@esteticapremium.com', '(11) 99999-9999', 'admin123')
      `);
      console.log('Usuários inseridos com sucesso!');
    } else {
      console.log('Usuários já existem, pulando inserção...');
    }

    // Verificar se já existem clientes
    const clientCount = await query('SELECT COUNT(*) FROM clients');
    if (parseInt(clientCount.rows[0].count) === 0) {
      // Inserir clientes iniciais
      await query(`
        INSERT INTO clients (name, email, phone, birth_date, address, loyalty_points) VALUES
        ('Maria Silva', 'maria.silva@email.com', '(11) 99999-9999', '1990-05-15', 'Rua das Flores, 123', 150),
        ('Ana Costa', 'ana.costa@email.com', '(11) 98888-8888', '1985-10-22', 'Av. Paulista, 1000', 85),
        ('Carlos Oliveira', 'carlos.oliveira@email.com', '(11) 97777-7777', '1992-12-03', 'Rua Vergueiro, 500', 220),
        ('Fernanda Lima', 'fernanda.lima@email.com', '(11) 96666-6666', '1988-07-18', 'Alameda Santos, 2000', 65)
      `);
      console.log('Clientes inseridos com sucesso!');
    } else {
      console.log('Clientes já existem, pulando inserção...');
    }

    // Verificar se já existem procedimentos
    const procedureCount = await query('SELECT COUNT(*) FROM procedures');
    if (parseInt(procedureCount.rows[0].count) === 0) {
      // Inserir procedimentos iniciais
      await query(`
        INSERT INTO procedures (name, description, price, duration, category) VALUES
        ('Limpeza de Pele Profunda', 'Tratamento completo para limpeza e revitalização da pele', 150.00, 60, 'Rosto'),
        ('Massagem Relaxante', 'Massagem corporal completa para relaxamento muscular', 120.00, 50, 'Corporal'),
        ('Depilação Completa', 'Depilação com cera quente e produtos especiais', 80.00, 30, 'Corporal')
      `);
      console.log('Procedimentos inseridos com sucesso!');
    } else {
      console.log('Procedimentos já existem, pulando inserção...');
    }

    // Verificar se já existem produtos
    const productCount = await query('SELECT COUNT(*) FROM products');
    if (parseInt(productCount.rows[0].count) === 0) {
      // Inserir produtos iniciais
      await query(`
        INSERT INTO products (name, price, category, image_url, is_new) VALUES
        ('Vestido Midi Floral', 299.90, 'Vestidos', 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=2000&auto=format&fit=crop', true),
        ('Blusa de Seda Off-white', 159.90, 'Blusas', 'https://images.unsplash.com/photo-1604176354204-946877562889?q=80&w=2000&auto=format&fit=crop', false),
        ('Calça Alfaiataria Preta', 249.00, 'Calças', 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=2000&auto=format&fit=crop', false),
        ('Conjunto Moletom Rosa', 350.00, 'Conjuntos', 'https://images.unsplash.com/photo-1614676471928-2ed0ad486148?q=80&w=2000&auto=format&fit=crop', true),
        ('Camisa Linho Bege', 189.90, 'Blusas', 'https://images.unsplash.com/photo-1551163943-3f6a29e3945a?q=80&w=2000&auto=format&fit=crop', false),
        ('Serum Facial Vitamina C', 99.90, 'Cosméticos', 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=2000&auto=format&fit=crop', false)
      `);
      console.log('Produtos inseridos com sucesso!');
    } else {
      console.log('Produtos já existem, pulando inserção...');
    }

    // Verificar se já existem entradas financeiras
    const financialEntryCount = await query('SELECT COUNT(*) FROM financial_entries');
    if (parseInt(financialEntryCount.rows[0].count) === 0) {
      // Inserir entradas financeiras iniciais
      await query(`
        INSERT INTO financial_entries (type, category, description, amount, date, source) VALUES
        ('income', 'Serviços', 'Limpeza de Pele Profunda', 150.00, '2024-07-15', 'esthetic'),
        ('income', 'Produtos', 'Venda de Vestido Midi Floral', 299.90, '2024-07-15', 'store'),
        ('expense', 'Material', 'Compra de produtos para limpeza facial', 85.50, '2024-07-14', 'esthetic'),
        ('expense', 'Estoque', 'Compra de novos produtos para loja', 1200.00, '2024-07-10', 'store')
      `);
      console.log('Entradas financeiras inseridas com sucesso!');
    } else {
      console.log('Entradas financeiras já existem, pulando inserção...');
    }

    // Verificar se já existe histórico de compras
    const purchaseHistoryCount = await query('SELECT COUNT(*) FROM purchase_history');
    if (parseInt(purchaseHistoryCount.rows[0].count) === 0) {
      // Inserir histórico de compras inicial
      await query(`
        INSERT INTO purchase_history (client_id, service_id, product_id, amount, date, type) VALUES
        (1, 1, NULL, 150.00, '2024-07-15', 'service'),
        (1, NULL, 1, 299.90, '2024-07-15', 'product'),
        (2, 2, NULL, 120.00, '2024-07-10', 'service'),
        (3, NULL, 3, 249.00, '2024-07-05', 'product'),
        (4, 3, NULL, 80.00, '2024-07-01', 'service')
      `);
      console.log('Histórico de compras inserido com sucesso!');
    } else {
      console.log('Histórico de compras já existe, pulando inserção...');
    }

    // Verificar se já existem agendamentos
    const appointmentCount = await query('SELECT COUNT(*) FROM appointments');
    if (parseInt(appointmentCount.rows[0].count) === 0) {
      // Inserir agendamentos iniciais (usando IDs fixos presumidos dos inserts anteriores)
      // Procedures: 1=Limpeza, 2=Massagem, 3=Depilação
      // Clients: 1=Maria, 2=Ana, 3=Carlos
      await query(`
        INSERT INTO appointments (client_id, procedure_id, professional_name, date, time, status, price) VALUES
        (1, 1, 'Dr. Ana Costa', CURRENT_DATE + INTERVAL '1 day', '10:00', 'upcoming', 150.00),
        (2, 2, 'Dr. Ana Costa', CURRENT_DATE + INTERVAL '5 days', '15:30', 'upcoming', 120.00),
        (3, 2, 'Carlos Silva', '2024-06-15', '14:00', 'completed', 120.00),
        (1, 3, 'Dr. Ana Costa', '2024-05-02', '11:00', 'completed', 80.00),
        (2, 2, 'Carlos Silva', '2024-04-20', '09:00', 'completed', 120.00)
      `);
      console.log('Agendamentos inseridos com sucesso!');
    } else {
      console.log('Agendamentos já existem, pulando inserção...');
    }

    console.log('Banco de dados populado com dados iniciais!');
  } catch (err) {
    console.error('Erro ao popular o banco de dados:', err);
  }
}

seedDatabase();