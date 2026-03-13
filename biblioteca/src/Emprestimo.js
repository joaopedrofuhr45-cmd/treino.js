export default class Emprestimo {
    #livro
    #usuario
    #dataEmprestimo
    #dataDevolucao

    static DIAS_EMPRESTIMO = 14
    static MULTA_POR_DIA = 1.50

    constructor(livro, usuario) {
        this.#livro = livro
        this.#usuario = usuario
    }

    static async criar(livro, usuario) {
        if (!livro.disponivel)
            throw new Error(`O livro "${livro.titulo}" não está disponível`)
        const emprestimo = new Emprestimo(livro, usuario)
        await emprestimo._inicializar()
        return emprestimo
    }

    async _inicializar() {
        this.#dataEmprestimo = new Date()
        this.#dataDevolucao = new Date()
        this.#dataDevolucao.setDate(
            this.#dataDevolucao.getDate() + Emprestimo.DIAS_EMPRESTIMO
        )
    }

    calcularMulta() {
        const hoje = new Date()
        if (hoje <= this.#dataDevolucao) return 0
        const diasAtraso = Math.ceil(
            (hoje - this.#dataDevolucao) / (1000 * 60 * 60 * 24)
        )
        return diasAtraso * Emprestimo.MULTA_POR_DIA
    }

    get livro() { return this.#livro }
    get usuario() { return this.#usuario }
    get dataEmprestimo() { return this.#dataEmprestimo }
    get dataDevolucao() { return this.#dataDevolucao }
}