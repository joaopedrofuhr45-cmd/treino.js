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

    async criar(req, res) {
        try {
            const tarefa = await this.#criarTarefa.executar(req.body);
            res.status(201).json(tarefa);
        } catch (erro) {
            res.status(400).json({ erro: erro.message });
        }
    }

    async listar(req, res) {
        try {
            const tarefas = await this.#listarTarefas.executar();
            res.json(tarefas.map(t => t.dados));
        } catch (erro) {
            res.status(500).json({ erro: erro.message });
        }
    }

    async buscar(req, res) {
        try {
            const tarefa = await this.#buscarTarefa.executar(req.params.id);
            res.json(tarefa.dados);
        } catch (erro) {
            res.status(404).json({ erro: erro.message });
        }
    }

    async deletar(req, res) {
        try {
            await this.#deletarTarefa.executar(req.params.id);
            res.status(204).send();
        } catch (erro) {
            res.status(400).json({ erro: erro.message });
        }
    }
}

module.exports = TarefaController;
