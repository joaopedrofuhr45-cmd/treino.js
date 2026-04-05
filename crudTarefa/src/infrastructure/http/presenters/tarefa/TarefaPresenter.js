const TarefaResponseDTO = require('../../../application/dtos/tarefa/TarefaResponseDTO');

class TarefaPresenter {
    /**
     * Formata uma única tarefa para resposta HTTP.
     * @param {Object} dados - dados brutos da entidade (tarefa.dados)
     * @returns {Object} objeto serializado
     */
    static apresentar(dados) {
        return TarefaResponseDTO.fromEntity(dados).toJSON();
    }

    /**
     * Formata uma lista de tarefas para resposta HTTP.
     * @param {Object[]} lista - array de dados brutos (tarefa.dados)
     * @returns {Object[]} array serializado
     */
    static apresentarLista(lista) {
        return lista.map(TarefaPresenter.apresentar);
    }
}

module.exports = TarefaPresenter;
