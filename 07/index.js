// ===============================================
// FETCH — substitui o array falso por uma API real
// Em vez de .find() no array, faz requisição HTTP
// ===============================================

const API_URL = 'https://api.biblioteca.com'

// busca um livro pelo título na API
// retorna: { titulo, autor, isbn, disponivel }
async function buscarLivro(titulo) {
    const resposta = await fetch(`${API_URL}/livros?titulo=${titulo}`) // faz a requisição GET
    if (!resposta.ok) throw new Error("Erro ao buscar livro na API") // verifica se deu erro
    return await resposta.json() // converte JSON para objeto JS
}

// busca um usuário pelo CPF na API
// retorna: { cpf, nome, emprestimosAtivos }
async function buscarUsuario(cpf) {
    const resposta = await fetch(`${API_URL}/usuarios?cpf=${cpf}`) // faz a requisição GET
    if (!resposta.ok) throw new Error("Erro ao buscar usuário na API") // verifica se deu erro
    return await resposta.json() // converte JSON para objeto JS
}

// ===============================================
// VALIDADORES — validam dados que vêm do usuário
// dados que vêm do banco já são confiáveis
// ===============================================
class ValidadorBiblioteca {
    static titulo(titulo) { // chamado em Livro.definirTitulo()
        if (!titulo || typeof titulo !== 'string' || titulo.trim() === '')
            throw new Error("Título inválido")
    }

    static nome(valor) { // chamado em Usuario.definirCpf()
        if (!valor || typeof valor !== 'string' || valor.trim() === '')
            throw new Error("Nome inválido")
    }
}

// ===============================================
// LIVRO — busca os dados no banco pelo título
// ===============================================
class Livro {
    #bancoDeDados  // recebe a função buscarLivro() — não é mais um array
    #titulo
    #isbn
    #autor
    #disponivel

    constructor(bancoDeDados) {
        this.#bancoDeDados = bancoDeDados // guarda a função buscarLivro
    }

    // ponto de entrada — cria e retorna o objeto Livro pronto
    static async criar(bancoDeDados, dadosDoLivro) {
        const livro = new Livro(bancoDeDados) // cria objeto vazio com a função buscarLivro
        await livro._inicializar(dadosDoLivro) // preenche os campos
        return livro // retorna o objeto pronto
    }

    // chama definirTitulo() que puxa todos os dados do banco de uma vez
    async _inicializar(dadosDoLivro) {
        await this.definirTitulo(dadosDoLivro.titulo) // chama definirTitulo() abaixo
    }

    // valida o título e busca todos os dados do livro via buscarLivro()
    async definirTitulo(titulo) {
        ValidadorBiblioteca.titulo(titulo) // valida o título — vem do usuário

        // chama a função buscarLivro() que está guardada em this.#bancoDeDados
        // ANTES com array: this.#bancoDeDados.find(r => r.titulo === titulo)
        // AGORA com fetch: chama buscarLivro(titulo) que vai na API
        const livro = await this.#bancoDeDados(titulo)

        if (!livro) throw new Error("Não temos essa obra aqui")
        this.#titulo = livro.titulo       // vem do banco — confiável
        this.#autor = livro.autor         // vem do banco — confiável
        this.#isbn = livro.isbn           // vem do banco — confiável
        this.#disponivel = livro.disponivel // vem do banco — confiável
    }

    get titulo() { return this.#titulo }
    get autor() { return this.#autor }
    get isbn() { return this.#isbn }
    get disponivel() { return this.#disponivel }
}

// ===============================================
// USUARIO — busca os dados no banco pelo CPF
// ===============================================
class Usuario {
    #bancoDeDados  // recebe a função buscarUsuario() — não é mais um array
    #cpf
    #nome
    #emprestimosAtivos

    constructor(bancoDeDados) {
        this.#bancoDeDados = bancoDeDados // guarda a função buscarUsuario
    }

    // ponto de entrada — cria e retorna o objeto Usuario pronto
    static async criar(bancoDeDados, dadosDoUsuario) {
        const usuario = new Usuario(bancoDeDados) // cria objeto vazio com a função buscarUsuario
        await usuario._inicializar(dadosDoUsuario) // preenche os campos
        return usuario // retorna o objeto pronto
    }

    // chama definirCpf() que puxa todos os dados do banco de uma vez
    async _inicializar(dadosDoUsuario) {
        await this.definirCpf(dadosDoUsuario.cpf) // chama definirCpf() abaixo
    }

    // valida o CPF e busca todos os dados do usuário via buscarUsuario()
    async definirCpf(cpf) {
        ValidadorBiblioteca.nome(cpf) // valida o CPF — vem do usuário

        // chama a função buscarUsuario() que está guardada em this.#bancoDeDados
        // ANTES com array: this.#bancoDeDados.find(r => r.cpf === cpf)
        // AGORA com fetch: chama buscarUsuario(cpf) que vai na API
        const usuario = await this.#bancoDeDados(cpf)

        if (!usuario) throw new Error("Usuário não encontrado")
        this.#cpf = usuario.cpf                         // vem do banco — confiável
        this.#nome = usuario.nome                       // vem do banco — confiável
        this.#emprestimosAtivos = usuario.emprestimosAtivos // vem do banco — confiável
    }

    get cpf() { return this.#cpf }
    get nome() { return this.#nome }
    get emprestimosAtivos() { return this.#emprestimosAtivos }
}

// ===============================================
// EMPRESTIMO — recebe Livro e Usuario já prontos
// não busca nada no banco — só calcula datas e multa
// ===============================================
class Emprestimo {
    #livro          // objeto Livro retornado por Livro.criar()
    #usuario        // objeto Usuario retornado por Usuario.criar()
    #dataEmprestimo
    #dataDevolucao

    static DIAS_EMPRESTIMO = 14   // prazo fixo de empréstimo
    static MULTA_POR_DIA = 1.50  // R$1,50 por dia de atraso

    constructor(livro, usuario) {
        this.#livro = livro       // guarda o objeto Livro pronto
        this.#usuario = usuario   // guarda o objeto Usuario pronto
    }

    // ponto de entrada — valida disponibilidade e cria o empréstimo
    static async criar(livro, usuario) {
        // acessa livro.disponivel via get de Livro
        if (!livro.disponivel)
            throw new Error(`O livro "${livro.titulo}" não está disponível`)
        const emprestimo = new Emprestimo(livro, usuario) // passa os objetos prontos
        await emprestimo._inicializar() // calcula as datas
        return emprestimo
    }

    // calcula e define as datas do empréstimo
    async _inicializar() {
        this.#dataEmprestimo = new Date() // hoje
        this.#dataDevolucao = new Date()
        this.#dataDevolucao.setDate(
            this.#dataDevolucao.getDate() + Emprestimo.DIAS_EMPRESTIMO // hoje + 14 dias
        )
    }

    // calcula a multa baseado nos dias de atraso
    calcularMulta() {
        const hoje = new Date()
        if (hoje <= this.#dataDevolucao) return 0 // sem atraso, sem multa
        const diasAtraso = Math.ceil(
            (hoje - this.#dataDevolucao) / (1000 * 60 * 60 * 24) // converte ms para dias
        )
        return diasAtraso * Emprestimo.MULTA_POR_DIA // dias de atraso × R$1,50
    }

    get livro() { return this.#livro }       // retorna o objeto Livro inteiro
    get usuario() { return this.#usuario }   // retorna o objeto Usuario inteiro
    get dataEmprestimo() { return this.#dataEmprestimo }
    get dataDevolucao() { return this.#dataDevolucao }
}

// ===============================================
// BIBLIOTECA — orquestra tudo
// cria Livro, Usuario e Emprestimo, gerencia a lista
// ===============================================
class Biblioteca {
    #buscarLivro    // função buscarLivro() — passada no constructor
    #buscarUsuario  // função buscarUsuario() — passada no constructor
    #emprestimos = [] // lista de empréstimos ativos

    constructor(buscarLivro, buscarUsuario) {
        this.#buscarLivro = buscarLivro     // guarda a função buscarLivro
        this.#buscarUsuario = buscarUsuario // guarda a função buscarUsuario
    }

    async emprestar(tituloDoLivro, cpfDoUsuario) {
        // passa this.#buscarLivro pra Livro.criar() — ela usa pra buscar na API
        const livro = await Livro.criar(this.#buscarLivro, { titulo: tituloDoLivro })

        // passa this.#buscarUsuario pra Usuario.criar() — ela usa pra buscar na API
        const usuario = await Usuario.criar(this.#buscarUsuario, { cpf: cpfDoUsuario })

        // passa os objetos livro e usuario prontos pra Emprestimo.criar()
        const emprestimo = await Emprestimo.criar(livro, usuario)

        this.#emprestimos.push(emprestimo) // salva na lista de empréstimos ativos
        console.log(`"${livro.titulo}" emprestado para ${usuario.nome}. Devolução até ${emprestimo.dataDevolucao.toLocaleDateString()}`)
        return emprestimo
    }

    async devolver(emprestimo) {
        const multa = emprestimo.calcularMulta() // chama calcularMulta() de Emprestimo
        this.#emprestimos = this.#emprestimos.filter(e => e !== emprestimo) // remove da lista
        if (multa > 0) {
            console.log(`Livro devolvido com atraso. Multa: R$${multa.toFixed(2)}`)
        } else {
            console.log(`Livro "${emprestimo.livro.titulo}" devolvido no prazo!`) // acessa livro via get
        }
    }

    get emprestimos() { return this.#emprestimos }
}

// ===============================================
// USO — como instanciar e usar a biblioteca
// ===============================================

// passa as funções fetch no constructor — a biblioteca distribui pra cada classe
const biblioteca = new Biblioteca(buscarLivro, buscarUsuario)

// emprestar: Biblioteca → Livro.criar() → buscarLivro() → API
//                       → Usuario.criar() → buscarUsuario() → API
//                       → Emprestimo.criar(livro, usuario)
await biblioteca.emprestar("Clean Code", "123.456.789-09")

// devolver: acessa emprestimo.calcularMulta() e remove da lista
const emprestimo = biblioteca.emprestimos[0]
await biblioteca.devolver(emprestimo)