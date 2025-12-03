import app from './api/index';
import { connectDB } from './utils/db';

const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    // Conectar ao banco de dados
    await connectDB();
    
    // Iniciar o servidor
    app.listen(PORT, () => {
      console.log(`Servidor API rodando na porta ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
}

startServer();