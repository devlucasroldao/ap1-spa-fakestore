# FakeStore SPA

SPA em JavaScript Vanilla (sem frameworks) que consome a [Fake Store API](https://fakestoreapi.com/products) e exibe os produtos em um catálogo navegável, com sistema de favoritos e busca.

## Como executar

Como o projeto usa módulos ES6 (`import`/`export`), não dá pra abrir o `index.html` direto no navegador (dois cliques) — isso é bloqueado por política de CORS do próprio navegador para `file://`. É preciso servir os arquivos por HTTP:

**Opção 1 - Live Server (VSCode)**
1. Instale a extensão "Live Server".
2. Clique com o botão direito em `index.html` → "Open with Live Server".

**Opção 2 - servidor local via terminal**
```bash
python3 -m http.server 8000
```
Depois acesse `http://localhost:8000` no navegador.

## Estrutura do projeto

```
projeto/
├── index.html
├── css/
│   └── style.css
└── js/
    ├── main.js                    # ponto de entrada, estado e eventos
    ├── utils.js                   # função de escape de HTML
    ├── services/
    │   ├── ApiService.js          # chamadas à Fake Store API
    │   ├── FavoritosService.js    # favoritos + localStorage
    │   └── TemaService.js         # tema claro/escuro + localStorage
    └── components/
        ├── Header.js               # navegação entre páginas
        ├── ProductCard.js          # card de um produto
        └── ProductList.js          # grade de produtos (usa ProductCard)
```

## Funcionalidades implementadas

- Consumo da Fake Store API via `fetch`, assíncrono, com tratamento de erro (erro HTTP e falha de rede) e botão de "Tentar novamente".
- Indicador de carregamento (spinner) durante a requisição.
- Listagem de produtos em cards (imagem, categoria, título, avaliação e preço).
- Sistema de favoritos: adicionar/remover, com persistência em `localStorage` entre sessões.
- Página de Favoritos, separada da página de Produtos, sem reload (troca de seção via JS).
- Busca por nome do produto (filtra em tempo real conforme digita).
- Layout responsivo (grid que se adapta para mobile, tablet e desktop).
- Código modularizado em ES6 (`import`/`export`), com responsabilidades separadas por arquivo.

### Bônus implementados

- Filtro por categoria (as opções são geradas dinamicamente a partir dos produtos retornados pela API).
- Alternância entre tema claro/escuro, com preferência salva em `localStorage`.

### Bônus não implementados

- Filtro por faixa de preço e por avaliação (rating) não foram implementados nesta entrega, por ser um projeto individual (esses dois itens são opcionais para entregas individuais, conforme o enunciado).

## Decisões técnicas

- A navegação entre "Produtos" e "Favoritos" é feita trocando o estado interno (`estado.paginaAtual`) e re-renderizando o conteúdo dentro de `#app`, sem nenhuma biblioteca de rotas e sem recarregar a página.
- O favoritar e a busca só re-renderizam o container de resultados (`#resultados`), não a página inteira — isso evita que o campo de busca perca o foco/cursor a cada tecla digitada, um problema comum nesse tipo de re-render ingênuo.
- Os favoritos são guardados no `localStorage` apenas como uma lista de IDs (não os produtos inteiros), e a lista completa de produtos é buscada uma vez na API a cada carregamento da página.
