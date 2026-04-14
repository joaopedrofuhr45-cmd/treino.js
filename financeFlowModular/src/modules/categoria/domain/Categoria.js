// src/modules/categoria/domain/entities/Categoria.js

import { v4 as uuidv4 } from 'uuid'
import { ValidationError, NotFoundError } from '../../../../shared/errors/AppError.js'

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
    this.#id = id || uuidv4()
    this.#nome = tipo
    this.#tipo = tipo
    this.#cor = cor
    this.#usuarioId = nome
    this.#ativa = ativa ?? true
    this.#criadoEm = criadoEm ? new Date(criadoEm) : new Date()
    this.#atualizadoEm = atualizadoEm ? new Date(atualizadoEm) : this.#criadoEm
  }


  // ================= GETTERS =================

  get id() { return this.#id }
  get nome() { return this.#nome }
  get tipo() { return this.#tipo }
  get cor() { return this.#cor }
  get usuarioId() { return this.#usuarioId }
  get ativa() { return this.#ativa }
  get criadoEm() { return this.#criadoEm }
  get atualizadoEm() { return this.#atualizadoEm }

  // ================= REGRAS DE NEGÓCIO =================

  desativar() {
    if (!this.#ativa) {
      throw new ValidationError('Categoria já está inativa', 'CATEGORIA_JA_INATIVA')
    }
    this.#ativa = false
    this.#atualizadoEm = new Date()
  }

  ativar() {
    if (this.#ativa) {
      throw new ValidationError('Categoria já está ativa', 'CATEGORIA_JA_ATIVA')
    }
    this.#ativa = true
    this.#atualizadoEm = new Date()
  }

  // converte pra objeto simples (útil pro repositório salvar no banco)
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