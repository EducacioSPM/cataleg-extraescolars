function mostrarDetall(index) {

    const a = activitats[index];

    document.getElementById("modalBody").innerHTML = `

        <h2>${a["Title"]}</h2>

        <hr>

        <p><strong>Organitzador</strong><br>${a["NomOrganitzador"]}</p>

        <p><strong>Categoria</strong><br>${a["Categoria"]} · ${a["SubCategoria"]}</p>

        <p><strong>Descripció</strong><br>${a["DescripcioActivitat"]}</p>

        <p><strong>Edat</strong><br>Nascuts entre ${a["Max_AnyNaixement"]} i ${a["Min_AnyNaixement"]}</p>

        <p><strong>Horari</strong><br>${a["HorariActivitat"]}</p>

        <p><strong>Periodicitat</strong><br>${a["Periodicitat"]}</p>

        <p><strong>Període</strong><br>${a["PeriodeActivitat"]}</p>

        <p><strong>Ubicació</strong><br>${a["Ubicacio"]}</p>

        <p><strong>Preu matrícula</strong><br>${a["PreuMatricula"]}</p>

        <p><strong>Preu mensual</strong><br>${a["PreuMensual"]}</p>

        <p><strong>Altres quotes</strong><br>${a["AltresQuotes"]}</p>

        <p><strong>Concepte</strong><br>${a["AltresQuotesConcepte"] ?? "-"}</p>

        <p><strong>Places</strong><br>Mínim: ${a["MinPlaces"]} · Màxim: ${a["MaxPlaces"] ?? "-"}</p>

        <p><strong>Nombre de grups</strong><br>${a["NGrups"]}</p>

       
    `;

    document.getElementById("modal").classList.remove("ocult");
    document.getElementById("modal").addEventListener("click", (e) => {
    if (e.target.id === "modal") {
    document.getElementById("modal").classList.add("ocult");
    document.getElementById("tancarModal").addEventListener("click", () => {
    document.getElementById("modal").classList.add("ocult");
});
    }
});

}