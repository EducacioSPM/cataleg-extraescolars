let paginaActual = 1;
const targetesPerPagina = 6;

function obtenirIconaCategoria(categoria) {

    const icones = {

        "Arts escèniques": "assets/logos/Artsesceniques.png",
        "Arts plàstiques i disseny": "assets/logos/Artsplastiques.png",
        "Arts visuals": "assets/logos/Artsvisuals.png",
        "Esport": "assets/logos/Esports.png",
        "Llengües": "assets/logos/Llengues.png",
        "Suport escolar": "assets/logos/Suportescolar.png",
        "Lleure": "assets/logos/Lleure.png",
        "Cuina": "assets/logos/Cuina.png",
        "Ciència i tecnologia": "assets/logos/Ciencia.png"

    };

    return icones[categoria] || "";
}


function pintarTargetes(llista) {

    const contenidor = document.getElementById("cards-container");

    contenidor.innerHTML = "";

    const inici = (paginaActual - 1) * targetesPerPagina;
    const final = inici + targetesPerPagina;

    const activitatsPagina = llista.slice(inici, final);

    activitatsPagina.forEach((a) => {

        contenidor.innerHTML += `

        <article class="card">

        <img src="${obtenirIconaCategoria(a["Categoria"])}"
            class= "card-icon"
            alt="${a["Categoria"]}">
            
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
                💶 ${a["PreuMensual"]} €/mes
            </div>

            <button onclick="mostrarDetall(${activitats.indexOf(a)})">
                Més informació
            </button>

        </article>

        `;
    });

    pintarPaginacio(llista);
}

function pintarPaginacio(llista) {

    let paginacio = document.getElementById("paginacio");

    if (!paginacio) {

        paginacio = document.createElement("div");
        paginacio.id = "paginacio";

        document.getElementById("results")
            .appendChild(paginacio);
    }

    const totalPagines = Math.ceil(llista.length / targetesPerPagina);

    paginacio.innerHTML = `

        <button
            ${paginaActual === 1 ? "disabled" : ""}
            onclick="canviarPagina(-1)">
            ←
        </button>

        <span>
            Pàgina ${paginaActual} de ${totalPagines}
        </span>

        <button
            ${paginaActual === totalPagines ? "disabled" : ""}
            onclick="canviarPagina(1)">
            →
        </button>

    `;
}

function canviarPagina(direccio) {

    paginaActual += direccio;

    filtrar();
}