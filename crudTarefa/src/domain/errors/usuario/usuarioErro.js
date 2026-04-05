const AppError = require('../appError');

class UsuarioErro extends AppError {
    constructor(mensagem = "Usuário não encontrado", statusCode = 404) {
        super(mensagem, statusCode);
    }
}

module.exports = UsuarioErro;
