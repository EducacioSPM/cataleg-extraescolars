# cataleg-extraescolars
# Catàleg d'activitats extraescolars

## Objectiu
Portal web públic per consultar l'oferta d'activitats extraescolars del municipi.
La informació s'introdueix a SharePoint i es publica automàticament a la web sense intervenció manual.

---

# Arquitectura
```text
SharePoint
↓
Power Automate
↓
Google Drive (compte definitiu del projecte, fitxer intermedi)
↓
GitHub Action (comprovació periòdica cada 5 min)
↓
data/catalog.json
↓
GitHub Pages
↓
Web pública
```

> **Nota històrica:** l'arquitectura original feia servir `Repository Dispatch
> Event` per enviar el JSON directament de Power Automate a GitHub. Es va
> descartar perquè aquest mètode té un límit de 64kb de payload, superat pel
> catàleg complet. Vegeu la secció "Decisions d'arquitectura" més avall per
> al detall complet de per què s'ha triat aquest disseny.

---

# Font de dades
La font de la veritat és la llista de SharePoint:
```text
Activitats Foraescola
```
No s'han de fer modificacions manuals a:
```text
data/catalog.json
```
Les modificacions sempre es fan a SharePoint.

---

# Power Automate

## Trigger
```text
When an item is created or modified
```

## Flux
```text
When an item is created or modified
↓
Get items
↓
Select
↓
Compose
↓
Update file (Google Drive)
```

## Compose
Converteix la sortida de `Select` a text JSON pla, imprescindible perquè
Google Drive rebi contingut vàlid de fitxer:
```text
inputs: string(body('Select'))
```

## Update file (Google Drive)
- **Connector:** Google Drive (compte personal, fora del tenant corporatiu)
- **Acció:** `Update file` (mai `Create file` en producció — Create genera
  un ID nou cada vegada i trenca l'enllaç públic)
- **File / File Id:** fixe, sempre el mateix identificador de fitxer
- **File Content:** sortida del `Compose`

El fitxer `catalog.json` a Google Drive està compartit com **"Qualsevol
persona amb l'enllaç"** (rol Lector), amb enllaç de descàrrega directa del
tipus:
```text
https://drive.google.com/uc?export=download&id=<FILE_ID>
```

> El compte de Google Drive fet servir és el compte **definitiu** del
> projecte (no un compte de proves). Tant l'enllaç complet com l'ID del
> fitxer estan guardats només al secret `CATALOG_JSON_URL` de GitHub i a
> la configuració de l'acció "Update file" de Power Automate — no es
> publiquen en aquest document per motius de seguretat. Si mai cal
> migrar a un altre compte, vegeu la secció "Manteniment" més avall.

---

# GitHub Action
Fitxer:
```text
.github/workflows/update-catalog.yml
```

## Trigger
```text
schedule: cron cada 5 minuts (mínim tècnic permès per GitHub Actions)
workflow_dispatch: execució manual
```

## Funció
La GitHub Action:
1. S'executa periòdicament (cada 5 minuts) o manualment.
2. Descarrega el `catalog.json` des de l'enllaç públic de Google Drive
   (secret `CATALOG_JSON_URL`).
3. Valida que el contingut és JSON vàlid.
4. Compara amb el `data/catalog.json` actual del repositori.
5. Si hi ha canvis, sobreescriu `data/catalog.json`, fa commit i push
   automàtics. Si no n'hi ha, no fa res (evita commits buits).

## Secrets necessaris
```text
CATALOG_JSON_URL → enllaç públic de descàrrega directa de Google Drive
```

## Permisos necessaris al workflow
```yaml
permissions:
  contents: write
```

---

# GitHub Pages
La web pública consumeix:
```javascript
fetch("data/catalog.json")
```
No es consumeixen dades directament de:
- SharePoint
- OneDrive
- Google Drive

---

# Flux d'actualització
Quan una entitat modifica una activitat:
```text
SharePoint
↓
Power Automate (Get items → Select → Compose → Update file)
↓
Google Drive (fitxer intermedi, actualitzat a l'instant)
↓
GitHub Action (el detecta en un màxim de ~5 minuts)
↓
data/catalog.json
↓
GitHub Pages
↓
Web actualitzada
```
Tot el procés és automàtic. El marge d'espera habitual entre una modificació
a SharePoint i la seva publicació a la web és d'uns 5 minuts (temps del cicle
de comprovació de la GitHub Action). GitHub no garanteix una execució exacta
del `cron` cada 5 minuts: en moments de càrrega alta del servei, alguna
execució es pot retardar o saltar-se, i la següent ho recull igualment. No
és un error, és un comportament conegut de GitHub Actions amb intervals
curts — per a aquest cas d'ús (catàleg d'activitats) no suposa cap problema
real.

---

# Decisions d'arquitectura

Diverses alternatives es van provar i descartar abans d'arribar al disseny
actual:

| Alternativa | Per què es va descartar |
|---|---|
| `Repository Dispatch Event` amb el JSON complet al payload | Límit de 64kb en el `client_payload`, superat pel catàleg |
| Enllaç directe de OneDrive/SharePoint corporatiu | El tenant bloqueja l'accés anònim automatitzat (Conditional Access); retorna sempre la pàgina de login en comptes del fitxer |
| Acció `HTTP` nativa de Power Automate | Connector premium en aquest tenant, no disponible |
| Connector `GitHub` → `Create or update file content` | Acció no disponible a la llista de connectors d'aquest entorn |
| Compte de Google Drive de proves (inicial) | Migrat al compte definitiu del projecte un cop validada l'arquitectura; el mecanisme (Update file amb ID fixe) es manté igual, només canvia el compte i l'ID del fitxer |

La solució final combina un **compte personal de Google Drive** com a
bústia intermèdia (fora de qualsevol política corporativa que bloquegi
l'accés anònim) amb una **GitHub Action que fa polling** (va a buscar el
fitxer ella mateixa) en comptes de dependre que Power Automate li faci
push directament — evitant així tant els límits de payload com els
bloquejos de seguretat del tenant.

---

# Validació realitzada

## Power Automate
✅ Trigger funcionant
✅ Get Items funcionant
✅ Select funcionant
✅ Compose funcionant
✅ Update file a Google Drive funcionant

---

## GitHub
✅ Descàrrega del fitxer des de Google Drive
✅ Validació de JSON
✅ GitHub Action executada (schedule + manual)
✅ Actualització de `data/catalog.json`
✅ Commit automàtic
✅ Push automàtic

---

## Web
✅ Lectura del catalog.json
✅ Filtres funcionant
✅ Fitxa de detall funcionant
✅ Camp Observacions mostrat a la fitxa de detall (condicional, només si té contingut)
✅ Desplegament GitHub Pages funcionant

---

# Manteniment

Per actualitzar la web:
1. Modificar les dades a SharePoint.
2. Guardar.

No cal:
- descarregar JSON
- copiar fitxers
- fer commits manuals

La sincronització és automàtica (amb un marge de fins a 5 minuts).

## Punts a vigilar

- **Compte de Google Drive:** el fitxer intermedi viu en un compte de
  Google (fora del tenant corporatiu de SharePoint). Cal tenir
  documentat qui hi té accés i com recuperar-lo si la persona
  responsable canvia de rol.
- **Organització de GitHub correcta:** aquest repositori pertany a
  l'organització `EducacioSPM` (`EducacioSPM/cataleg-extraescolars`),
  NO a `ObservatoriCiutatSPM` (una altra organització del mateix
  compte d'usuari). En comprovar execucions del workflow, fixeu-vos
  sempre en la ruta completa a la part superior de la pàgina de
  GitHub, no només en el nom d'usuari que apareix com a "triggered by".
- **Inactivitat de 60 dies:** GitHub desactiva automàticament els
  workflows amb `schedule` si el repositori no té cap activitat durant
  60 dies consecutius. Com que el propi workflow genera commits quan hi
  ha canvis reals, normalment s'evita sol, però si hi ha una temporada
  llarga sense inscripcions noves cal revisar-ho manualment a la
  pestanya Actions.
- **ID del fitxer de Google Drive:** és fixe i no s'ha de regenerar. Si
  mai cal recrear el fitxer, cal actualitzar tant l'acció `Update file`
  de Power Automate com el secret `CATALOG_JSON_URL` de GitHub amb el
  nou ID.

## Possibles millores futures
- Migrar a autenticació d'aplicació amb Azure AD (App Registration) +
  Microsoft Graph API, si l'informàtic de l'organització arriba a
  configurar-ho — eliminaria la dependència d'un compte personal de
  Google Drive.
