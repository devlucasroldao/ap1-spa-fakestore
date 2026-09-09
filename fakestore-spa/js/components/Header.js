export function Header(paginaAtual) {
    return `
        <header class="header">
            <div class="header__marca">FakeStore</div>
            <nav class="header__nav">
                <button class="header__link ${paginaAtual === "produtos" ? "ativo" : ""}" data-pagina="produtos">
                    Produtos
                </button>
                <button class="header__link ${paginaAtual === "favoritos" ? "ativo" : ""}" data-pagina="favoritos">
                    Favoritos
                </button>
            </nav>
            <button class="header__tema" data-acao="alternar-tema" title="Alternar tema" aria-label="Alternar tema">
                🌙
            </button>
        </header>
    `;
}
