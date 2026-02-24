/**
 * [PILAR 1: ABSTRAÇÃO]
 * Definimos o molde "ContaBancaria" apenas com o que importa para o sistema: 
 * titular e saldo. Ignoramos CPF, endereço ou histórico, focando no essencial.
 */
 class ContaBancaria {
    // [PILAR 2: ENCAPSULAMENTO] 
    // O uso do '#' torna o atributo privado. Ninguém de fora pode alterar o saldo
    // para um valor absurdo sem passar pelas regras da classe.
    #saldo;
  
    constructor(titular, saldoInicial) {
      this.titular = titular;
      this.#saldo = saldoInicial;
    }
  
    /**
     * O GETTER (O "Porteiro" de Leitura)
     * O saldo é privado, então o mundo exterior (e os filhos) não o veem.
     * O 'get' cria uma propriedade pública que permite ler o valor do cofre.
     */
    get saldo() {
      return `R$ ${this.#saldo.toFixed(2)}`;
    }
  
    // O SETTER (O "Porteiro" de Escrita)
    // Permite alterar o dado privado, mas com uma regra de segurança.
    set depositar(valor) {
      if (valor > 0) {
        this.#saldo += valor;
      } else {
        console.log("Valor de depósito inválido!");
      }
    }
  
    /**
     * [PILAR 4: POLIMORFISMO]
     * Criamos o método 'exibirExtrato'. Ele "nasce" no pai para garantir que 
     * toda conta saiba se apresentar, mas cada tipo de conta fará isso de um jeito.
     */
    exibirExtrato() {
      return `Titular: ${this.titular} | Saldo: ${this.saldo}`;
    }
  }
  
  /**
   * [PILAR 3: HERANÇA]
   * A 'ContaEmpresarial' herda tudo de 'ContaBancaria' usando 'extends'.
   * Ela aproveita o código de titular, saldo e os métodos de depósito.
   */
  class ContaEmpresarial extends ContaBancaria {
    constructor(titular, saldoInicial, cnpj) {
      super(titular, saldoInicial); // Envia os dados para o molde pai
      this.cnpj = cnpj;
    }
  
    // [APLICANDO POLIMORFISMO]
    // Sobrescrevemos o método do pai para incluir o CNPJ no extrato.
    exibirExtrato() {
      return `[PJ] Empresa: ${this.titular} (CNPJ: ${this.cnpj}) | Saldo: ${this.saldo}`;
    }
  }
  
  // --- TESTANDO ---
  const minhaConta = new ContaEmpresarial("Tech Ltda", 1000, "00.000/0001-99");
  console.log(minhaConta.exibirExtrato()); 
  // Note que usamos 'minhaConta.saldo' (o Getter) como se fosse uma variável comum.

/*
OS 4 PILARES DA POO (PROGRAMAÇÃO ORIENTADA A OBJETOS)

1. ABSTRAÇÃO: Focar apenas no que é essencial para o sistema, 
   escondendo a complexidade desnecessária.

2. ENCAPSULAMENTO: Protege os dados da classe, restringindo o 
   acesso direto às variáveis e usando métodos para manipulá-las.

3. HERANÇA: Permite que uma classe filha aproveite atributos e 
   métodos de uma classe pai, evitando repetição de código.

4. POLIMORFISMO: Permite que diferentes classes filhas executem 
   o mesmo método de formas específicas (ex: som do cão vs som do gato).
*/
