import { AppError } from '../../errors/appError.js'
import { Dinheiro } from '../../value-objects/dinheiro/dinheiro.js'
import { v4 as uuidv4 } from 'uuid'

export class Conta {
    #id
    #usuarioId
    #nome
    #saldo
    #tipo
    #criadoEm

    constructor(usuarioId, nome, tipo, saldo) {
        this.#id = uuidv4()
        this.#usuarioId = usuarioId
        this.#nome = this.#validarNome(nome)
        this.#tipo = this.#validarTipo(tipo)
        this.#saldo = new Dinheiro(saldo)
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
        const tiposPermitidos = ['corrente', 'poupanca', 'investimento']
        if (!tiposPermitidos.includes(tipo)) {
            throw new AppError('Tipo deve ser corrente, poupanca ou investimento', 400)
        }
        return tipo
    }


    podeSerDeletada() {
        if (this.#saldo.valor > 0) {
            throw new AppError('Conta não pode ser deletada pois ainda tem saldo', 400)
        }
        return true
    }

    get id() { return this.#id }
    get usuarioId() { return this.#usuarioId }
    get nome() { return this.#nome }
    get saldo() { return this.#saldo.valor }
    get tipo() { return this.#tipo }
    get criadoEm() { return this.#criadoEm }
}