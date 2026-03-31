class Senha {
    constructor(valor) {
        if (valor.length < 6) {
            throw new Error("A senha deve ter no mínimo 6 caracteres.");
        }
        this.valor = valor;
        Object.freeze(this);
    }

    toString() {
        return this.valor;
    }
}

module.exports = Senha;
