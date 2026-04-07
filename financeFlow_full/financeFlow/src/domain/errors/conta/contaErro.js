import { AppError } from "../appError.js"; // importo a classe app error 
class ContaNaoEncontrada extends AppError {// faço uma classe para exibir a mensagem junto com o erro atraves do super
    constructor() {
        super('A conta n foi encontrada', 404)
    }
}