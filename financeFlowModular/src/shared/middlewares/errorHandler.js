export function validarNovoUsuario(req, res, next) {
    const { email, password, name } = req.body

    if (!email || !password || !name) {
        return res.status(400).json({ message: "precisa inseriri os dados para constinuar" })
    }

    if (!email.includes("@")) {
        return res.status(400).json({ message: "o email precisa de @" })
    }

    if (password.length < 6) {
        return res.status(400).json({
            message: "a senha precisa de mais de 6 caracteres"
        })
    }
    next()
}