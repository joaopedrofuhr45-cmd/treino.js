import { AppError } from "../appError.js";
class TransacaoNaoEncontrada extends AppError{
    constructor(){
        super('a transação n foi feita por isso não foi encontrada', 404)
    }
}