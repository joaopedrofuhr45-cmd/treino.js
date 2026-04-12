import { UsuarioNaoEncontradoError } from '../../domain/errors/usuario/usuarioErro.js'

export class DeletarUsuarioUseCase {
    #repository

    constructor(repository) {
        this.#repository = repository
    }

    async execute({ id }) {
        const usuario = await this.#repository.buscarPorId(id)
        if (!usuario) throw new UsuarioNaoEncontradoError()
        await this.#repository.deletar(id)
    }
}