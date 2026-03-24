const UsuarioMapper = require('../mapper/UsuarioMapper.js')

class UsuarioRepository {
    #dataSource

    constructor(dataSource) {
        this.#dataSource = dataSource
    }

    async criar(usuario) {
        const dadoCru = UsuarioMapper.paraPersistencia(usuario)
        await this.#dataSource.criar(dadoCru)
        // chama o mapper persistencia passando o usuario
        // o persistencia converte e manda pro dataSource salvar
    }

    async buscarPorId(id) {
        if (!id) throw new Error("ID Obrigatorio")
        const dadoCru = await this.#dataSource.buscarPorId(id)
        if (!dadoCru) throw new Error("usuario não encontrado")
        return UsuarioMapper.paraDominio(dadoCru)
        // verifica o id, busca no dataSource
        // se encontrar converte pra dominio e retorna
    }

    async listar() {
        const dados = await this.#dataSource.listar()
        return dados.map(d => UsuarioMapper.paraDominio(d))
        // busca todos os dados crus e converte cada um pra dominio
    }

    async deletar(id) {
        if (!id) throw new Error("ID obrigatorio")
        const dadoCru = await this.#dataSource.buscarPorId(id)
        if (!dadoCru) throw new Error("usuario não encontrado")
        await this.#dataSource.deletar(id)
        // verifica o id, busca no dataSource pra ver se existe
        // se existir manda deletar
    }

}

module.exports = UsuarioRepository