export class ValidadorBiblioteca {
    static titulo(titulo) {
        if (!titulo || typeof titulo !== 'string' || titulo.trim() === '')
            throw new Error("Título inválido")
    }

    static nome(valor) {
        if (!valor || typeof valor !== 'string' || valor.trim() === '')
            throw new Error("Nome inválido")
    }
}