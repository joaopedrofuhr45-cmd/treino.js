class ValidadorConta {
  static nome(valor) {
    if (valor.length < 3)
      throw new Error("Nome muito curto, mínimo 3 letras");
    if (/\d/.test(valor))
      throw new Error("Nome não pode ter números");
  }

  static email(valor) {
    if (!/^[\w.]+@[\w.]+\.[a-z]{2,}$/.test(valor))
      throw new Error("Email inválido");
  }

  static cpf(valor) {
    const cpfLimpo = valor.replace(/\D/g, "");

    if (cpfLimpo.length !== 11)
      throw new Error("CPF inválido");

    if (/^(\d)\1+$/.test(cpfLimpo))
      throw new Error("CPF inválido");

    let soma = 0;
    for (let i = 0; i < 9; i++)
      soma += parseInt(cpfLimpo[i]) * (10 - i);
    let resto = soma % 11;
    let primeiro = resto < 2 ? 0 : 11 - resto;

    if (parseInt(cpfLimpo[9]) !== primeiro)
      throw new Error("CPF inválido");

    soma = 0;
    for (let i = 0; i < 10; i++)
      soma += parseInt(cpfLimpo[i]) * (11 - i);
    resto = soma % 11;
    let segundo = resto < 2 ? 0 : 11 - resto;

    if (parseInt(cpfLimpo[10]) !== segundo)
      throw new Error("CPF inválido");
  }
}

class Conta {
  #nome;
  #email;
  #cpf;
  #bancoDeDados;

  constructor(dados, bancoDeDados) {
    this.#bancoDeDados = bancoDeDados;
    this.nome = dados.nome;
    this.email = dados.email;
    this.cpf = dados.cpf;
  }

  get nome() { return this.#nome; }
  get email() { return this.#email; }
  get cpf() { return this.#cpf; }

  set nome(valor) {
    ValidadorConta.nome(valor);
    if (this.#bancoDeDados.some(obj => obj.nome === valor))
      throw new Error("Esse nome já existe");
    this.#nome = valor;
  }

  set email(valor) {
    ValidadorConta.email(valor);
    if (this.#bancoDeDados.some(obj => obj.email === valor))
      throw new Error("Esse email já existe");
    this.#email = valor;
  }

  set cpf(valor) {
    ValidadorConta.cpf(valor);
    if (this.#bancoDeDados.some(obj => obj.cpf === valor))
      throw new Error("Esse CPF já existe");
    this.#cpf = valor;
  }
}

const bancoDeDados = [];

const conta = new Conta(
  { nome: "João", email: "joao@email.com", cpf: "123.456.789-09" },
  bancoDeDados
);

console.log(conta.nome);
console.log(conta.email);
console.log(conta.cpf);
