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

// ==========================
// MODAL LEGAL
// ==========================

const modalLegal = document.getElementById("modalLegal");
const modalTitol = document.getElementById("modalTitol");
const modalCos = document.getElementById("modalCos");

function obrirModalLegal(textLegal) {

    modalTitol.textContent = textLegal.titol;
    modalCos.innerHTML = textLegal.contingut;

    modalLegal.classList.remove("ocult");

}

// ---------- AVÍS LEGAL ----------

document.getElementById("avisLegal").addEventListener("click", function (e) {

    e.preventDefault();

    obrirModalLegal(textosLegals.avis);

});

// ---------- PRIVACITAT ----------

document.getElementById("privacitat").addEventListener("click", function (e) {

    e.preventDefault();

    obrirModalLegal(textosLegals.privacitat);

});

// ---------- COOKIES ----------

document.getElementById("cookies").addEventListener("click", function (e) {

    e.preventDefault();

    obrirModalLegal(textosLegals.cookies);

});

// ---------- TANCAR AMB LA X ----------

document.getElementById("tancarLegal").addEventListener("click", function () {

    modalLegal.classList.add("ocult");

});

// ---------- TANCAR CLICANT FORA ----------

modalLegal.addEventListener("click", function (e) {

    if (e.target === modalLegal) {
        modalLegal.classList.add("ocult");
    }

});

// ---------- TANCAR AMB ESC ----------

document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {
        modalLegal.classList.add("ocult");
    }

});