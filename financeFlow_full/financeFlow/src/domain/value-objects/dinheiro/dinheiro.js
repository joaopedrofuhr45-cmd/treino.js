import { AppError } from "../../errors/appError.js";

export class Dinheito {
    #quantia
    constructor(quantia) {
        this.#validar(quantia)
        this.#quantia = Number(quantia.toFixed(2))
    }


    #validar(quantia) {
        if (quantia == undefined || quantia == null) {
            throw new AppError("O valor é obirgatorio")
        }

        if (typeof quantia !== "number" || isNaN(quantia)) {
            throw new AppError("O valor deve ser um numero ")
        }
        if (quantia < 0) {
            throw new AppError("O valor não pode ser negativo")
        }
    }
}