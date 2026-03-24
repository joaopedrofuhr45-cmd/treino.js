// ============================================================
// ANTES: Livro buscava dados da API dentro de si mesmo
//        → misturava responsabilidade de domínio com infra
//
// DEPOIS: Livro só existe como entidade rica com comportamento
//         → quem busca na API é o Repository
// ============================================================


// ══════════════════════════════════════════════════════════════
// CAMADA DE VALIDAÇÃO
// Valida dados que vêm do USUÁRIO (não do banco — esses já são confiáveis)
// ══════════════════════════════════════════════════════════════

class ValidadorBiblioteca {

    // ANTES: static nome(valor) — nome errado, validava CPF
    // DEPOIS: nome correto, validação mais robusta
    static titulo(titulo) {
        if (!titulo || typeof titulo !== 'string' || titulo.trim() === '')
            throw new Error("Título inválido")
    }

    static cpf(cpf) {
        // ANTES: static nome() — validava CPF com nome errado
        // DEPOIS: renomeado para o que realmente é
        if (!cpf || typeof cpf !== 'string' || cpf.trim() === '')
            throw new Error("CPF inválido")
    }
}


// ══════════════════════════════════════════════════════════════
// CAMADA DE DOMÍNIO — entidades ricas com comportamento
// Não sabem nada de API, fetch ou banco de dados
// ══════════════════════════════════════════════════════════════

// ── LIVRO ────────────────────────────────────────────────────
// ANTES: buscava dados da API internamente via this.#bancoDeDados
//        tinha factory static async criar() que chamava fetch
//        não tinha comportamento — só getters
//
// DEPOIS: recebe dados prontos via constructor
//         controla seu próprio estado de disponibilidade
//         tem métodos que representam ações reais do domínio
// ─────────────────────────────────────────────────────────────
class Livro {
    #titulo
    #autor
    #isbn
    #disponivel

    // DEPOIS: constructor recebe dados já mapeados — não faz fetch
    constructor({ titulo, autor, isbn, disponivel }) {
        this.#titulo    = titulo
        this.#autor     = autor
        this.#isbn      = isbn
        this.#disponivel = disponivel
    }

    // ✅ NOVO — comportamento: o livro controla sua disponibilidade
    indisponibilizar() {
        if (!this.#disponivel)
            throw new Error(`"${this.#titulo}" já está indisponível`)
        this.#disponivel = false
    }

    // ✅ NOVO — comportamento: reverso de indisponibilizar()
    disponibilizar() {
        this.#disponivel = true
    }

    // ✅ NOVO — regra do domínio fica no dono dela
    // ANTES: if (livro.disponivel) em Emprestimo.criar() e Biblioteca
    // DEPOIS: livro.estaDisponivel() — o livro responde sobre si mesmo
    estaDisponivel() {
        return this.#disponivel
    }

    get titulo()    { return this.#titulo }
    get autor()     { return this.#autor }
    get isbn()      { return this.#isbn }
    // DEPOIS: removemos get disponivel — use estaDisponivel() para ler estado
}


// ── USUARIO ──────────────────────────────────────────────────
// ANTES: buscava dados da API internamente via this.#bancoDeDados
//        não sabia quantos livros podia pegar — a Biblioteca decidia
//        emprestimosAtivos era só um número vindo do banco
//
// DEPOIS: recebe dados prontos, gerencia sua lista de empréstimos
//         sabe por si mesmo se pode pegar mais livros
// ─────────────────────────────────────────────────────────────
class Usuario {
    #cpf
    #nome
    #emprestimos = []

    // Constante de negócio fica na entidade dona da regra
    static LIMITE_EMPRESTIMOS = 3

    // DEPOIS: constructor recebe dados já mapeados — não faz fetch
    constructor({ cpf, nome }) {
        this.#cpf  = cpf
        this.#nome = nome
    }

    // ✅ NOVO — regra de negócio dentro da entidade
    // ANTES: if (usuario.emprestimosAtivos >= 3) em Biblioteca.emprestar()
    // DEPOIS: usuario.podePegarLivro() — o usuário responde sobre si mesmo
    podePegarLivro() {
        return this.#emprestimos.length < Usuario.LIMITE_EMPRESTIMOS
    }

    // ✅ NOVO — comportamento: o usuário controla sua lista
    adicionarEmprestimo(emprestimo) {
        if (!this.podePegarLivro())
            throw new Error(`${this.#nome} atingiu o limite de ${Usuario.LIMITE_EMPRESTIMOS} empréstimos`)
        this.#emprestimos.push(emprestimo)
    }

    // ✅ NOVO — comportamento: remove ao devolver
    removerEmprestimo(emprestimo) {
        this.#emprestimos = this.#emprestimos.filter(e => e !== emprestimo)
    }

    get cpf()        { return this.#cpf }
    get nome()       { return this.#nome }
    get emprestimos() { return [...this.#emprestimos] } // cópia — não expõe o array real
}


// ── EMPRESTIMO ───────────────────────────────────────────────
// ANTES: não se devolvia a si mesmo — Biblioteca.devolver() fazia tudo
//        Emprestimo.criar() era factory async desnecessária para calcular data
//        não tinha estado próprio (devolvido: true/false)
//
// DEPOIS: Emprestimo é quem devolve a si mesmo
//         age sobre Livro e Usuario na criação e na devolução
//         controla seu próprio ciclo de vida
// ─────────────────────────────────────────────────────────────
class Emprestimo {
    #livro
    #usuario
    #dataEmprestimo
    #dataDevolucao
    #devolvido = false   // ✅ NOVO — estado próprio

    static DIAS_EMPRESTIMO = 14
    static MULTA_POR_DIA  = 1.50

    constructor(livro, usuario) {
        // ✅ REGRAS DE NEGÓCIO nas entidades, não aqui
        // Emprestimo não verifica — ele delega para quem sabe
        if (!livro.estaDisponivel())
            throw new Error(`"${livro.titulo}" não está disponível`)
        if (!usuario.podePegarLivro())
            throw new Error(`${usuario.nome} atingiu o limite de empréstimos`)

        this.#livro    = livro
        this.#usuario  = usuario

        // Datas calculadas aqui mesmo — sem precisar de factory async
        // ANTES: static async criar() só para isso — complexidade desnecessária
        this.#dataEmprestimo = new Date()
        this.#dataDevolucao  = new Date()
        this.#dataDevolucao.setDate(
            this.#dataDevolucao.getDate() + Emprestimo.DIAS_EMPRESTIMO
        )

        // ✅ NOVO — Emprestimo age sobre Livro e Usuario ao ser criado
        // ANTES: Biblioteca.emprestar() fazia isso manualmente
        livro.indisponibilizar()
        usuario.adicionarEmprestimo(this)
    }

    // ✅ NOVO — ação real do domínio: devolver mora no empréstimo
    // ANTES: Biblioteca.devolver() chamava calcularMulta() e removia da lista
    // DEPOIS: emprestimo.devolver() age sobre si mesmo, livro e usuário
    devolver() {
        if (this.#devolvido)
            throw new Error('Este empréstimo já foi encerrado')
        this.#devolvido = true
        this.#livro.disponibilizar()              // avisa o livro
        this.#usuario.removerEmprestimo(this)     // avisa o usuário
    }

    calcularMulta() {
        const hoje = new Date()
        if (hoje <= this.#dataDevolucao) return 0
        const diasAtraso = Math.ceil(
            (hoje - this.#dataDevolucao) / (1000 * 60 * 60 * 24)
        )
        return diasAtraso * Emprestimo.MULTA_POR_DIA
    }

    // ✅ NOVO — estado próprio consultável
    estaAtivo()       { return !this.#devolvido }

    get livro()         { return this.#livro }
    get usuario()       { return this.#usuario }
    get dataEmprestimo(){ return this.#dataEmprestimo }
    get dataDevolucao() { return this.#dataDevolucao }
}


// ══════════════════════════════════════════════════════════════
// CAMADA DE MAPPER — converte JSON da API → objeto do domínio
//
// ANTES: Livro e Usuario recebiam o JSON da API diretamente
//        e mapeavam campo por campo dentro de definirTitulo() / definirCpf()
//        se a API mudasse um nome de campo, você caçava o bug nas entidades
//
// DEPOIS: um lugar só para adaptar o formato da API ao domínio
//         se a API mudar, só o Mapper muda — as entidades não sabem
// ══════════════════════════════════════════════════════════════

class LivroMapper {
    // Converte resposta da API → Livro do domínio
    static fromApi(json) {
        return new Livro({
            titulo:     json.titulo,
            autor:      json.autor,
            isbn:       json.isbn,
            disponivel: json.disponivel
        })
        // Exemplo: se a API mudar para json.book_title, muda SÓ AQUI
    }
}

class UsuarioMapper {
    // Converte resposta da API → Usuario do domínio
    static fromApi(json) {
        return new Usuario({
            cpf:  json.cpf,
            nome: json.nome
            // emprestimosAtivos vindo da API é ignorado aqui:
            // o domínio rastreia os empréstimos como objetos reais,
            // não como um número. O banco seria sincronizado em produção.
        })
    }
}


// ══════════════════════════════════════════════════════════════
// CAMADA DE REPOSITÓRIO — abstrai onde os dados vivem
//
// ANTES: Livro e Usuario recebiam a função fetch direto no constructor
//        a entidade sabia que existia uma API — mistura de camadas
//
// DEPOIS: a interface define o contrato ("o que fazer")
//         a implementação define os detalhes ("como fazer")
//         os Use Cases dependem da interface — não da API real
// ══════════════════════════════════════════════════════════════

// ── Interfaces (contrato) ────────────────────────────────────
// Em JS não existe interface nativa, então simulamos com classes abstratas
class LivroRepository {
    async buscarPorTitulo(titulo) { throw new Error('Não implementado') }
}

class UsuarioRepository {
    async buscarPorCpf(cpf) { throw new Error('Não implementado') }
}

// ── Implementações reais (infra) ─────────────────────────────
// Estas são as únicas classes que sabem que existe uma API
class LivroApiRepository extends LivroRepository {
    #apiUrl

    constructor(apiUrl) {
        super()
        this.#apiUrl = apiUrl
    }

    async buscarPorTitulo(titulo) {
        const resposta = await fetch(`${this.#apiUrl}/livros?titulo=${titulo}`)
        if (!resposta.ok) throw new Error('Erro ao buscar livro na API')
        const json = await resposta.json()
        return LivroMapper.fromApi(json)  // ← Mapper entra aqui, antes de retornar
    }
}

class UsuarioApiRepository extends UsuarioRepository {
    #apiUrl

    constructor(apiUrl) {
        super()
        this.#apiUrl = apiUrl
    }

    async buscarPorCpf(cpf) {
        const resposta = await fetch(`${this.#apiUrl}/usuarios?cpf=${cpf}`)
        if (!resposta.ok) throw new Error('Erro ao buscar usuário na API')
        const json = await resposta.json()
        return UsuarioMapper.fromApi(json) // ← Mapper entra aqui, antes de retornar
    }
}


// ══════════════════════════════════════════════════════════════
// CAMADA DE USE CASES — orquestra as ações do sistema
//
// ANTES: Biblioteca.emprestar() fazia tudo:
//        buscava na API, criava objetos, validava, empurrava na lista
//        era a "classe Deus" — sabia demais, fazia demais
//
// DEPOIS: cada use case faz UMA coisa bem feita
//         não sabe de fetch — só fala com repositórios e entidades
//         as regras de negócio ficam NAS ENTIDADES, não aqui
//         aqui só orquestra: busca → valida (via entidade) → age
// ══════════════════════════════════════════════════════════════

class EmprestarLivroUseCase {
    #livroRepo
    #usuarioRepo

    constructor(livroRepo, usuarioRepo) {
        this.#livroRepo    = livroRepo    // recebe qualquer impl. de LivroRepository
        this.#usuarioRepo  = usuarioRepo  // recebe qualquer impl. de UsuarioRepository
    }

    async executar(titulo, cpf) {
        // Valida entrada do usuário — dados ainda não são confiáveis
        ValidadorBiblioteca.titulo(titulo)
        ValidadorBiblioteca.cpf(cpf)

        // Busca via repositório — não sabe se é API, banco ou fake de teste
        const livro   = await this.#livroRepo.buscarPorTitulo(titulo)
        const usuario = await this.#usuarioRepo.buscarPorCpf(cpf)

        // Emprestimo.constructor já valida disponibilidade e limite
        // As regras ficam nas entidades — use case só orquestra
        const emprestimo = new Emprestimo(livro, usuario)

        return emprestimo
    }
}

class DevolverLivroUseCase {
    async executar(emprestimo) {
        // A lógica de devolução mora no Emprestimo — use case só chama
        emprestimo.devolver()

        const multa = emprestimo.calcularMulta()
        return { multa }
    }
}


// ══════════════════════════════════════════════════════════════
// COMPOSIÇÃO — monta tudo e expõe ao mundo externo
//
// ANTES: Biblioteca era a classe Deus — sabia de API, fetch,
//        listas, regras, validação, multa, tudo
//
// DEPOIS: Biblioteca vira um agregador fino
//         só monta as dependências e delega para os use cases
//         poderia até sumir — a UI chamaria os use cases direto
// ══════════════════════════════════════════════════════════════

class Biblioteca {
    #emprestar
    #devolver
    #emprestimosAtivos = []  // lista local — em produção seria um EmprestimoRepository

    constructor(apiUrl) {
        // Infra
        const livroRepo   = new LivroApiRepository(apiUrl)
        const usuarioRepo = new UsuarioApiRepository(apiUrl)

        // Use Cases recebem repositórios — não sabem de fetch
        this.#emprestar = new EmprestarLivroUseCase(livroRepo, usuarioRepo)
        this.#devolver  = new DevolverLivroUseCase()
    }

    async emprestar(titulo, cpf) {
        const emprestimo = await this.#emprestar.executar(titulo, cpf)
        this.#emprestimosAtivos.push(emprestimo)

        console.log(
            `"${emprestimo.livro.titulo}" emprestado para ${emprestimo.usuario.nome}.` +
            ` Devolução até ${emprestimo.dataDevolucao.toLocaleDateString()}`
        )
        return emprestimo
    }

    async devolver(emprestimo) {
        const { multa } = await this.#devolver.executar(emprestimo)
        this.#emprestimosAtivos = this.#emprestimosAtivos.filter(e => e !== emprestimo)

        if (multa > 0) {
            console.log(`Devolução com atraso. Multa: R$${multa.toFixed(2)}`)
        } else {
            console.log(`"${emprestimo.livro.titulo}" devolvido no prazo!`)
        }
    }

    get emprestimos() { return [...this.#emprestimosAtivos] }
}


// ══════════════════════════════════════════════════════════════
// USO — igual ao antes, mas agora o interior está organizado
// ══════════════════════════════════════════════════════════════

const biblioteca = new Biblioteca('https://api.biblioteca.com')

await biblioteca.emprestar("Clean Code", "123.456.789-09")

const emprestimo = biblioteca.emprestimos[0]
await biblioteca.devolver(emprestimo)


// ══════════════════════════════════════════════════════════════
// BÔNUS — testabilidade com repositório falso
//
// O maior ganho da arquitetura: você pode testar SEM internet
// Só criar um repositório fake que implementa o mesmo contrato
// ══════════════════════════════════════════════════════════════

class LivroFakeRepository extends LivroRepository {
    async buscarPorTitulo(titulo) {
        return new Livro({ titulo, autor: 'Autor Fake', isbn: '000', disponivel: true })
    }
}

class UsuarioFakeRepository extends UsuarioRepository {
    async buscarPorCpf(cpf) {
        return new Usuario({ cpf, nome: 'Usuário Fake' })
    }
}

// Teste sem API, sem internet, instantâneo:
const useCaseTestavel = new EmprestarLivroUseCase(
    new LivroFakeRepository(),
    new UsuarioFakeRepository()
)
const emprestimoTeste = await useCaseTestavel.executar("Qualquer Livro", "000.000.000-00")
console.log('✅ Teste passou:', emprestimoTeste.estaAtivo())
