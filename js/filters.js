function omplirFiltres(llista) {

    const cmbCategoria = document.getElementById("filterCategoria");
    const cmbSubCategoria = document.getElementById("filterSubCategoria");
    const cmbOrganitzador = document.getElementById("filterOrganitzador");
    const cmbUbicacio = document.getElementById("filterUbicacio");

    cmbCategoria.innerHTML = '<option value="">Totes</option>';
    cmbSubCategoria.innerHTML = '<option value="">Totes</option>';
    cmbOrganitzador.innerHTML = '<option value="">Tots</option>';
    cmbUbicacio.innerHTML = '<option value="">Totes</option>';

    [...new Set(llista.map(a => a["Categoria"]))].sort().forEach(c => {
        cmbCategoria.innerHTML += `<option value="${c}">${c}</option>`;
    });

    [...new Set(llista.map(a => a["SubCategoria"]))].sort().forEach(s => {
        cmbSubCategoria.innerHTML += `<option value="${s}">${s}</option>`;
    });

    [...new Set(llista.map(a => a["NomOrganitzador"]))].sort().forEach(o => {
        cmbOrganitzador.innerHTML += `<option value="${o}">${o}</option>`;
    });

    [...new Set(llista.map(a => a["Ubicacio"]))].sort().forEach(u => {
        cmbUbicacio.innerHTML += `<option value="${u}">${u}</option>`;
    });

}

function actualitzarSubcategories() {

    const categoria = document.getElementById("filterCategoria").value;
    const cmbSubCategoria = document.getElementById("filterSubCategoria");

    cmbSubCategoria.innerHTML = '<option value="">Totes</option>';

    let subcategories = activitats;

    if (categoria !== "") {

        subcategories = activitats.filter(a =>
            a["Categoria"] === categoria
        );

    }

    [...new Set(subcategories.map(a => a["SubCategoria"]))]
        .sort()
        .forEach(s => {

            cmbSubCategoria.innerHTML +=
                `<option value="${s}">${s}</option>`;

        });

}

function activarFiltres() {

    document.getElementById("filterCategoria").addEventListener("change", () => {

    actualitzarSubcategories();

    document.getElementById("filterSubCategoria").value = "";

    filtrar();

});

    document.getElementById("filterSubCategoria").addEventListener("change", filtrar);

    document.getElementById("filterOrganitzador").addEventListener("change", filtrar);

    document.getElementById("filterUbicacio").addEventListener("change", filtrar);

    document.getElementById("filterAny").addEventListener("input", filtrar);

    document.getElementById("search").addEventListener("input", filtrar);

}

document.getElementById("btnResetFiltres").addEventListener("click", () => {

    document.getElementById("filterCategoria").value = "";
    document.getElementById("filterSubCategoria").value = "";
    document.getElementById("filterOrganitzador").value = "";
    document.getElementById("filterUbicacio").value = "";
    document.getElementById("filterAny").value = "";
    document.getElementById("search").value = "";

    actualitzarSubcategories();

    filtrar();

});