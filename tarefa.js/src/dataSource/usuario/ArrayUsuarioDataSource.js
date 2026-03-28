class ArrayUsuarioDataSource {
    #Usuario = []

    async salvar(dadoCru) {
        this.#Usuario.push(dadoCru)
    }

    async buscarId(id) {
        return this.#Usuario.find(obj => obj.id === id)
    }
    async listarTodas(id) {
        return this.#Usuario
    }
    async Deletar(id) {
        return this.#Usuario = this.filter(t => t.id !== id)
    }
}


module.exports = ArrayUsuarioDataSource