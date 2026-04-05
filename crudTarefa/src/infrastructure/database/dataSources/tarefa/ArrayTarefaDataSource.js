class ArrayTarefaDataSource {
    #tarefas = [];

    async salvar(dadoCru) {
        const index = this.#tarefas.findIndex(t => t.id === dadoCru.id);
        if (index !== -1) {
            this.#tarefas[index] = dadoCru;
        } else {
            this.#tarefas.push(dadoCru);
        }
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
