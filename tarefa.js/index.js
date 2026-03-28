const ArrayTarefaDataSource  = require('./dataSource/ArrayTarefaDataSource');
const TarefaRepository       = require('./repository/TarefaRepository');
const CriarTarefaUseCase     = require('./useCases/CriarTarefaUseCase');

const ArrayUsuarioDataSource = require('./dataSource/ArrayUsuarioDataSource');
const UsuarioRepository      = require('./repository/UsuarioRepository');
const CriarUsuarioUseCase    = require('./useCases/CriarUsuarioUseCases');

const dataSource   = new ArrayTarefaDataSource();
const repository   = new TarefaRepository(dataSource);
const criarUseCase = new CriarTarefaUseCase(repository);

const dataSourceUsuario   = new ArrayUsuarioDataSource();
const repositoryUsuario   = new UsuarioRepository(dataSourceUsuario);
const criarUsuarioUseCase = new CriarUsuarioUseCase(repositoryUsuario);

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

        // ==========================================

        console.log("\n=== CRIANDO USUÁRIOS ===\n");

        const u1 = await criarUsuarioUseCase.executar({
            nome:  "João Silva",
            email: "joao@email.com",
            senha: "123456"
        });
        console.log("✅ Usuário 1 criado:", u1);

        const u2 = await criarUsuarioUseCase.executar({
            nome:  "Maria Souza",
            email: "maria@email.com",
            senha: "654321"
        });
        console.log("✅ Usuário 2 criado:", u2);

        console.log("\n=== LISTANDO USUÁRIOS ===\n");
        const todosOsUsuarios = await repositoryUsuario.listarTodos();
        todosOsUsuarios.forEach(u => {
            console.log(`👤 ${u.dados.nome} — ${u.dados.email}`);
        });

        console.log("\n=== BUSCANDO USUÁRIO POR ID ===\n");
        const usuario = await repositoryUsuario.buscarPorId(u1.id);
        console.log("Encontrado:", usuario.dados.nome);

    } catch (erro) {
        console.error("❌ Erro:", erro.message);
    }
})();