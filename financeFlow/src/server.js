const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.json({ 
    message: 'FinanceFlow API está rodando com todas as dependências!',
    status: 'online',
    dependencies: [
      'express', 'cors', 'dotenv', 'jsonwebtoken', 
      'bcryptjs', 'sequelize', 'pg', 'swagger-ui-express', 'zod'
    ]
  });
});

// Exemplo de rota de autenticação (simulada)
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  // Aqui você usaria o bcryptjs para verificar a senha e o jsonwebtoken para gerar o token
  res.json({ message: 'Rota de login pronta para ser implementada!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse http://localhost:${PORT} para testar.`);
});
