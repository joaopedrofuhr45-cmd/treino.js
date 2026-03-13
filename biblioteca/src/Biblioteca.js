import Livro from './Livro.js'
import Usuario from './Usuario.js'
import Emprestimo from './Emprestimo.js'

export default class Biblioteca {
    #buscarLivro
    #buscarUsuario
    #emprestimos = []

    constructor(buscarLivro, buscarUsuario) {
        this.#buscarLivro = buscarLivro
        this.#buscarUsuario = buscarUsuario
    }

    async emprestar(tituloDoLivro, cpfDoUsuario) {
        const livro = await Livro.criar(this.#buscarLivro, { titulo: tituloDoLivro })
        const usuario = await Usuario.criar(this.#buscarUsuario, { cpf: cpfDoUsuario })
        const emprestimo = await Emprestimo.criar(livro, usuario)
        this.#emprestimos.push(emprestimo)
        console.log(`"${livro.titulo}" emprestado para ${usuario.nome}. Devolução até ${emprestimo.dataDevolucao.toLocaleDateString()}`)
        return emprestimo
    }

    async devolver(emprestimo) {
        const multa = emprestimo.calcularMulta()
        this.#emprestimos = this.#emprestimos.filter(e => e !== emprestimo)
        if (multa > 0) {
            console.log(`Livro devolvido com atraso. Multa: R$${multa.toFixed(2)}`)
        } else {
            console.log(`Livro "${emprestimo.livro.titulo}" devolvido no prazo!`)
        }
    }

    get emprestimos() { return this.#emprestimos }
}