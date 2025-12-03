# Implantação na Vercel

## Pré-requisitos

1. Conta na Vercel (https://vercel.com)
2. Projeto configurado no GitHub
3. Banco de dados Neon PostgreSQL configurado

## Passos para Implantação

### 1. Configurar o projeto na Vercel

1. Acesse o dashboard da Vercel
2. Clique em "New Project"
3. Importe o repositório do GitHub
4. Configure as variáveis de ambiente:
   - `DATABASE_URL` - String de conexão do Neon PostgreSQL

### 2. Configurar variáveis de ambiente

Na seção "Environment Variables" da Vercel, adicione:

```
DATABASE_URL=postgresql://neondb_owner:npg_TGFtNf2qguU8@ep-snowy-mountain-acffq02r-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
NODE_ENV=production
```

### 3. Configurar build settings

- Framework Preset: `Other`
- Build Command: `npm run build`
- Output Directory: `dist`

### 4. Deploy

Clique em "Deploy" e aguarde o processo de implantação.

## Configuração do Banco de Dados

O banco de dados já está configurado no Neon PostgreSQL com a seguinte string de conexão:

```
postgresql://neondb_owner:npg_TGFtNf2qguU8@ep-snowy-mountain-acffq02r-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

### Inicializar o banco de dados

Após o deploy, execute os seguintes comandos para inicializar o banco de dados:

```bash
npm run db:init
npm run db:seed
```

## Estrutura da API

A API está disponível em `/api/*` com os seguintes endpoints:

### Usuários
- `GET /api/users` - Lista todos os usuários
- `GET /api/users/email/:email` - Busca usuário por email
- `POST /api/users` - Cria um novo usuário

### Clientes
- `GET /api/clients` - Lista todos os clientes
- `GET /api/clients/:id` - Busca cliente por ID
- `POST /api/clients` - Cria um novo cliente

### Procedimentos
- `GET /api/procedures` - Lista todos os procedimentos
- `GET /api/procedures/:id` - Busca procedimento por ID
- `POST /api/procedures` - Cria um novo procedimento

### Produtos
- `GET /api/products` - Lista todos os produtos
- `GET /api/products/:id` - Busca produto por ID
- `POST /api/products` - Cria um novo produto

### Entradas Financeiras
- `GET /api/financial-entries` - Lista todas as entradas financeiras
- `GET /api/financial-entries/:id` - Busca entrada financeira por ID
- `POST /api/financial-entries` - Cria uma nova entrada financeira

### Histórico de Compras
- `GET /api/purchase-history` - Lista todo o histórico de compras
- `GET /api/purchase-history/client/:clientId` - Busca histórico de compras por cliente
- `POST /api/purchase-history` - Cria um novo registro no histórico de compras

## Health Check

Endpoint para verificar o status da API:
- `GET /api/health`

## Suporte

Em caso de problemas com a implantação, verifique:
1. As variáveis de ambiente estão configuradas corretamente
2. O banco de dados está acessível
3. As permissões do repositório estão corretas