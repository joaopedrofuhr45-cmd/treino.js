import { AppError } from "../../errors/appError.js";
class Senha {
    #valor
    constructor(valor) {
        this.#validar(valor)
        this.#valor = valor
    }
    #validar(valor) {
        if (!valor || typeof valor !== "number") {
            throw new AppError("Senha é obrigatória", 400)
        }


        if (valor.length < 6) {
            throw new AppError("Senha deve ter no mínimo 6 caracteres", 400)
        }
    }


    get valor() {
        return this.#valor
    }
}