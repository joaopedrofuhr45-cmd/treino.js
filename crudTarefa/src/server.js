const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const app = express();
app.use(express.json());

// --- CONFIGURAÇÃO DO SWAGGER ---
// Vamos criar o arquivo swagger.yaml em seguida
try {
    const swaggerDocument = YAML.load(path.join(__dirname, 'infrastructure/http/docs/swagger.yaml'));
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    console.log('📖 Documentação Swagger disponível em http://localhost:3000/api-docs');
} catch (e) {
    console.warn('⚠️ Não foi possível carregar a documentação Swagger:', e.message);
}

// --- INJEÇÃO DE DEPENDÊNCIAS ---
const { tarefaController, usuarioController } = require('./infrastructure/config/container');

// --- ROTAS ---
const tarefaRoutes  = require('./infrastructure/http/routes/tarefa/tarefaRoutes');
const usuarioRoutes = require('./infrastructure/http/routes/usuario/usuarioRoutes');

app.use('/tarefas',  tarefaRoutes(tarefaController));
app.use('/usuarios', usuarioRoutes(usuarioController));

// Rota raiz para facilitar o teste
app.get('/', (req, res) => {
    res.json({
        mensagem: "Bem-vindo à API de Tarefas!",
        documentacao: "/api-docs"
    });
});

// --- MIDDLEWARE GLOBAL DE ERRO ---
// Deve ser o ÚLTIMO middleware a ser registrado
const errorHandler = require('./infrastructure/http/middlewares/global/errorHandler');
app.use(errorHandler);

module.exports = app;
