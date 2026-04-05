const UsuarioResponseDTO = require('../../../application/dtos/usuario/UsuarioResponseDTO');

class UsuarioPresenter {
    /**
     * Formata um único usuário para resposta HTTP (sem senha).
     * @param {Object} dados - dados brutos da entidade (usuario.dados)
     * @returns {Object} objeto serializado
     */
    static apresentar(dados) {
        return UsuarioResponseDTO.fromEntity(dados).toJSON();
    }

    /**
     * Formata uma lista de usuários para resposta HTTP (sem senhas).
     * @param {Object[]} lista - array de dados brutos (usuario.dados)
     * @returns {Object[]} array serializado
     */
    static apresentarLista(lista) {
        return lista.map(UsuarioPresenter.apresentar);
    }
}

module.exports = UsuarioPresenter;
