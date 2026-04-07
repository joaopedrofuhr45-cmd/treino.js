import { AppError } from "../appError.js";
class OrcamentoNaoEcontrado extends AppError {
    constructor() {
        super('Orçamento não foi feito por isso n pode ser encontrado', 404)
    }
}