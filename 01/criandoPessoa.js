class Pessoa {
    constructor() {
      this.nome = "";
      this.email = "";
      // o array 'this.lista' dentro do construtor não será usado aqui
      // pois estamos usando o 'bancoDeDados' externamente como você estruturou.
    }
  
    // 1. Captura os dados dos inputs e limpa espaços vazios
    buscandoDados() {
      const inputNome = document.querySelector('.nome');
      const inputEmail = document.querySelector('.email');
  
      if (inputNome && inputEmail) {
        this.nome = inputNome.value.trim();
        this.email = inputEmail.value.trim().toLowerCase();
      }
    }
  
    // 2. Valida se os dados seguem as regras (tamanho, formato, vazio)
    validandoDados() {
      // Verifica se campos estão vazios
      if (this.nome === "" || this.email === "") {
        console.error('Os campos não podem estar vazios.');
        return false;
      }
  
      // Verifica tamanho do nome e se contém números
      if (this.nome.length < 3 || /\d/.test(this.nome)) {
        console.error("Erro: Nome inválido (muito curto ou contém números).");
        return false;
      }
  
      // Valida o formato do e-mail usando Regex
      const emailPadrao = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailPadrao.test(this.email)) {
        console.error("Erro: O formato do e-mail não é aceito.");
        return false;
      }
  
      console.log("Dados validados com sucesso!");
      return true;
    }
  
    // 3. Método de checagem (Filtro de duplicados)
    cadastrarNoArray(lista) {
      // Só continua se passar na validação de formato
      if (!this.validandoDados()) return;
  
      // Verifica se já existe um objeto com o mesmo email no array
      const usuarioDuplicado = lista.some((obj) => obj.email === this.email);
      if (usuarioDuplicado) {
        console.error('Erro: O usuário com este e-mail já existe no sistema.');
        return;
      }
  
      // Se chegou aqui, está tudo limpo. Chama o método de criação.
      this.criandoPessoa(lista);
    }
  
    // 4. Método executor (Insere no array e limpa a tela)
    criandoPessoa(lista) {
      lista.push({
        nome: this.nome,
        email: this.email,
        id: Date.now() // Adiciona um ID único baseado no tempo para boa prática
      });
  
      console.log("Sucesso: Usuário adicionado ao array!");
      console.table(lista); // Mostra a lista bonitinha no console
      this.limparFormulario();
    }
  
    limparFormulario() {
      document.querySelector('.nome').value = "";
      document.querySelector('.email').value = "";
      // Reseta as propriedades da instância também
      this.nome = "";
      this.email = "";
    }
  }
  
  // --- EXECUÇÃO DO SCRIPT ---
  
  // 1. Criamos o array que servirá de banco de dados
  const bancoDeDados = [];
  
  // 2. Criamos a instância da classe
  const usuarioService = new Pessoa();
  
  // 3. Selecionamos o botão de cadastro
  const btnCadastrar = document.querySelector('#btn-enviar');
  
  // 4. Ouve evento de click
  if (btnCadastrar) {
    btnCadastrar.addEventListener('click', (event) => {
      event.preventDefault(); // Evita que a página recarregue se for um <form>
      usuarioService.buscandoDados(); // Primeiro busca
      usuarioService.cadastrarNoArray(bancoDeDados); // Filtra e depois cria
    });
  }
