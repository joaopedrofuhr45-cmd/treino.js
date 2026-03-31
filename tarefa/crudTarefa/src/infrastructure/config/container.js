const ArrayTarefaDataSource  = require('../database/dataSources/tarefa/ArrayTarefaDataSource');
const TarefaRepository       = require('../database/repositories/tarefa/TarefaRepository');
const CriarTarefaUseCase     = require('../../application/use-cases/tarefa/CriarTarefaUseCase');
const BuscarTarefaUseCase    = require('../../application/use-cases/tarefa/BuscarTarefaUseCase');
const ListarTarefasUseCase   = require('../../application/use-cases/tarefa/ListarTarefasUseCase');
const DeletarTarefaUseCase   = require('../../application/use-cases/tarefa/DeletarTarefaUseCase');
const TarefaController       = require('../http/controllers/tarefa/TarefaController');

const ArrayUsuarioDataSource = require('../database/dataSources/usuario/ArrayUsuarioDataSource');
const UsuarioRepository      = require('../database/repositories/usuario/UsuarioRepository');
const CriarUsuarioUseCase    = require('../../application/use-cases/usuario/CriarUsuarioUseCase');
const BuscarUsuarioUseCase   = require('../../application/use-cases/usuario/BuscarUsuarioUseCase');
const DeletarUsuarioUseCase  = require('../../application/use-cases/usuario/DeletarUsuarioUseCase');
const UsuarioController      = require('../http/controllers/usuario/UsuarioController');

// --- TAREFA ---
const tarefaDataSource  = new ArrayTarefaDataSource();
const tarefaRepository  = new TarefaRepository(tarefaDataSource);

const criarTarefa       = new CriarTarefaUseCase(tarefaRepository);
const buscarTarefa      = new BuscarTarefaUseCase(tarefaRepository);
const listarTarefas     = new ListarTarefasUseCase(tarefaRepository);
const deletarTarefa     = new DeletarTarefaUseCase(tarefaRepository);

const tarefaController  = new TarefaController({ 
    criarTarefa, 
    buscarTarefa, 
    listarTarefas, 
    deletarTarefa 
});

// --- USUARIO ---
const usuarioDataSource = new ArrayUsuarioDataSource();
const usuarioRepository = new UsuarioRepository(usuarioDataSource);

const criarUsuario      = new CriarUsuarioUseCase(usuarioRepository);
const buscarUsuario     = new BuscarUsuarioUseCase(usuarioRepository);
const deletarUsuario    = new DeletarUsuarioUseCase(usuarioRepository);

const usuarioController = new UsuarioController({ 
    criarUsuario, 
    buscarUsuario, 
    deletarUsuario 
});

module.exports = { tarefaController, usuarioController };
