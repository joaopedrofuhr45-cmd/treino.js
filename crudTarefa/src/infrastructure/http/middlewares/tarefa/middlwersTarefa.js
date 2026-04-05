const tarefaMiddleware = {
    validarCriacao: (req, res, next) => {
        const { titulo, descrição, prazo } = req.body;
        if (!titulo || titulo.trim() === '') {
            return res.status(400).json({ 
                error: "O título da tarefa é obrigatório." 
            });
        }
        if (!prazo) {
            return res.status(400).json({ 
                error: "O prazo da tarefa é obrigatório." 
            });
        }
        next();
    },
    validarStatus: (req, res, next) => {
        const { concluida } = req.body;
        if (concluida !== undefined && typeof concluida !== 'boolean') {
            return res.status(400).json({ 
                error: "O campo 'concluida' deve ser um booleano (true/false)." 
            });
        }
        next();
    }
};

module.exports = tarefaMiddleware;
