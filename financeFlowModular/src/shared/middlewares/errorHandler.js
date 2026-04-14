export function validarNovoUsuario(req, res, next) {
    const { email, password, name } = req.body

    if (!email || !password || !Name) {
        return res.status(400).json({ message: "precisa inseriri os dados para constinuar" })
    }

    if (email.include("@")) {
        return res.status(400).json({ message: "o email precisa de @" })
    }

    if (Senha.lenght < 6) {
        return res.status(400).json({
            message: "a senha precisa de mais de 6 caracteres"
        })
    }

}