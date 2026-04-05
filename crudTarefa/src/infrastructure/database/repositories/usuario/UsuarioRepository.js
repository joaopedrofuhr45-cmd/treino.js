const UsuarioMapper = require('../../mappers/usuario/UsuarioMapper');
const UsuarioErro = require('../../../../domain/errors/usuario/usuarioErro');

class UsuarioRepository {
    #dataSource;

    constructor(dataSource) {
        this.#dataSource = dataSource;
    }

    async salvar(usuario) {
        const dadoCru = UsuarioMapper.paraPersistencia(usuario);
        await this.#dataSource.salvar(dadoCru);
    }

    async buscarPorId(id) {
        if (!id) throw new Error('ID obrigatório');
        const dadoCru = await this.#dataSource.buscarPorId(id);
        if (!dadoCru) throw new UsuarioErro();
        return UsuarioMapper.paraDominio(dadoCru);
    }

    async listarTodos() {
        const dados = await this.#dataSource.listarTodas();
        return dados.map(d => UsuarioMapper.paraDominio(d));
    }

    async deletar(id) {
        if (!id) throw new Error('ID obrigatório');
        const dadoCru = await this.#dataSource.buscarPorId(id);
        if (!dadoCru) throw new UsuarioErro();
        await this.#dataSource.deletar(id);
    }
}

module.exports = UsuarioRepository;
