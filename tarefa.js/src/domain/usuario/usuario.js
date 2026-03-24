class Usuario {
    #id
    #email
    #nome
    #senha
    #criadoEM

    constructor(id, nome, email, senha) {
        if (!nome || nome.trim() === '') throw new Error('Nome não pode ser vazio')

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) throw new Error('Email inválido')

        if (!senha || senha.length < 6) throw new Error('Senha deve ter no mínimo 6 caracteres')

        this.#id = id
        this.#nome = nome.trim()
        this.#email = email
        this.#senha = senha
        this.#criadoEM = new Date()
    }

    alteraNome(nome) {
        if (!nome || nome.trim() === '') throw new Error('Nome não pode ser vazio')
        this.#nome = nome.trim()
    }

    alteraSenha(senha) {
        if (!senha || senha.length < 6) throw new Error('Senha deve ter no mínimo 6 caracteres')
        this.#senha = senha
    }

    getId()     { return this.#id }
    getNome()   { return this.#nome }
    getEmail()  { return this.#email }
    getSenha()  { return this.#senha }
    getCriadoEm() { return this.#criadoEM }
}

module.exports = Usuario