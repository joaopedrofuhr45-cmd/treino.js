const TarefaPresenter  = require('../../presenters/tarefa/TarefaPresenter');
const CriarTarefaDTO   = require('../../../../application/dtos/tarefa/CriarTarefaDTO');

class TarefaController {
    #criarTarefa;
    #deletarTarefa;
    #listarTarefas;
    #buscarTarefa;

    constructor({ criarTarefa, deletarTarefa, listarTarefas, buscarTarefa }) {
        this.#criarTarefa   = criarTarefa;
        this.#deletarTarefa = deletarTarefa;
        this.#listarTarefas = listarTarefas;
        this.#buscarTarefa  = buscarTarefa;
    }

    async criar(req, res, next) {
        try {
            const dto    = new CriarTarefaDTO(req.body);
            const tarefa = await this.#criarTarefa.executar(dto.toObject());
            res.status(201).json(TarefaPresenter.apresentar(tarefa));
        } catch (erro) {
            next(erro);
        }
    }

    async listar(req, res, next) {
        try {
            const tarefas = await this.#listarTarefas.executar();
            res.json(TarefaPresenter.apresentarLista(tarefas.map(t => t.dados)));
        } catch (erro) {
            next(erro);
        }
    }

    async buscar(req, res, next) {
        try {
            const tarefa = await this.#buscarTarefa.executar(req.params.id);
            res.json(TarefaPresenter.apresentar(tarefa.dados));
        } catch (erro) {
            next(erro);
        }
    }

    async deletar(req, res, next) {
        try {
            await this.#deletarTarefa.executar(req.params.id);
            res.status(204).send();
        } catch (erro) {
            next(erro);
        }
    }
}

module.exports = TarefaController;
