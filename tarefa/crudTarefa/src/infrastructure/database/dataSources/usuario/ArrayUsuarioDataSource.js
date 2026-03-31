class ArrayUsuarioDataSource {
    #usuarios = [];

    async salvar(dadoCru) {
        const index = this.#usuarios.findIndex(u => u.id_usuario === dadoCru.id_usuario);
        if (index !== -1) {
            this.#usuarios[index] = dadoCru;
        } else {
            this.#usuarios.push(dadoCru);
        }
    }

    async buscarPorId(id) {
        return this.#usuarios.find(obj => obj.id_usuario === id);
    }

    async listarTodas() {
        return this.#usuarios;
    }

    async deletar(id) {
        this.#usuarios = this.#usuarios.filter(t => t.id_usuario !== id);
    }
}

module.exports = ArrayUsuarioDataSource;
