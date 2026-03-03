class ValidadorEstacionamento {
    // Verifica se o tipo do veículo é válido
    static tipo(valor) {
        if (valor !== "carro" && valor !== "moto" && valor !== "caminhão")
            throw new Error('Esse veículo é desconhecido')
    }

    // Verifica se a placa está no formato correto (antigo ou Mercosul)
    static placa(valor) {
        if (!/^[A-Z]{3}\d{4}$/.test(valor) && !/^[A-Z]{3}\d[A-Z]\d{2}$/.test(valor))
            throw new Error('Placa inválida')
    }
}

class Veiculo {
    #veiculo
    #placa
    #bancoDeDados

    constructor(dados, bancoDeDados) {
        this.#bancoDeDados = bancoDeDados
        this.veiculo = dados.veiculo
        this.placa = dados.placa
    }

    get veiculo() { return this.#veiculo }
    get placa() { return this.#placa }

    set placa(valor) {
        ValidadorEstacionamento.placa(valor) // valida o formato da placa
        const veiculoEncontrado = this.#bancoDeDados.find(obj => obj.placa === valor) // consulta o banco pela placa
        if (!veiculoEncontrado) // se não encontrou, rejeita
            throw new Error('Veículo não cadastrado')
        this.#placa = valor // salva a placa
        this.#veiculo = veiculoEncontrado.tipo // pega o tipo do banco e salva
    }
}



/*
=== MAPA MENTAL - SISTEMA DE ESTACIONAMENTO ===

✅ ValidadorEstacionamento — valida tudo com métodos static
    - static tipo(valor)  → valida se é carro, moto ou caminhão
    - static placa(valor) → valida formato da placa (antigo e Mercosul)

✅ Veiculo — consulta no bancoDeDados pela placa e pega o tipo
    - #placa
    - #veiculo (tipo)
    - #bancoDeDados

⬜ Vaga — sabe se está ocupada, qual veículo está nela, qual tipo aceita
    - a definir...

⬜ Estacionamento — controla as vagas, entrada e saída, cobrança
    - a definir...

=== BANCO DE DADOS ===
const bancoDeDados = [
  { placa: "ABC1234", tipo: "carro" },
  { placa: "XYZ9876", tipo: "moto" },
]

=== PRÓXIMO PASSO ===
Classe Vaga
*/
