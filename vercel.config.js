module.exports = {
  // Configuração do ambiente
  env: {
    NODE_ENV: 'production',
  },
  
  // Configuração do build
  build: {
    env: {
      DATABASE_URL: process.env.DATABASE_URL,
    },
  },
  
  // Redirecionamentos
  redirects: [
    {
      source: '/',
      destination: '/dashboard',
      permanent: false,
    },
  ],
  
  // Cabeçalhos de segurança
  headers: [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
      ],
    },
  ],
};