export class ValidarCategoria {
    static ValidarNovaCategoria(req, res, next) {
        const { nome } = req.body

        if (!nome) {
            return res.status(400).json("precisa inserir o nome da categoria para conntinuar")
        }

        if (nome.length < 3) {
            return res.status(400).json("O nome da categorai deve ter mais de 3 letras")
        }
        if (!descrição) {
            return res.status(400).json("precisa inserir a descrição da categoria para continuar")
        }


        if (descrição.length <= 5) {
            return res.status(400).json("A descrição precisa ter mais ou 5 letras para continuar")
        }
        next()
    }
}