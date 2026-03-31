const TarefaMapper = require('../mapper/TarefaMapper');

class TarefaRepository {
    #dataSource;

    constructor(dataSource) {
        this.#dataSource = dataSource;
    }

    async salvar(tarefa) {
        const dadoCru = TarefaMapper.paraPersistencia(tarefa);
        await this.#dataSource.salvar(dadoCru);
    }

    async buscarPorId(id) {
        if (!id) throw new Error("ID obrigatório");
        const dadoCru = await this.#dataSource.buscarPorId(id);
        if (!dadoCru) throw new Error("Tarefa não encontrada");
        return TarefaMapper.paraDominio(dadoCru);
    }

    async listarTodas() {
        const dados = await this.#dataSource.listarTodas();
        return dados.map(d => TarefaMapper.paraDominio(d));
    }

    async deletar(id) {
        if (!id) throw new Error("ID obrigatório");
        const dadoCru = await this.#dataSource.buscarPorId(id);
        if (!dadoCru) throw new Error("Tarefa não encontrada");
        const tarefa = TarefaMapper.paraDominio(dadoCru);
        if (!tarefa.podeSerDeletada()) throw new Error("Tarefa não pode ser deletada");
        await this.#dataSource.deletar(id);
    }
}

module.exports = TarefaRepository;
