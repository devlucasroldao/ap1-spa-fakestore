import { ProductCard } from "./ProductCard.js";

export function ProductList(produtos, favoritosIds) {
    if (produtos.length === 0) {
        return `<p class="mensagem-vazia">Nenhum produto encontrado.</p>`;
    }

    const cards = produtos
        .map((produto) => ProductCard(produto, favoritosIds.has(produto.id)))
        .join("");

    return `<div class="product-list">${cards}</div>`;
}
