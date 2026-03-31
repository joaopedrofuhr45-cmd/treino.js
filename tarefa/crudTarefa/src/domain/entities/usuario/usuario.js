class Usuario {
    #id;
    #nome;
    #email;
    #senha;
    #criadoEm;

    constructor(id, nome, email, senha, criadoEm) {
        if (!nome || nome.trim() === '') throw new Error('Nome não pode ser vazio');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) throw new Error('Email inválido');
        if (!senha || senha.length < 6) throw new Error('Senha deve ter no mínimo 6 caracteres');

        this.#id = id;
        this.#nome = nome.trim();
        this.#email = email;
        this.#senha = senha;
        this.#criadoEm = criadoEm || new Date();
        
        Object.freeze(this);
    }

    getId() { return this.#id; }
    getNome() { return this.#nome; }
    getEmail() { return this.#email; }
    getSenha() { return this.#senha; }
    getCriadoEm() { return this.#criadoEm; }

    get dados() {
        return {
            id: this.#id,
            nome: this.#nome,
            email: this.#email,
            criadoEm: this.#criadoEm
        };
    }
}

module.exports = Usuario;
