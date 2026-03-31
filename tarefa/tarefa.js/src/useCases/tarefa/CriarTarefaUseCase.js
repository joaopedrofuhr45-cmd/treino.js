const Tarefa = require('../domain/tarefa');

class CriarTarefaUseCase {
    #repository;

    constructor(repository) {
        this.#repository = repository;
    }

    async executar({ titulo, descrição, prazo }) {
        const tarefa = new Tarefa({
            id:            Math.random().toString(36).slice(2),
            titulo,
            descrição,
            prazo:         new Date(prazo),
            concluida:     false,
            dataDeCriação: new Date()
        });

        await this.#repository.salvar(tarefa);
        return tarefa.dados;
    }
}

module.exports = CriarTarefaUseCase;
