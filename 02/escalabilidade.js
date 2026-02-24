// O array com os dois objetos (antes da classe)
const produtos = [
    {
        nome: "Teclado Mecânico RGB",
        preco: 250.00,
        estoque: 45,
        especificacoes: "Switch Blue, ABNT2"
    },
    {
        nome: "Monitor 144Hz",
        preco: 1200.00,
        estoque: 12,
        especificacoes: "24 polegadas, Painel IPS"
    }
];

// Sua classe original
class Produto {
    constructor(dados) {
        this.nome = dados.nome
        this.preco = dados.preco
        this.quantidade = dados.estoque
        this.espec = dados.espec
    }

}

const listaDeProdutos = produtos.map(item => new loja(item));
