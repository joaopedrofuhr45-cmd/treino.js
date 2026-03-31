class ListarTarefasUseCase {
    #repository;
    constructor(repository) {
        this.#repository = repository;
    }
    async executar() {
        return await this.#repository.listarTodas();
    }
}
module.exports = ListarTarefasUseCase;
