class CriarUsuarioDTO {
    #nome;
    #email;
    #senha;

    constructor({ nome, email, senha }) {
        if (!nome || typeof nome !== 'string' || nome.trim() === '') {
            throw new Error('nome é obrigatório e deve ser uma string não vazia');
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            throw new Error('email inválido ou não informado');
        }
        if (!senha || typeof senha !== 'string' || senha.length < 6) {
            throw new Error('senha deve ter no mínimo 6 caracteres');
        }

        this.#nome  = nome.trim();
        this.#email = email.toLowerCase().trim();
        this.#senha = senha;
    }

    get nome()  { return this.#nome; }
    get email() { return this.#email; }
    get senha() { return this.#senha; }

    toObject() {
        return {
            nome:  this.#nome,
            email: this.#email,
            senha: this.#senha,
        };
    }
}

module.exports = CriarUsuarioDTO;
