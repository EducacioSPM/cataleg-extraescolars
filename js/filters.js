function omplirFiltres(llista) {

    const cmbCategoria = document.getElementById("filterCategoria");
    const cmbSubCategoria = document.getElementById("filterSubCategoria");
    const cmbOrganitzador = document.getElementById("filterOrganitzador");

    cmbCategoria.innerHTML = '<option value="">Totes</option>';
    cmbSubCategoria.innerHTML = '<option value="">Totes</option>';
    cmbOrganitzador.innerHTML = '<option value="">Tots</option>';

    [...new Set(llista.map(a => a["Categoria"]))].sort().forEach(c => {
        cmbCategoria.innerHTML += `<option value="${c}">${c}</option>`;
    });

    [...new Set(llista.map(a => a["SubCategoria"]))].sort().forEach(s => {
        cmbSubCategoria.innerHTML += `<option value="${s}">${s}</option>`;
    });

    [...new Set(llista.map(a => a["NomOrganitzador"]))].sort().forEach(o => {
        cmbOrganitzador.innerHTML += `<option value="${o}">${o}</option>`;
    });

}

function activarFiltres() {

    document.getElementById("filterCategoria").addEventListener("change", filtrar);

    document.getElementById("filterSubCategoria").addEventListener("change", filtrar);

    document.getElementById("filterOrganitzador").addEventListener("change", filtrar);

    document.getElementById("filterAny").addEventListener("input", filtrar);

    document.getElementById("search").addEventListener("input", filtrar);

}