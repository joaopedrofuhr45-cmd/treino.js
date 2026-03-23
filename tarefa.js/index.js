const ArrayTarefaDataSource = require('./dataSource/ArrayTarefaDataSource');
const TarefaRepository      = require('./repository/TarefaRepository');
const CriarTarefaUseCase    = require('./useCases/CriarTarefaUseCase');

const dataSource   = new ArrayTarefaDataSource();
const repository   = new TarefaRepository(dataSource);
const criarUseCase = new CriarTarefaUseCase(repository);

(async () => {
    try {
        console.log("=== CRIANDO TAREFAS ===\n");

        const t1 = await criarUseCase.executar({
            titulo:    "Estudar JavaScript",
            descrição: "Aprender padrões de design",
            prazo:     "2026-03-25"
        });
        console.log("✅ Tarefa 1 criada:", t1);

        const t2 = await criarUseCase.executar({
            titulo:    "Fazer TCC",
            descrição: "Desenvolver site de agendamento",
            prazo:     "2026-06-15"
        });
        console.log("✅ Tarefa 2 criada:", t2);

        console.log("\n=== LISTANDO TODAS ===\n");
        const todasAsTarefas = await repository.listarTodas();
        todasAsTarefas.forEach(t => {
            console.log(`📌 ${t.dados.titulo}`);
            console.log(`   Atrasada? ${t.estaAtrasada()}`);
            console.log(`   Pode concluir? ${t.podeSerConcluida()}`);
        });

        console.log("\n=== BUSCANDO POR ID ===\n");
        const tarefa = await repository.buscarPorId(t1.id);
        console.log("Encontrada:", tarefa.dados.titulo);

    } catch (erro) {
        console.error("❌ Erro:", erro.message);
    }
})();