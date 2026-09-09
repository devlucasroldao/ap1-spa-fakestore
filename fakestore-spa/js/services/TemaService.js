const CHAVE_TEMA = "fakestore_tema";

export function aplicarTemaSalvo() {
    const tema = localStorage.getItem(CHAVE_TEMA);
    if (tema === "escuro") {
        document.body.classList.add("tema-escuro");
    }
}

export function alternarTema() {
    document.body.classList.toggle("tema-escuro");
    const temaAtual = document.body.classList.contains("tema-escuro") ? "escuro" : "claro";
    localStorage.setItem(CHAVE_TEMA, temaAtual);
    return temaAtual;
}
