const app = require('./src/server'); // Importa a configuração do Express
const PORT = 3000; // Define a porta manualmente (já que não temos .env)

// O método .listen() é o que efetivamente "abre" a porta para receber conexões
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
