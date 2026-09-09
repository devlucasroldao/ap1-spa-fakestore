import { escaparHtml } from "../utils.js";

export function ProductCard(produto, favoritado) {
    const titulo = escaparHtml(produto.title);
    const categoria = escaparHtml(produto.category);
    const preco = produto.price.toFixed(2);
    const avaliacao = produto.rating ? produto.rating.rate : "-";
    const totalAvaliacoes = produto.rating ? produto.rating.count : 0;

    return `
        <article class="product-card" data-id="${produto.id}">
            <button
                class="product-card__favorito ${favoritado ? "ativo" : ""}"
                data-favoritar="${produto.id}"
                title="${favoritado ? "Remover dos favoritos" : "Adicionar aos favoritos"}"
            >
                ${favoritado ? "♥" : "♡"}
            </button>
            <img class="product-card__imagem" src="${produto.image}" alt="${titulo}">
            <div class="product-card__corpo">
                <span class="product-card__categoria">${categoria}</span>
                <h3 class="product-card__titulo">${titulo}</h3>
                <p class="product-card__avaliacao">⭐ ${avaliacao} (${totalAvaliacoes})</p>
                <p class="product-card__preco">$ ${preco}</p>
            </div>
        </article>
    `;
}
