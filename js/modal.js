function formatPreu(valor) {
    return Number(valor || 0)
        .toFixed(2)
        .replace(".", ",") + " €";
}

function mostrarDetall(index) {

    const a = activitats[index];

    document.getElementById("fitxa-detall-content").innerHTML = `

        <h2 class="fitxa-titol">${a["Title"]}</h2>

        <div class="fitxa-subtitol">
            ${a["NomOrganitzador"]}
            ·
            ${a["Categoria"]} · ${a["SubCategoria"]}
        </div>

        <section class="fitxa-seccio">

   <section class="fitxa-seccio">

    <h3>Descripció</h3>

    <p id="descripcioText">
        ${
            a["DescripcioActivitat"].length > 180
                ? a["DescripcioActivitat"].substring(0, 180) + "..."
                : a["DescripcioActivitat"]
        }
    </p>

    ${
        a["DescripcioActivitat"].length > 180
            ? `<button
                    type="button"
                    id="toggleDescripcio"
                    data-curta="${a["DescripcioActivitat"].substring(0, 180)}..."
                    data-completa="${a["DescripcioActivitat"]}">
                    Veure més
               </button>`
            : ""
    }

</section>
    
    

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

            <div class="fitxa-camp">
    <span class="fitxa-label">👥 Places</span>
    <span class="fitxa-valor">
        ${a["MinPlaces"] ?? "-"}-${a["MaxPlaces"] ?? "-"} ·
        Grups ${a["NGrups"] ?? "-"}
    </span>
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
        
    `;

    document.getElementById("fitxa-detall")
    .classList.remove("ocult");

    const btnDescripcio = document.getElementById("toggleDescripcio");

if (btnDescripcio) {

    btnDescripcio.addEventListener("click", () => {

        const text = document.getElementById("descripcioText");

        if (btnDescripcio.textContent === "Veure més") {

            text.textContent = btnDescripcio.dataset.completa;
            btnDescripcio.textContent = "Veure menys";

        } else {

            text.textContent = btnDescripcio.dataset.curta;
            btnDescripcio.textContent = "Veure més";

        }

    });

}

}


