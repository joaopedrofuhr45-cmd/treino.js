import { AppError } from '../../errors/appError.js'


export class Email {
    #endereco
    constructor(endereco) {
        this.#validar(endereco)
        this.endereco = endereco.toLowerCase().trim()
    }


    #validar(endereco) {
        if (!endereco || typeof endereco !== "string") {

            throw new AppError('Email é obrigatório', 400)
        }
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!regex.test(endereco)) {
            throw new AppError('Email inválido', 400)
        }
    }

    get valor() {
        return this.#endereco
    }

}