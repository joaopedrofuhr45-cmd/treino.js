class UsuarioResponseDTO {
    #id;
    #nome;
    #email;
    #criadoEm;

    constructor({ id, nome, email, criadoEm }) {
        this.#id       = id;
        this.#nome     = nome;
        this.#email    = email;
        this.#criadoEm = criadoEm;
    }

    /**
     * Cria um UsuarioResponseDTO a partir dos dados brutos da entidade (usuario.dados).
     * A senha nunca é incluída na resposta.
     * @param {Object} dados - resultado de usuario.dados
     */
    static fromEntity(dados) {
        return new UsuarioResponseDTO({
            id:       dados.id,
            nome:     dados.nome,
            email:    dados.email,
            criadoEm: dados.criadoEm,
        });
    }

    toJSON() {
        return {
            id:       this.#id,
            nome:     this.#nome,
            email:    this.#email,
            criadoEm: this.#criadoEm,
        };
    }
}

module.exports = UsuarioResponseDTO;
