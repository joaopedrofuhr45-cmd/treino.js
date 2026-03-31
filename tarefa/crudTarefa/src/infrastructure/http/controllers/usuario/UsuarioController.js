class UsuarioController {
    #criarUsuario;
    #deletarUsuario;
    #buscarUsuario;

    constructor({ criarUsuario, deletarUsuario, buscarUsuario }) {
        this.#criarUsuario   = criarUsuario;
        this.#deletarUsuario = deletarUsuario;
        this.#buscarUsuario  = buscarUsuario;
    }

    async criar(req, res, next) {
        try {
            const usuario = await this.#criarUsuario.executar(req.body);
            res.status(201).json(usuario);
        } catch (erro) {
            next(erro);
        }
    }

    async buscar(req, res, next) {
        try {
            const usuario = await this.#buscarUsuario.executar(req.params.id);
            // Corrigido: Agora acessa o getter .dados que adicionamos na entidade Usuario
            res.json(usuario.dados);
        } catch (erro) {
            next(erro);
        }
    }

    async deletar(req, res, next) {
        try {
            await this.#deletarUsuario.executar(req.params.id);
            res.status(204).send();
        } catch (erro) {
            next(erro);
        }
    }

    // Adicionado para evitar erro na rota GET /usuarios
    async listar(req, res, next) {
        try {
            // Como não temos um ListarUsuariosUseCase injetado, vamos retornar uma mensagem simples
            // ou você pode implementar o UseCase e injetar aqui depois.
            res.status(501).json({ erro: "Listagem de usuários não implementada" });
        } catch (erro) {
            next(erro);
        }
    }
}

module.exports = UsuarioController;
