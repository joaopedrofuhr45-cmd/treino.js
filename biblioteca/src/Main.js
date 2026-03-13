import Biblioteca from './Biblioteca.js'
import { buscarLivro, buscarUsuario } from './buscarDados.js'

const biblioteca = new Biblioteca(buscarLivro, buscarUsuario)

await biblioteca.emprestar("Clean Code", "123.456.789-09")

const emprestimo = biblioteca.emprestimos[0]
await biblioteca.devolver(emprestimo)