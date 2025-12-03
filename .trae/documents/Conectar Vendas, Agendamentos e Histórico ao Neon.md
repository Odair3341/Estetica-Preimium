## Visão Geral
- Hoje, ao finalizar a venda no Carrinho, os itens são gravados na tabela `purchase_history` do Neon via API (`src/api/index.ts:227`).
- Não há criação automática de agendamento; a tabela `appointments` existe, mas a API/Frontend ainda não vinculam vendas a agendamentos.
- A UI para ver o histórico por cliente não está conectada ao banco (a página `Management.tsx` usa constantes locais e não consulta a API).

## O que aparece “do lado”
- O painel visto na captura é a **Vercel Toolbar** (overlay de desenvolvimento). Ele não altera a lógica de vendas; serve para logs, branches e atalhos.
- Em `src/api/index.ts:4` o `query` é um helper para executar SQL direto (ex.: `/api/clients/search` em `src/api/index.ts:73`).

## Onde vai a venda
- Cada item do carrinho é persistido em `purchase_history` com `client_id`, `amount`, `date`, e `type` (produto/serviço) (`src/utils/db.ts:144-150`).
- Endpoints já disponíveis:
  - `GET /api/purchase-history` (`src/api/index.ts:209`) – lista geral
  - `GET /api/purchase-history/client/:clientId` (`src/api/index.ts:218`) – por cliente
  - `POST /api/purchase-history` (`src/api/index.ts:227`) – cria registros

## Plano de Conexão Completa
### 1) Histórico por Cliente (Frontend + API)
- Criar uma **Página de Detalhe do Cliente** (ou integrar na `Management.tsx`) que:
  - Busca o cliente em `GET /api/clients/:id` (`src/api/index.ts:90`).
  - Lista compras em `GET /api/purchase-history/client/:id` (`src/api/index.ts:218`).
  - Mostra totais e últimos itens, com filtros por período.
- Atualizar `Management.tsx` para **parar de usar constantes** e consumir a API real (`/api/clients`, `/api/products`, `/api/procedures`).

### 2) Vendas → Agendamento (Serviços)
- Backend: adicionar endpoints de **agendamentos**:
  - `GET /api/appointments` e `GET /api/appointments/client/:id`.
  - `POST /api/appointments` para criar agendamento com `client_id`, `procedure_id`, `professional_name`, `date`, `time`, `price`, `status`.
- Frontend (Carrinho):
  - Se houver serviço no carrinho, exibir opção **“Criar agendamento”** com campos `data`, `hora`, `profissional` e `status`.
  - Ao finalizar, além de `POST /api/purchase-history`, enviar `POST /api/appointments` para cada serviço.
  - Após sucesso, mostrar link para **Agenda**.

### 3) Loja totalmente conectada
- `Store.tsx`: manter procedimentos via API (`GET /api/procedures`, já implementado em `Store.tsx:37`).
- Conectar **produtos** à API (`GET /api/products`, `src/api/index.ts:145`), substituindo `PRODUCTS` constantes.

### 4) Agenda e Dashboard
- `Schedule.tsx`/`Booking*`: consumir `GET /api/appointments` em vez de constantes, com filtros por status.
- `Dashboard.tsx`: mostrar KPIs reais: total de vendas (de `purchase_history`), próximos agendamentos (de `appointments`), receita por período.

### 5) Financeiro
- `Finance.tsx`: carregar `GET /api/financial-entries` (`src/api/index.ts:177`) e permitir criação (`POST /api/financial-entries`, `src/api/index.ts:199`).

## Critérios de Aceite
- Ao vender um **serviço** e marcar “Criar agendamento”, deve aparecer na página Agenda e vinculado ao cliente.
- A página de Cliente mostra **histórico de compras real** (do Neon), com totals e últimos itens.
- A Loja e Gestão usam **dados da API**, sem constantes locais.

## Verificação
- Testar `GET http://localhost:3001/api/purchase-history/client/:id` para confirmar os registros da venda.
- Testar novo `POST /api/appointments` e `GET /api/appointments/client/:id` após a implementação para verificar agendamentos criados.

Confirma que posso executar este plano para conectar vendas, agendamentos e histórico ao Neon e ajustar a UI para visualização completa?