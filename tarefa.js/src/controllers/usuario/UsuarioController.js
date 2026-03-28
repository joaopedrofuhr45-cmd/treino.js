class UsuarioController {
    #criarUsuario
    #deletarUsuario
    #buscarUsuario


    constructor(criarUsuario, deletarUsuario, buscarUsuario) {
        this.criarUsuario = criarUsuario
        this.#deletarUsuario = deletarUsuario
        this.#buscarUsuario = buscarUsuario
    }

    async criar(req, res) {
        try {
            const usuario = await this.criarUsuario.executar(req.body)
            res.status(201).json(usuario)
        }
        catch (erro) {
            res.status(400).json({ erro: erro.message })
        }
    }

    async buscar(req, res) {
        try {
            const usuario = await this.#buscarUsuario.executar(req.params.id)
            res.json(usuario.dados
            )
        }
        catch (erro) {
            res.status(404).json({ erro: erro.message })
        }
    }

    async deletar(req, res) {
        try {
            await this.#deletarUsuario.executar(req.params.id)
            res.status(204).send()
        }
        catch (erro) {
            res.status(400).json({ erro: erro.message })
        }
    }
}

module.exports = UsuarioController