class ValidadorConta {
    static nome(nomeInformado) {
        if (nomeInformado.length < 3)
            throw new Error("Nome muito curto, mínimo 3 letras")
        if (/\d/.test(nomeInformado))
            throw new Error("Nome não pode ter números")
    }

    static email(emailInformado) {
        if (!/^[\w.]+@[\w.]+\.[a-z]{2,}$/.test(emailInformado))
            throw new Error("Email inválido")
    }

    static cpf(cpfInformado) {
        const cpfLimpo = cpfInformado.replace(/\D/g, "")
        if (cpfLimpo.length !== 11) throw new Error("CPF inválido")
        if (/^(\d)\1+$/.test(cpfLimpo)) throw new Error("CPF inválido")

        let soma = 0
        for (let i = 0; i < 9; i++) soma += parseInt(cpfLimpo[i]) * (10 - i)
        let resto = soma % 11
        let primeiroDigitoVerificador = resto < 2 ? 0 : 11 - resto
        if (parseInt(cpfLimpo[9]) !== primeiroDigitoVerificador) throw new Error("CPF inválido")

        soma = 0
        for (let i = 0; i < 10; i++) soma += parseInt(cpfLimpo[i]) * (11 - i)
        resto = soma % 11
        let segundoDigitoVerificador = resto < 2 ? 0 : 11 - resto
        if (parseInt(cpfLimpo[10]) !== segundoDigitoVerificador) throw new Error("CPF inválido")
    }

    static saldo(saldoInformado) {
        if (typeof saldoInformado !== "number" || isNaN(saldoInformado))
            throw new Error("O saldo deve ser um número válido.")
        if (saldoInformado < 0)
            throw new Error("O saldo não pode ser negativo.")
    }
}

// ✅ URL base da API — troque pelo endereço real
const API_URL = "https://sua-api.com"

class Conta {
    #nome
    #cpf
    #email

    static async criar(dadosDaConta) {
        const novaConta = new Conta()
        await novaConta._inicializar(dadosDaConta)
        return novaConta
    }

    async _inicializar(dadosDaConta) {
        await this.#definirNome(dadosDaConta.nome)
        await this.#definirCpf(dadosDaConta.cpf)
        await this.#definirEmail(dadosDaConta.email)
    }

    async #definirNome(nomeInformado) {
        ValidadorConta.nome(nomeInformado) // valida o formato

        // ✅ consulta a API se o nome já existe
        const resposta = await fetch(`${API_URL}/contas?nome=${encodeURIComponent(nomeInformado)}`)
        const dados = await resposta.json()
        if (dados.existe) throw new Error("Esse nome já existe")

        this.#nome = nomeInformado
    }

    async #definirCpf(cpfInformado) {
        ValidadorConta.cpf(cpfInformado) // valida o formato

        // ✅ consulta a API se o CPF já existe
        const resposta = await fetch(`${API_URL}/contas?cpf=${encodeURIComponent(cpfInformado)}`)
        const dados = await resposta.json()
        if (dados.existe) throw new Error("Esse CPF já existe")

        this.#cpf = cpfInformado
    }

    async #definirEmail(emailInformado) {
        ValidadorConta.email(emailInformado) // valida o formato

        // ✅ consulta a API se o email já existe
        const resposta = await fetch(`${API_URL}/contas?email=${encodeURIComponent(emailInformado)}`)
        const dados = await resposta.json()
        if (dados.existe) throw new Error("Esse email já existe")

        this.#email = emailInformado
    }

    get nome() { return this.#nome }
    get cpf() { return this.#cpf }
    get email() { return this.#email }
}

class ContaCorrente extends Conta {
    #saldo = 0

    static async criar(dadosDaConta) {
        const novaConta = new ContaCorrente()
        await novaConta._inicializar(dadosDaConta)
        return novaConta
    }

    async _inicializar(dadosDaConta) {
        await super._inicializar(dadosDaConta) // inicializa nome, cpf, email
        this.#saldo = await this.#consultarSaldoNoBanco(dadosDaConta.cpf) // busca o saldo
    }

    async #consultarSaldoNoBanco(cpf) {
        // ✅ consulta a API pelo saldo do CPF informado
        const resposta = await fetch(`${API_URL}/contas/saldo?cpf=${encodeURIComponent(cpf)}`)
        const dados = await resposta.json()
        return dados.saldo ?? 0 // retorna saldo ou 0 se não encontrar
    }

    get saldo() { return this.#saldo }

    async sacar(valor) {
        ValidadorConta.saldo(valor)
        if (valor > this.#saldo) throw new Error("Saldo insuficiente")
        this.#saldo -= valor

        // ✅ notifica a API sobre o saque
        await fetch(`${API_URL}/contas/sacar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cpf: this.cpf, valor })
        })

        console.log(`Saque de R$${valor} efetuado. Saldo atual: R$${this.#saldo}`)
    }

    async depositar(valor) {
        ValidadorConta.saldo(valor)
        this.#saldo += valor

        // ✅ notifica a API sobre o depósito
        await fetch(`${API_URL}/contas/depositar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cpf: this.cpf, valor })
        })

        console.log(`Depósito de R$${valor} realizado. Saldo atual: R$${this.#saldo}`)
    }
}

async function main() {
    try {
        const novaConta = await Conta.criar(
            { nome: "João Silva", email: "joao@email.com", cpf: "123.456.789-09" }
        )
        console.log("Conta criada com sucesso!")
        console.log("Nome:", novaConta.nome)
        console.log("CPF:", novaConta.cpf)
        console.log("Email:", novaConta.email)
    } catch (erro) {
        console.error("Erro ao criar conta:", erro.message)
    }
}
main()