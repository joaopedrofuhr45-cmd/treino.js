class BuscarUsuarioUseCase {
    #repository;
    constructor(repository) {
        this.#repository = repository;
    }
    async executar(id) {
        return await this.#repository.buscarPorId(id);
    }
}
module.exports = BuscarUsuarioUseCase;
