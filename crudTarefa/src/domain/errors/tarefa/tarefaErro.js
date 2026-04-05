const AppError = require('../appError');

class TarefaErro extends AppError {
    constructor(mensagem = "Tarefa não encontrada", statusCode = 404) {
        super(mensagem, statusCode);
    }
}

module.exports = TarefaErro;
