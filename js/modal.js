function formatPreu(valor) {
    return Number(valor).toFixed(2).replace(".", ",") + " €";
}
function mostrarDetall(index) {

    const a = activitats[index];

    document.getElementById("modalBody").innerHTML = `

        <h2 class="fitxa-titol">${a["Title"]}</h2>

        <div class="fitxa-subtitol">
            ${a["NomOrganitzador"]}
            ·
            ${a["Categoria"]} · ${a["SubCategoria"]}
        </div>

        <section class="fitxa-seccio">
            <h3>Descripció</h3>
            <p>${a["DescripcioActivitat"]}</p>
        </section>

        <section class="fitxa-seccio">
            <h3>Informació pràctica</h3>

            <div class="fitxa-camp">
                <span class="fitxa-label">📍 Ubicació</span>
                <span class="fitxa-valor">${a["Ubicacio"]}</span>
            </div>

            <div class="fitxa-camp">
                <span class="fitxa-label">🕒 Horari</span>
                <span class="fitxa-valor">${a["HorariActivitat"]}</span>
            </div>

            <div class="fitxa-camp">
                <span class="fitxa-label">👧 Edats</span>
                <span class="fitxa-valor">
                    Nascuts entre ${a["Max_AnyNaixement"]} i ${a["Min_AnyNaixement"]}
                </span>
            </div>

            <div class="fitxa-camp">
                <span class="fitxa-label">📅 Període</span>
                <span class="fitxa-valor">${a["PeriodeActivitat"]}</span>
            </div>

            <div class="fitxa-camp">
                <span class="fitxa-label">🔄 Periodicitat</span>
                <span class="fitxa-valor">${a["Periodicitat"]}</span>
            </div>
        </section>

        <section class="fitxa-seccio">
            <h3>Cost</h3>

            <div class="fitxa-camp">
                <span class="fitxa-label">💶 Matrícula</span>
                <span class="fitxa-valor">${formatPreu(a["PreuMatricula"])}</span>
            </div>

            <div class="fitxa-camp">
    <span class="fitxa-label">💶 Quota mensual</span>
    <span class="fitxa-valor">${formatPreu(a["PreuMensual"])}</span>
</div>


            <div class="fitxa-camp">
                <span class="fitxa-label">💶 Altres quotes</span>
                <span class="fitxa-valor">${formatPreu(a["AltresQuotes"])}</span>
            </div>

            <div class="fitxa-camp">
                <span class="fitxa-label">📝 Concepte</span>
                <span class="fitxa-valor">${a["AltresQuotesConcepte"] ?? "-"}</span>
            </div>
        </section>

        <section class="fitxa-seccio">
            <h3>Organització</h3>

            <div class="fitxa-camp">
                <span class="fitxa-label">👥 Places</span>
                <span class="fitxa-valor">
                    Mínim: ${a["MinPlaces"] ?? "-"} ·
                    Màxim: ${a["MaxPlaces"] ?? "-"}
                </span>
            </div>

            <div class="fitxa-camp">
                <span class="fitxa-label">👨‍👩‍👧‍👦 Nombre de grups</span>
                <span class="fitxa-valor">${a["NGrups"] ?? "-"}</span>
            </div>
        </section>

    `;

    document.getElementById("modal")
        .classList.remove("ocult");
}

