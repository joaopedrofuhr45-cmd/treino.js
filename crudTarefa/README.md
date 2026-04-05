# 🚀 API de Gerenciamento de Tarefas (Clean Architecture)

Este projeto é uma API RESTful profissional desenvolvida em **Node.js** e **Express**, seguindo os princípios da **Clean Architecture** e **Domain-Driven Design (DDD)**. Ele foi construído para demonstrar habilidades avançadas em organização de código, desacoplamento e boas práticas de desenvolvimento.

---

## 🏗️ Arquitetura do Projeto

O projeto está dividido em camadas claras para garantir que a lógica de negócio seja independente de frameworks externos:

- **Domain:** Contém as regras de negócio puras (Entidades, Value Objects e Erros de Domínio).
- **Application:** Orquestra os fluxos de dados através de Casos de Uso (Use Cases).
- **Infrastructure:** Implementa os detalhes técnicos como rotas HTTP, persistência de dados, middlewares e injeção de dependência.

---

## ✨ Principais Funcionalidades

- **Gerenciamento de Usuários:** Cadastro e busca de usuários com validação de e-mail e senha.
- **Gerenciamento de Tarefas:** Criação, listagem, busca e deleção de tarefas.
- **Regras de Negócio Avançadas:** Uma tarefa só pode ser deletada se estiver concluída ou atrasada.
- **Documentação Automática:** Documentação completa via **Swagger (OpenAPI)**.
- **Tratamento de Erros Centralizado:** Middleware global para captura e padronização de respostas de erro.
- **Injeção de Dependência:** Uso de um container manual para montagem da árvore de dependências.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** & **Express**
- **Swagger UI** (Documentação)
- **YAMLJS** (Leitura de arquivos de configuração)
- **Clean Architecture** & **DDD**

---

## 🚀 Como Rodar o Projeto

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Inicie o servidor:**
   ```bash
   npm start
   ```

3. **Acesse a documentação:**
   Abra o navegador em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## 📖 Documentação da API

A API possui uma interface visual para testes via Swagger. Ao rodar o projeto, acesse a rota `/api-docs` para visualizar todos os endpoints disponíveis, os modelos de dados esperados e realizar testes em tempo real.

---

## 👨‍💻 Autor

Desenvolvido como parte de um estudo aprofundado em arquitetura de software e desenvolvimento backend profissional.
