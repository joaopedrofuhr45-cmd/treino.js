export function validarNovoUsuario(req, res, next) {
    const { email, password, name } = req.body

    if (!email || !password || !name) {
        return res.status(400).json({
            message: "precisa inserir email, senha e nome para continuar"
        })
    }

    if (!email.includes("@")) {
        return res.status(400).json({
            message: "o email precisa de @"
        })
    }

    if (password.length < 6) {
        return res.status(400).json({
            message: "a senha precisa ter mais de 6 caracteres"
        })
    }

    next()
}

export function validarLogin(req, res, next) {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            message: "precisa inserir email e senha para continuar"
        })
    }

    if (!email.includes("@")) {
        return res.status(400).json({
            message: "o email precisa de @"
        })
    }

    if (password.length < 6) {
        return res.status(400).json({
            message: "a senha precisa ter mais de 6 caracteres"
        })
    }

    next()
}

export function validarRefreshToken(req, res, next) {
    const { refreshToken } = req.body

    if (!refreshToken) {
        return res.status(400).json({
            message: "precisa inserir o refreshToken para continuar"
        })
    }

    next()
}
