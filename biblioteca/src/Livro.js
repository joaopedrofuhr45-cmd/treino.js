import { ValidadorBiblioteca } from './ValidadorBiblioteca.js'

export default class Livro {
    #bancoDeDados
    #titulo
    #isbn
    #autor
    #disponivel

    constructor(bancoDeDados) {
        this.#bancoDeDados = bancoDeDados
    }

    static async criar(bancoDeDados, dadosDoLivro) {
        const livro = new Livro(bancoDeDados)
        await livro._inicializar(dadosDoLivro)
        return livro
    }

    async _inicializar(dadosDoLivro) {
        await this.definirTitulo(dadosDoLivro.titulo)
    }

    async definirTitulo(titulo) {
        ValidadorBiblioteca.titulo(titulo)
        const livro = await this.#bancoDeDados(titulo)
        if (!livro) throw new Error("Não temos essa obra aqui")
        this.#titulo = livro.titulo
        this.#autor = livro.autor
        this.#isbn = livro.isbn
        this.#disponivel = livro.disponivel
    }

    get titulo() { return this.#titulo }
    get autor() { return this.#autor }
    get isbn() { return this.#isbn }
    get disponivel() { return this.#disponivel }
}