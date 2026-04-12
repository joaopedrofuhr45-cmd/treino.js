import { AppError } from "../appError.js";
class UsuarioNaoEncontrado extends AppError{
    constructor(){
        super('A conta não foi encontrada',404)
    }
}