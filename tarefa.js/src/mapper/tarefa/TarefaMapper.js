const Tarefa = require('../domain/tarefa');

class TarefaMapper {
    static paraDominio(dados) {
        return new Tarefa({
            id:            dados.id_tarefa        || dados.id,
            titulo:        dados.nome             || dados.titulo,
            descrição:     dados.desc             || dados.descrição,
            prazo:         dados.data_prazo       || dados.prazo,
            concluida:     dados.status_concluida || dados.concluida,
            dataDeCriação: dados.dataAcriacao     || dados.dataDeCriação
        });
    }

    static paraPersistencia(tarefa) {
        return {
            id:            tarefa.dados.id,
            titulo:        tarefa.dados.titulo,
            descrição:     tarefa.dados.descrição,
            prazo:         tarefa.dados.prazo,
            concluida:     tarefa.dados.concluida,
            dataDeCriação: tarefa.dados.dataDeCriação
        };
    }
}

module.exports = TarefaMapper;
