import AppError from '../../../../shared/errors/AppError.js'

export class ValidarCategoria {

  // ================= MÉTODO PÚBLICO =================

  validar(data) {
    return {
      nome: this.#validarNome(data.nome),
      tipo: this.#validarTipo(data.tipo),
      cor: this.#validarCor(data.cor),
      usuarioId: this.#validarUsuarioId(data.usuarioId),
    }
  }

  // ================= VALIDAÇÕES PRIVADAS =================

  #validarNome(nome) {
    if (!nome || typeof nome !== 'string') {
      throw new AppError('Nome é obrigatório', 400)
    }

    const nomeTratado = nome.trim()

    if (nomeTratado.length < 3) {
      throw new AppError('Nome deve ter ao menos 3 caracteres', 400)
    }

    if (nomeTratado.length > 50) {
      throw new AppError('Nome deve ter no máximo 50 caracteres', 400)
    }

    return nomeTratado
  }

  #validarTipo(tipo) {
    const tiposValidos = ['receita', 'despesa']

    if (!tiposValidos.includes(tipo)) {
      throw new AppError(
        `Tipo inválido. Use: ${tiposValidos.join(' | ')}`,
        400
      )
    }

    return tipo
  }

  #validarCor(cor) {
    if (!cor) return '#000000'

    const hexValido = /^#([0-9A-Fa-f]{6})$/.test(cor)

    if (!hexValido) {
      throw new AppError(
        'Cor deve ser um HEX válido ex: #FF5733',
        400
      )
    }

    return cor
  }

  #validarUsuarioId(usuarioId) {
    if (!usuarioId) {
      throw new AppError('usuarioId é obrigatório', 400)
    }

    return usuarioId
  }
}