class ArrayTarefaDataSource {
    #tarefas = [];

    async salvar(dadoCru) {
        this.#tarefas.push(dadoCru);
    }

    async buscarPorId(id) {
        return this.#tarefas.find(obj => obj.id === id);
    }

    async listarTodas() {
        return this.#tarefas;
    }

    async deletar(id) {
        this.#tarefas = this.#tarefas.filter(t => t.id !== id);
    }
}

module.exports = ArrayTarefaDataSource;
