const URL_PRODUTOS = "https://fakestoreapi.com/products";

export async function buscarProdutos() {
    const resposta = await fetch(URL_PRODUTOS);

    if (!resposta.ok) {
        throw new Error(`Erro ${resposta.status} ao buscar produtos na API`);
    }

    const dados = await resposta.json();
    return dados;
}
