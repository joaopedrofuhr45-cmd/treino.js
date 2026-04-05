const Usuario = require('../../../../domain/entities/usuario/usuario');

class UsuarioMapper {
    static paraDominio(dados) {
        return new Usuario(
            dados.id_usuario || dados.id,
            dados.nome,
            dados.email,
            dados.senha,
            dados.criadoEm
        );
    }

    static paraPersistencia(usuario) {
        return {
            id_usuario: usuario.getId(),
            nome:       usuario.getNome(),
            email:      usuario.getEmail(),
            senha:      usuario.getSenha(),
            criadoEm:   usuario.getCriadoEm()
        };
    }
}

module.exports = UsuarioMapper;
