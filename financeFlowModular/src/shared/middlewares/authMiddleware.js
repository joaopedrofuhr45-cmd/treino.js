import jwt from "jsonwebtoken"

export function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization
    
    // Passo 1 e 2: Verifica se existe
    if (!authHeader) {
        return res.status(401).json({ message: "token não fornecido" })
    }
    
    // Passo 3: Separa em partes
    const parts = authHeader.split(" ")
    
    if (parts.length !== 2) {
        return res.status(401).json({ message: "formato inválido" })
    }
    
    // Passo 4: Verifica se é "Bearer"
    const [scheme, token] = parts
    
    if (scheme !== "Bearer") {
        return res.status(401).json({ message: "deve ser Bearer" })
    }
    
    // Passo 5 e 6: Verifica o token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded  // Passo 7: Guarda usuário
        next()
    } catch (error) {
        return res.status(401).json({ message: "token inválido" })
    }
}