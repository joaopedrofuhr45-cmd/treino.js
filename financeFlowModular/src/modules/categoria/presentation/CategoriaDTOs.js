class ValdiarCategoria {
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

}