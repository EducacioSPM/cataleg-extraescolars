function pintarTargetes(llista) {

    const contenidor = document.getElementById("cards-container");

    contenidor.innerHTML = "";

    llista.forEach((a) => {

        contenidor.innerHTML += `

        <article class="card">

            <h3>${a["Title"]}</h3>

            <div class="categoria">
                ${a["Categoria"]} · ${a["SubCategoria"]}
            </div>

            <div class="organitzador">
                🏫 ${a["NomOrganitzador"]}
            </div>

            <div>
                👧 Nascuts entre ${a["Max_AnyNaixement"]} i ${a["Min_AnyNaixement"]}
            </div>

            <div>
                🕒 ${a["HorariActivitat"]}
            </div>

            <div class="preu">
                💶 ${a["PreuMensual"]}
            </div>

            <button onclick="mostrarDetall(${activitats.indexOf(a)})">
                Més informació
            </button>

        </article>

        `;

    });

}