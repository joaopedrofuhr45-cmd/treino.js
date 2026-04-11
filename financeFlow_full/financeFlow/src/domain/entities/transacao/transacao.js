import { AppError } from '../../errors/appError.js'
import { Dinheiro } from '../../value-objects/dinheiro/dinheiro.js'
import { v4 as uuidv4 } from 'uuid'

export class Transacao {
    #id
    #usuarioId
    #contaId
    #categoriaId
    #descricao
    #valor
    #tipo
    #data
    #criadoEm

    constructor({ usuarioId, contaId, categoriaId, descricao, valor, tipo, data }) {
        this.#id = uuidv4()
        this.#usuarioId = usuarioId
        this.#contaId = contaId
        this.#categoriaId = categoriaId
        this.#descricao = this.#validarDescricao(descricao)
        this.#valor = new Dinheiro(valor)
        this.#tipo = this.#validarTipo(tipo)
        this.#data = this.#validarData(data)
        this.#criadoEm = new Date()
    }

    #validarDescricao(descricao) {
        if (!descricao || typeof descricao !== 'string') throw new AppError('Descrição é obrigatória', 400)
        if (descricao.trim().length < 3) throw new AppError('Descrição deve ter no mínimo 3 caracteres', 400)
        return descricao.trim()
    }

    #validarTipo(tipo) {
        const tiposPermitidos = ['receita', 'despesa']
        if (!tiposPermitidos.includes(tipo)) throw new AppError('Tipo deve ser receita ou despesa', 400)
        return tipo
    }

    #validarData(data) {
        if (!data) throw new AppError('Data é obrigatória', 400)
        const dataTransacao = new Date(data)
        if (dataTransacao > new Date()) throw new AppError('Não é possível lançar transação com data futura', 400)
        return dataTransacao
    }

    aplicarNoSaldo(saldoAtual) {
        if (this.#tipo === 'receita') return saldoAtual + this.#valor.valor
        return saldoAtual - this.#valor.valor
    }

    get id() { return this.#id }
    get usuarioId() { return this.#usuarioId }
    get contaId() { return this.#contaId }
    get categoriaId() { return this.#categoriaId }
    get descricao() { return this.#descricao }
    get valor() { return this.#valor.valor }
    get tipo() { return this.#tipo }
    get data() { return this.#data }
    get criadoEm() { return this.#criadoEm }
}