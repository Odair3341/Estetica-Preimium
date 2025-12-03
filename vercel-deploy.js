// Arquivo de configuração para implantação na Vercel

module.exports = {
  version: 2,
  builds: [
    {
      src: 'package.json',
      use: '@vercel/node',
      config: {
        includeFiles: ['dist/**', 'src/**']
      }
    }
  ],
  routes: [
    // Rotas da API
    {
      src: '/api/(.*)',
      dest: '/src/server.ts'
    },
    // Rotas da aplicação frontend
    {
      src: '/(.*)',
      dest: '/dist/$1'
    }
  ],
  env: {
    // Variáveis de ambiente necessárias
    DATABASE_URL: '@database_url',
    NODE_ENV: 'production'
  }
};