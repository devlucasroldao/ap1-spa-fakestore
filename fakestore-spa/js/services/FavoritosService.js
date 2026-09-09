const CHAVE_FAVORITOS = "fakestore_favoritos";

export function getFavoritos() {
    const salvos = localStorage.getItem(CHAVE_FAVORITOS);
    const lista = salvos ? JSON.parse(salvos) : [];
    return new Set(lista);
}

export function alternarFavorito(id) {
    const favoritos = getFavoritos();

    if (favoritos.has(id)) {
        favoritos.delete(id);
    } else {
        favoritos.add(id);
    }

    localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify([...favoritos]));
    return favoritos;
}
