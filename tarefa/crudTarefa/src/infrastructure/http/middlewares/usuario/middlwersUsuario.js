const usuarioMiddlewares = {
    validarCriacao: (req, res, next) => {
        const { nome, email, senha } = req.body;
        if (!nome || !email || !senha) {
            return res.status(400).json({ error: "Campos obrigatórios ausentes (nome, email, senha)." });
        }
        if (senha.length < 6) {
            return res.status(400).json({ error: "A senha deve ter no mínimo 6 caracteres." });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Formato de email inválido." });
        }
        next();
    },
    validarId: (req, res, next) => {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "ID do usuário não informado." });
        }
        next();
    }
};

module.exports = usuarioMiddlewares;
