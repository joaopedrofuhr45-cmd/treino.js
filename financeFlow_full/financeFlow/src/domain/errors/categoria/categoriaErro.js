import { AppError } from "../appError.js";
export class categoriNaoEncontradaError extends AppError {
    constructor() {
        super('Usuario não encontrado',404)
    }
}

