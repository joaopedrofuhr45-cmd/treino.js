import { Usuario } from '../../domain/entities/usuario/usuario.js'
import { UsuarioJaExisteError } from '../../domain/errors/usuario/usuarioErro.js'

export class CriarUsuarioUseCase {
    #repository

    constructor(repository) {
        this.#repository = repository
    }

    async execute({ nome, email, senha, cpf }) {
        // 1. verifica no banco
        const [emailExistente, cpfExistente] = await Promise.all([
            this.#repository.buscarPorEmail(email),
            this.#repository.buscarPorCpf(cpf)
        ])

        if (emailExistente || cpfExistente) throw new UsuarioJaExisteError()

        // 2. cria a entidade
        const usuario = new Usuario({ nome, email, senha, cpf })

        // 3. salva
        await this.#repository.salvar(usuario)

        // 4. retorna
        return usuario
    }
}