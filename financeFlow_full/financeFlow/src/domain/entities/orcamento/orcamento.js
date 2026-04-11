import { AppError } from '../../errors/appError.js'
import { Dinheiro } from '../../value-objects/dinheiro/dinheiro.js'
import { Periodo } from '../../value-objects/periodo/periodo.js'
import { OrcamentoExcedidoEvent } from '../../events/orcamento/OrcamentoExcedidoEvent.js'
import { v4 as uuidv4 } from 'uuid'

export class Orcamento {
    #id
    #usuarioId
    #categoriaId
    #valor
    #periodo
    #totalGasto
    #criadoEm

    constructor({ usuarioId, categoriaId, valor, inicio, fim }) {
        this.#id = uuidv4()
        this.#usuarioId = usuarioId
        this.#categoriaId = categoriaId
        this.#valor = new Dinheiro(valor)
        this.#periodo = new Periodo(inicio, fim)
        this.#totalGasto = new Dinheiro(0)
        this.#criadoEm = new Date()
    }

    adicionarGasto(valor) {
        const novoTotal = this.#totalGasto.valor + valor
        const limite90 = this.#valor.valor * 0.9
        const limite100 = this.#valor.valor

        if (novoTotal > limite100) throw new AppError('Orçamento excedido', 400)

        if (novoTotal >= limite90) {
            return new OrcamentoExcedidoEvent(
                this.#id,
                this.#usuarioId,
                this.#categoriaId,
                novoTotal,
                this.#valor.valor
            )
        }

        this.#totalGasto = new Dinheiro(novoTotal)
    }

    get id() { return this.#id }
    get usuarioId() { return this.#usuarioId }
    get categoriaId() { return this.#categoriaId }
    get valor() { return this.#valor.valor }
    get periodo() { return this.#periodo }
    get totalGasto() { return this.#totalGasto.valor }
    get criadoEm() { return this.#criadoEm }
}