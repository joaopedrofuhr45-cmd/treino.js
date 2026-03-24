const Usuario = require("../domain/usuario")

class UsuarioMapper {
    static paraDominio(dados) {
        return new Usuario(
            dados.id_usuario,
            dados.nome,
            dados.email,
            dados.senha,
            dados.criadoEm
        )
    }

    static paraPersistencia(usuario) {
        return {
            id_usuario: usuario.getId(),
            nome: usuario.getNome(),
            email: usuario.getEmail(),
            senha: usuario.getSenha(),
            criadoEm: usuario.getCriadoEm()
        }
    }
}

module.exports = UsuarioMapper