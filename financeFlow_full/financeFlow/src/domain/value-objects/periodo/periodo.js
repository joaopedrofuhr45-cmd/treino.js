import { AppError } from "../../errors/appError";
export class Periodo {
    #inicio
    #fim
    constructor(inicio, fim) {
        this.validar(inicio, fim)
        this.inicio = new Date(inicio)
        this.fim = new Date(fim)
    }

    #validar(inicio, fim) {
        if (!inicio || !fim) {
            throw new AppError("PERIODO deve ter INICIO e FIM ", 400)
        }

        if (new Date(inicio) > new Date(fim)) {
            throw new AppError("O Periodo de INICIO não pode ser maior que o periodo FIM", 400)
        }
    }
}