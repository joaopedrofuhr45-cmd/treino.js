import { v4 as uuidv4 } from 'uuid'
import { AppError } from '../../errors/appError.js'
import { Email } from '../../value-objects/email/email.js'
import { Senha } from '../../value-objects/senha/senha.js'
import { CPF } from '../../value-objects/cpf/cpf.js'

export class Usuario {
    #id
    #nome
    #email
    #senha
    #cpf
    #criadoEm

    constructor(nome, email, senha, cpf) {
        this.#id = uuidv4()        // gera o ID aqui dentro
        this.#nome = this.#validarNome(nome)
        this.#email = new Email(email)
        this.#senha = new Senha(senha)
        this.#cpf = new CPF(cpf)
        this.#criadoEm = new Date()
    }

    #validarNome(nome) {
        if (!nome || typeof nome !== 'string') {
            throw new AppError('Nome é obrigatório', 400)
        }
        if (nome.trim().length < 3) {
            throw new AppError('Nome deve ter no mínimo 3 caracteres', 400)
        }
        if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(nome)) {
            throw new AppError('Nome não pode conter números ou caracteres especiais', 400)
        }
        return nome.trim()
    }

    get id() { return this.#id }
    get nome() { return this.#nome }
    get email() { return this.#email.valor }
    get senha() { return this.#senha.valor }
    get cpf() { return this.#cpf.valor }
    get criadoEm() { return this.#criadoEm }
}