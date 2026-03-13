const API_URL = 'https://api.biblioteca.com'

export async function buscarLivro(titulo) {
    const resposta = await fetch(`${API_URL}/livros?titulo=${titulo}`)
    if (!resposta.ok) throw new Error("Erro ao buscar livro na API")
    return await resposta.json()
}

export async function buscarUsuario(cpf) {
    const resposta = await fetch(`${API_URL}/usuarios?cpf=${cpf}`)
    if (!resposta.ok) throw new Error("Erro ao buscar usuário na API")
    return await resposta.json()
}