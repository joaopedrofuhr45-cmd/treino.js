import { AppError } from "../errors/AppError.js"

export function erroHandler(err, req, res, next) {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message
        })
    }

    if (err instanceof SyntaxError) {
        return res.status(400).json({
            message: "json invalido"
        })
    }

    // Passo 3: Erro de JWT?
    if (err.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "token inválido" })
    }

    if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "token expirado" })
    }

    // Passo 4: Erro genérico
    return res.status(500).json({ message: "erro interno" })

    next(err)
}



