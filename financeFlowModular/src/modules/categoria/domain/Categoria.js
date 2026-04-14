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
    this.#id          = id || uuidv4()
    this.#nome        = this.#validarNome(nome)
    this.#tipo        = this.#validarTipo(tipo)
    this.#cor         = this.#validarCor(cor)
    this.#usuarioId   = this.#validarUsuarioId(usuarioId)
    this.#ativa       = ativa ?? true
    this.#criadoEm    = criadoEm ? new Date(criadoEm) : new Date()
    this.#atualizadoEm = atualizadoEm ? new Date(atualizadoEm) : this.#criadoEm
  }

  // ================= VALIDAÇÕES (privadas) =================

  #validarNome(nome) {
    if (!nome || typeof nome !== 'string') {
      throw new ValidationError('Nome é obrigatório', 'CATEGORIA_NOME_OBRIGATORIO')
    }
    if (nome.trim().length < 3) {
      throw new ValidationError('Nome deve ter ao menos 3 caracteres', 'CATEGORIA_NOME_CURTO')
    }
    if (nome.trim().length > 50) {
      throw new ValidationError('Nome deve ter no máximo 50 caracteres', 'CATEGORIA_NOME_LONGO')
    }
    return nome.trim()
  }

  #validarTipo(tipo) {
    const tiposValidos = ['receita', 'despesa']  // ajustei para bater com as regras do domínio
    if (!tiposValidos.includes(tipo)) {
      throw new ValidationError(
        `Tipo inválido. Use: ${tiposValidos.join(' | ')}`,
        'CATEGORIA_TIPO_INVALIDO'
      )
    }
    return tipo
  }

  #validarCor(cor) {
    if (!cor) return '#000000'
    const hexValido = /^#([0-9A-Fa-f]{6})$/.test(cor)
    if (!hexValido) {
      throw new ValidationError('Cor deve ser um HEX válido ex: #FF5733', 'CATEGORIA_COR_INVALIDA')
    }
    return cor
  }

  #validarUsuarioId(usuarioId) {
    if (!usuarioId) {
      throw new ValidationError('usuarioId é obrigatório', 'CATEGORIA_USUARIO_OBRIGATORIO')
    }
    return usuarioId
  }

  // ================= GETTERS =================

  get id()           { return this.#id }
  get nome()         { return this.#nome }
  get tipo()         { return this.#tipo }
  get cor()          { return this.#cor }
  get usuarioId()    { return this.#usuarioId }
  get ativa()        { return this.#ativa }
  get criadoEm()     { return this.#criadoEm }
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
      id:           this.#id,
      nome:         this.#nome,
      tipo:         this.#tipo,
      cor:          this.#cor,
      usuarioId:    this.#usuarioId,
      ativa:        this.#ativa,
      criadoEm:     this.#criadoEm,
      atualizadoEm: this.#atualizadoEm,
    }
  }
}