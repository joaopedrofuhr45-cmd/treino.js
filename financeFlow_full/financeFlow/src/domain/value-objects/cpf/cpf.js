// src/domain/value-objects/cpf/cpf.js
import { AppError } from '../../errors/appError.js'

export class CPF {
  #numero

  constructor(numero) {
    const limpo = numero?.replace(/\D/g, '') // remove tudo que não é dígito
    this.#validar(limpo)
    this.#numero = limpo
  }

  #validar(numero) {
    if (!numero || numero.length !== 11) {
      throw new AppError('CPF inválido', 400)
    }
  }

  get valor() {
    return this.#numero
  }
}