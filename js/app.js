let activitats = [];

// Càrrega inicial

async function carregarActivitats() {

    const resposta = await fetch(
  `data/catalog.json?t=${Date.now()}`
);

    console.log(resposta);

    activitats = await resposta.json();

    omplirFiltres(activitats);
    activarFiltres();

    document.getElementById("numResultats").textContent =
        `${activitats.length} activitats disponibles`;

    pintarTargetes(activitats);

}

// Aplica tots els filtres

function filtrar() {

    const categoria = document.getElementById("filterCategoria").value;
    const subCategoria = document.getElementById("filterSubCategoria").value;
    const organitzador = document.getElementById("filterOrganitzador").value;
    const ubicacio = document.getElementById("filterUbicacio").value;   
    const any = document.getElementById("filterAny").value;
    const text = document.getElementById("search").value.trim().toLowerCase();
    

    let resultat = activitats;

    if (categoria !== "") {
        resultat = resultat.filter(a => a["Categoria"] === categoria);
    }

    if (subCategoria !== "") {
        resultat = resultat.filter(a => a["SubCategoria"] === subCategoria);
    }

    if (organitzador !== "") {
        resultat = resultat.filter(a => a["NomOrganitzador"] === organitzador);
    }
if (ubicacio !== "") {
    resultat = resultat.filter(a => a["Ubicacio"] === ubicacio);
}
    if (any !== "") {
        resultat = resultat.filter(a =>
            Number(any) >= Number(a["Max_AnyNaixement"]) &&
            Number(any) <= Number(a["Min_AnyNaixement"])
        );
    }

    if (text !== "") {

        resultat = resultat.filter(a =>

            (a["Title"] ?? "").toLowerCase().includes(text) ||
            (a["NomOrganitzador"] ?? "").toLowerCase().includes(text) ||
            (a["Categoria"] ?? "").toLowerCase().includes(text) ||
            (a["SubCategoria"] ?? "").toLowerCase().includes(text)

        );

    }

    document.getElementById("numResultats").textContent =
        `${resultat.length} activitats disponibles`;

    const totalPagines = Math.ceil(resultat.length / targetesPerPagina);

if (paginaActual > totalPagines) {
    paginaActual = 1;
}
    
        pintarTargetes(resultat);

}

// Inici de l'aplicació

carregarActivitats();