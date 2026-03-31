const Usuario = require('../../../domain/entities/usuario/usuario');

class CriarUsuarioUseCase {
    #repository;

    constructor(repository) {
        this.#repository = repository;
    }

    async executar({ nome, email, senha }) {
        const usuario = new Usuario(
            Math.random().toString(36).slice(2),
            nome,
            email,
            senha
        );

        await this.#repository.salvar(usuario);
        return usuario.dados;
    }
}

module.exports = CriarUsuarioUseCase;
