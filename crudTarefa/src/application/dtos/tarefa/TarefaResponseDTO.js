class TarefaResponseDTO {
    #id;
    #titulo;
    #descrição;
    #prazo;
    #concluida;
    #dataDeCriação;
    #atrasada;

    constructor({ id, titulo, descrição, prazo, concluida, dataDeCriação, atrasada }) {
        this.#id           = id;
        this.#titulo       = titulo;
        this.#descrição    = descrição ?? null;
        this.#prazo        = prazo;
        this.#concluida    = concluida;
        this.#dataDeCriação = dataDeCriação;
        this.#atrasada     = atrasada ?? false;
    }

    /**
     * Cria um TarefaResponseDTO a partir dos dados brutos da entidade (tarefa.dados).
     * @param {Object} dados - resultado de tarefa.dados
     */
    static fromEntity(dados) {
        const agora = new Date();
        const atrasada = !dados.concluida && new Date(dados.prazo) < agora;
        return new TarefaResponseDTO({ ...dados, atrasada });
    }

    toJSON() {
        return {
            id:           this.#id,
            titulo:       this.#titulo,
            descrição:    this.#descrição,
            prazo:        this.#prazo,
            concluida:    this.#concluida,
            dataDeCriação: this.#dataDeCriação,
            atrasada:     this.#atrasada,
        };
    }
}

module.exports = TarefaResponseDTO;
