const app = require('./src/server'); // Importa a configuração do Express
const PORT = 3000; // Define a porta manualmente (já que não temos .env)

// O método .listen() é o que efetivamente "abre" a porta para receber conexões
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
// USUARIO
// id (uuid)
// nome (string)
// email (Email <- value object)
// senha (Senha <- value object)
// cpf (CPF <- value object)
// criadoEm (Date)
//
// USUARIO
// id (uuid)
// nome (string)
// email (Email)
// senha (Senha)
// cpf (CPF)
// criadoEm (Date)
//
// Regras de negócio:
// - não pode ter dois usuários com o mesmo CPF (use case)
// - não pode ter dois usuários com o mesmo email (use case)

// CONTA
// id (uuid)
// usuarioId (uuid)
// nome (string)
// saldo (Dinheiro)
// tipo (string)
// criadoEm (Date)
//
// Regras de negócio:
// - tipo só pode ser 'corrente', 'poupanca' ou 'investimento'
// - saldo inicial não pode ser negativo
// - não pode ser deletada se ainda tiver saldo

// CATEGORIA
// id (uuid)
// usuarioId (uuid)
// nome (string)
// tipo (string)
// criadoEm (Date)
//
// Regras de negócio:
// - tipo só pode ser 'receita' ou 'despesa'
// - não pode ter duas categorias com o mesmo nome pro mesmo usuario (use case)

// TRANSACAO
// id (uuid)
// usuarioId (uuid)
// contaId (uuid)
// categoriaId (uuid)
// descricao (string)
// valor (Dinheiro)
// tipo (string)
// data (Date)
// criadoEm (Date)
//
// Regras de negócio:
// - tipo só pode ser 'receita' ou 'despesa'
// - tipo da transacao tem que bater com o tipo da categoria
// - não pode lançar transacao com data futura
// - receita soma no saldo, despesa subtrai

// ORCAMENTO
// id (uuid)
// usuarioId (uuid)
// categoriaId (uuid)
// valor (Dinheiro)
// periodo (Periodo)
// totalGasto (Dinheiro)
// criadoEm (Date)
//
// Regras de negócio:
// - valor tem que ser maior que zero
// - não pode criar dois orçamentos pra mesma categoria no mesmo periodo (use case)
// - ao ultrapassar 90% do valor dispara OrcamentoExcedidoEvent
// - ao ultrapassar 100% lança erro