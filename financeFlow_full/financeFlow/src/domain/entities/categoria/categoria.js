import { AppError } from '../../errors/appError.js'
import { v4 as uuidv4 } from 'uuid'

export class Categoria {
    #id
    #usuarioId
    #nome
    #tipo
    #criadoEm
    constructor(usuarioId, nome, tipo) {
        this.#id = uuidv4()
        this.#usuarioId = usuarioId
        this.#nome = this.#validarNome(nome)
        this.#tipo = this.#validarTipo(tipo)
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

    #validarTipo(tipo) {
        const tiposPermitidos = ['receita', 'despesa']
        if (!tiposPermitidos.includes(tipo)) {
            throw new AppError('Tipo deve ser receita ou depesas', 400)
        }
        return tipo
    }

    get id() { return this.#id }
    get usuarioId() { return this.#usuarioId }
    get nome() { return this.#nome }
    get tipo() { return this.#tipo }
    get criadoEm() { return this.#criadoEm }


}