const TarefaMapper = require('../../mappers/tarefa/TarefaMapper');
const TarefaErro = require('../../../../domain/errors/tarefa/tarefaErro');

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
        if (!id) throw new Error('ID obrigatório');
        const dadoCru = await this.#dataSource.buscarPorId(id);
        if (!dadoCru) throw new TarefaErro();
        return TarefaMapper.paraDominio(dadoCru);
    }

    async listarTodas() {
        const dados = await this.#dataSource.listarTodas();
        return dados.map(d => TarefaMapper.paraDominio(d));
    }

    async deletar(id) {
        if (!id) throw new Error('ID obrigatório');
        const dadoCru = await this.#dataSource.buscarPorId(id);
        if (!dadoCru) throw new TarefaErro();
        
        const tarefa = TarefaMapper.paraDominio(dadoCru);
        if (!tarefa.podeSerDeletada()) {
            throw new Error('Tarefa não pode ser deletada (ainda não concluída ou não atrasada)');
        }
        
        await this.#dataSource.deletar(id);
    }
}

module.exports = TarefaRepository;
