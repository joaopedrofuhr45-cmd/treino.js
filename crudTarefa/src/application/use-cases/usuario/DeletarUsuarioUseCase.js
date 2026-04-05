class DeletarUsuarioUseCase {
    #repository;
    constructor(repository) {
        this.#repository = repository;
    }
    async executar(id) {
        return await this.#repository.deletar(id);
    }
}
module.exports = DeletarUsuarioUseCase;
