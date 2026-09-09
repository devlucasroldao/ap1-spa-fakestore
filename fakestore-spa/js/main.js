import { buscarProdutos } from "./services/ApiService.js";
import { getFavoritos, alternarFavorito } from "./services/FavoritosService.js";
import { aplicarTemaSalvo, alternarTema } from "./services/TemaService.js";
import { Header } from "./components/Header.js";
import { ProductList } from "./components/ProductList.js";

const app = document.getElementById("app");

const estado = {
    produtos: [],
    paginaAtual: "produtos",
    termoBusca: "",
    categoriaFiltro: "todas",
};

function produtosFiltrados() {
    const favoritos = getFavoritos();
    let lista = estado.produtos;

    if (estado.paginaAtual === "favoritos") {
        lista = lista.filter((produto) => favoritos.has(produto.id));
    }

    if (estado.termoBusca.trim() !== "") {
        const termo = estado.termoBusca.trim().toLowerCase();
        lista = lista.filter((produto) => produto.title.toLowerCase().includes(termo));
    }

    if (estado.paginaAtual === "produtos" && estado.categoriaFiltro !== "todas") {
        lista = lista.filter((produto) => produto.category === estado.categoriaFiltro);
    }

    return lista;
}

function renderResultados() {
    const container = document.getElementById("resultados");
    if (!container) return;

    const favoritos = getFavoritos();
    container.innerHTML = ProductList(produtosFiltrados(), favoritos);
}

function renderEstrutura() {
    const categorias = [...new Set(estado.produtos.map((produto) => produto.category))];

    app.innerHTML = `
        ${Header(estado.paginaAtual)}
        <main class="conteudo">
            <div class="filtros">
                <input
                    type="text"
                    id="busca"
                    class="filtros__busca"
                    placeholder="Buscar produto por nome..."
                    value="${estado.termoBusca}"
                >
                ${
                    estado.paginaAtual === "produtos"
                        ? `
                    <select id="filtro-categoria" class="filtros__categoria">
                        <option value="todas">Todas as categorias</option>
                        ${categorias
                            .map(
                                (categoria) => `
                            <option value="${categoria}" ${categoria === estado.categoriaFiltro ? "selected" : ""}>
                                ${categoria}
                            </option>
                        `
                            )
                            .join("")}
                    </select>
                `
                        : ""
                }
            </div>
            <div id="resultados"></div>
        </main>
    `;

    renderResultados();
}

function mostrarLoading() {
    app.innerHTML = `
        ${Header(estado.paginaAtual)}
        <div class="status-carregamento">
            <div class="spinner"></div>
            <p>Carregando produtos...</p>
        </div>
    `;
}

function mostrarErro(mensagem) {
    app.innerHTML = `
        ${Header(estado.paginaAtual)}
        <div class="status-erro">
            <p>${mensagem}</p>
            <button id="tentar-novamente">Tentar novamente</button>
        </div>
    `;

    document.getElementById("tentar-novamente").addEventListener("click", iniciar);
}

function atualizarIconeTema() {
    const botaoTema = document.querySelector("[data-acao='alternar-tema']");
    if (botaoTema) {
        botaoTema.textContent = document.body.classList.contains("tema-escuro") ? "☀️" : "🌙";
    }
}

app.addEventListener("click", (evento) => {
    const pagina = evento.target.dataset.pagina;
    if (pagina) {
        estado.paginaAtual = pagina;
        estado.termoBusca = "";
        estado.categoriaFiltro = "todas";
        renderEstrutura();
        return;
    }

    const idFavorito = evento.target.dataset.favoritar;
    if (idFavorito) {
        alternarFavorito(Number(idFavorito));
        renderResultados();
        return;
    }

    if (evento.target.dataset.acao === "alternar-tema") {
        alternarTema();
        atualizarIconeTema();
    }
});

app.addEventListener("input", (evento) => {
    if (evento.target.id === "busca") {
        estado.termoBusca = evento.target.value;
        renderResultados();
    }
});

app.addEventListener("change", (evento) => {
    if (evento.target.id === "filtro-categoria") {
        estado.categoriaFiltro = evento.target.value;
        renderResultados();
    }
});

async function iniciar() {
    aplicarTemaSalvo();
    mostrarLoading();
    atualizarIconeTema();

    try {
        estado.produtos = await buscarProdutos();
        renderEstrutura();
        atualizarIconeTema();
    } catch (erro) {
        mostrarErro("Não foi possível carregar os produtos. Verifique sua conexão e tente novamente.");
        atualizarIconeTema();
    }
}

iniciar();
