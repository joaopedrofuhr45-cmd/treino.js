class Tarefa {
    #id;
    #titulo;
    #descrição;
    #prazo;
    #concluida;
    #dataDeCriação;

    constructor({ id, titulo, descrição, prazo, concluida, dataDeCriação }) {
        if (!titulo || titulo.trim() === "") throw new Error("Título obrigatório");
        if (!prazo) throw new Error("Prazo obrigatório");

        this.#id = id;
        this.#titulo = titulo;
        this.#descrição = descrição;
        this.#prazo = prazo;
        this.#concluida = concluida ?? false;
        this.#dataDeCriação = dataDeCriação;

        Object.freeze(this);
    }

    estaAtrasada() {
        return !this.#concluida && new Date(this.#prazo) < new Date();
    }

    podeSerConcluida() {
        return !this.#concluida && !this.estaAtrasada();
    }

    podeSerDeletada() {
        return this.#concluida || this.estaAtrasada();
    }

    podeSerAtualizada() {
        return !this.#concluida && !this.estaAtrasada();
    }

    get dados() {
        return {
            id: this.#id,
            titulo: this.#titulo,
            descrição: this.#descrição,
            prazo: this.#prazo,
            concluida: this.#concluida,
            dataDeCriação: this.#dataDeCriação
        };
    }
}

module.exports = Tarefa;
