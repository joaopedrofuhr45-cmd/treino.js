// src/domain/events/orcamento/OrcamentoExcedidoEvent.js

export class OrcamentoExcedidoEvent {
    constructor(orcamentoId, usuarioId, categoriaId, totalGasto, limite) {
        this.orcamentoId = orcamentoId
        this.usuarioId = usuarioId
        this.categoriaId = categoriaId
        this.totalGasto = totalGasto
        this.limite = limite
        this.ocorridoEm = new Date()
    }
}