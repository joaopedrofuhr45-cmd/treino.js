import { v4 as uuidv4 } from 'uuid'
import AppError from '../../../../shared/errors/AppError.js'

export class Categoria {
  #id
  #nome
  #tipo
  #cor
  #usuarioId
  #ativa
  #criadoEm
  #atualizadoEm

  constructor({ id, nome, tipo, cor, usuarioId, ativa, criadoEm, atualizadoEm }) {
    if (!nome) {
      throw new AppError("Nome é obrigatório", 400)
    }

    this.#id = id || uuidv4()
    this.#nome = nome
    this.#tipo = tipo
    this.#cor = cor
    this.#usuarioId = usuarioId
    this.#ativa = ativa ?? true
    this.#criadoEm = criadoEm ? new Date(criadoEm) : new Date()
    this.#atualizadoEm = atualizadoEm ? new Date(atualizadoEm) : this.#criadoEm
  }

  desativar() {
    if (!this.#ativa) {
      throw new AppError("Categoria já está inativa", 400)
    }
    this.#ativa = false
    this.#atualizadoEm = new Date()
  }

  ativar() {
    if (this.#ativa) {
      throw new AppError("Categoria já está ativa", 400)
    }
    this.#ativa = true
    this.#atualizadoEm = new Date()
  }

  toJSON() {
    return {
      id: this.#id,
      nome: this.#nome,
      tipo: this.#tipo,
      cor: this.#cor,
      usuarioId: this.#usuarioId,
      ativa: this.#ativa,
      criadoEm: this.#criadoEm,
      atualizadoEm: this.#atualizadoEm,
    }
  }
}