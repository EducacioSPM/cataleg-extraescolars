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
Repository Dispatch Event
↓
GitHub Action
↓
data/catalog.json
↓
GitHub Pages
↓
Web pública
```

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
Create repository dispatch event
```

## Repository Dispatch

### Repository Owner

```text
EducacioSPM
```

### Repository Name

```text
cataleg-extraescolars
```

### Event Name

```text
update-catalog
```

### Event Payload

```json
{
  "catalog": <sortida del Compose>
}
```

---

# GitHub Action

Fitxer:

```text
.github/workflows/update-catalog.yml
```

## Funció

La GitHub Action:

1. Rep el payload enviat per Power Automate.
2. Extreu el contingut de:

```json
catalog
```

3. Sobreescriu:

```text
data/catalog.json
```

4. Fa commit automàtic.
5. Fa push automàtic al repositori.

---

# GitHub Pages

La web pública consumeix:

```javascript
fetch("data/catalog.json")
```

No es consumeixen dades directament de:

- SharePoint
- OneDrive

---

# Flux d'actualització

Quan una entitat modifica una activitat:

```text
SharePoint
↓
Power Automate
↓
GitHub Action
↓
data/catalog.json
↓
GitHub Pages
↓
Web actualitzada
```

Tot el procés és automàtic.

---

# Validació realitzada

## Power Automate

✅ Trigger funcionant

✅ Get Items funcionant

✅ Select funcionant

✅ Compose funcionant

✅ Repository Dispatch funcionant

---

## GitHub

✅ Recepció del payload

✅ GitHub Action executada

✅ Actualització de data/catalog.json

✅ Commit automàtic

✅ Push automàtic

---

## Web

✅ Lectura del catalog.json

✅ Filtres funcionant

✅ Fitxa de detall funcionant

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

La sincronització és automàtica.
