class Email {
    constructor(valor) {
        if (!this.validar(valor)) {
            throw new Error("Formato de email inválido.");
        }
        this.valor = valor;
        Object.freeze(this);
    }

    validar(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    toString() {
        return this.valor;
    }
}

module.exports = Email;
