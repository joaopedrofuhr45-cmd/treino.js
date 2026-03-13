import { ValidadorBiblioteca } from './ValidadorBiblioteca.js'

export default class Usuario {
    #bancoDeDados
    #cpf
    #nome
    #emprestimosAtivos

    constructor(bancoDeDados) {
        this.#bancoDeDados = bancoDeDados
    }

    static async criar(bancoDeDados, dadosDoUsuario) {
        const usuario = new Usuario(bancoDeDados)
        await usuario._inicializar(dadosDoUsuario)
        return usuario
    }

    async _inicializar(dadosDoUsuario) {
        await this.definirCpf(dadosDoUsuario.cpf)
    }

    async definirCpf(cpf) {
        ValidadorBiblioteca.nome(cpf)
        const usuario = await this.#bancoDeDados(cpf)
        if (!usuario) throw new Error("Usuário não encontrado")
        this.#cpf = usuario.cpf
        this.#nome = usuario.nome
        this.#emprestimosAtivos = usuario.emprestimosAtivos
    }

    get cpf() { return this.#cpf }
    get nome() { return this.#nome }
    get emprestimosAtivos() { return this.#emprestimosAtivos }
}