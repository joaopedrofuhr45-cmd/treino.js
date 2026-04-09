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

    constructor(usuarioId, contaId, categoriaId, descricao, valor, tipo, data) {
        this.#id = uuidv4()
        this.#usuarioId = usuarioId
        this.#contaId = contaId
        this.#categoriaId = categoriaId
        this.#descricao = this.#validarDescricao(descricao)
        this.#valor = new Dinheito(valor)
        this.#tipo = this.#validarTipo(tipo)
        this.#data = this.#validarData(data)
        this.#criadoEm = new Date()
    }

    #validarTipo(tipo) {
        const tiposPermitidos = ['receita', 'despesa']
        if (!tiposPermitidos.includes(tipo)) {
            throw new AppError('Tipo deve ser receita ou depesas', 400)
        }
        return tipo
    }

}