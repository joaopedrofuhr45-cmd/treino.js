import { CredenciaisInvalidasError } from '../../domain/errors/auth/authErro.js'
import bcrypt from 'bcryptjs'

export class LoginUseCase {
    #repository

    constructor(repository) {
        this.#repository = repository
    }

    async execute({ email, senha }) {
        // 1. busca pelo email
        const usuario = await this.#repository.buscarPorEmail(email)
        if (!usuario) throw new CredenciaisInvalidasError()

        // 2. compara a senha
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha)
        if (!senhaCorreta) throw new CredenciaisInvalidasError()

        // 3. gera o token JWT — vamos implementar quando chegar no JwtService
        // const token = await this.#jwtService.gerarToken(usuario)

        // 4. retorna o usuario por enquanto
        return usuario
    }
}