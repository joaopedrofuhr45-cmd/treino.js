const express = require('express');
const app     = express();
app.use(express.json());

const ArrayTarefaDataSource = require('./dataSource/ArrayTarefaDataSource');
const TarefaRepository      = require('./repository/TarefaRepository');
const CriarTarefaUseCase    = require('./useCases/CriarTarefaUseCase');
const DeletarTarefaUseCase  = require('./useCases/DeletarTarefaUseCase');
const ListarTarefasUseCase  = require('./useCases/ListarTarefasUseCase');
const BuscarTarefaUseCase   = require('./useCases/BuscarTarefaUseCase');
const TarefaController      = require('./controllers/TarefaController');
const tarefaRoutes          = require('./routes/tarefaRoutes');

const dataSource    = new ArrayTarefaDataSource();
const repository    = new TarefaRepository(dataSource);
const criarTarefa   = new CriarTarefaUseCase(repository);
const deletarTarefa = new DeletarTarefaUseCase(repository);
const listarTarefas = new ListarTarefasUseCase(repository);
const buscarTarefa  = new BuscarTarefaUseCase(repository);

const controller = new TarefaController({
    criarTarefa,
    deletarTarefa,
    listarTarefas,
    buscarTarefa
});

app.use('/tarefas', tarefaRoutes(controller));

app.listen(3000, () => console.log('🚀 Servidor rodando na porta 3000'));
