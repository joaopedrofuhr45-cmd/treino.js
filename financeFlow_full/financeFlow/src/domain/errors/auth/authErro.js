import { AppError } from "../appError.js";
class AuthImpossivel extends AppError{
    constructor(){
        super("A autenticação n foi possivel", 404)
    }
}