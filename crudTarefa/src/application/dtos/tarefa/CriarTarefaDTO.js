class CriarTarefaDTO {
    #titulo;
    #descrição;
    #prazo;

    constructor({ titulo, descrição, prazo }) {
        if (!titulo || typeof titulo !== 'string' || titulo.trim() === '') {
            throw new Error('titulo é obrigatório e deve ser uma string não vazia');
        }
        if (!prazo) {
            throw new Error('prazo é obrigatório');
        }
        const dataPrazo = new Date(prazo);
        if (isNaN(dataPrazo.getTime())) {
            throw new Error('prazo deve ser uma data válida');
        }

        this.#titulo   = titulo.trim();
        this.#descrição = descrição ? String(descrição).trim() : null;
        this.#prazo    = dataPrazo;
    }

    get titulo()    { return this.#titulo; }
    get descrição() { return this.#descrição; }
    get prazo()     { return this.#prazo; }

    toObject() {
        return {
            titulo:    this.#titulo,
            descrição: this.#descrição,
            prazo:     this.#prazo,
        };
    }
}

module.exports = CriarTarefaDTO;
