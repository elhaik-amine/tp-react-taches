# TP React – « Mes tâches »

> **Durée :** 2 heures · **Niveau :** débutant · **Outils :** Vite, React (JavaScript), Git, GitHub

Dans ce TP, vous allez construire pas à pas une petite application de gestion de tâches.
Chaque étape introduit **une seule notion nouvelle** et réutilise les précédentes.

| Étape | Notion | Durée indicative |
|---|---|---|
| 0 | Mise en place : GitHub, Vite, ressources | 15 min |
| 1 | Les **composants** et le JSX | 15 min |
| 2 | Passer des valeurs avec les **props** | 20 min |
| 3 | Les **événements** et le hook **`useState`** | 25 min |
| 4 | Formulaire contrôlé et **état dérivé** | 25 min |
| 5 | Le hook **`useEffect`** | 20 min |

À la fin du TP, votre application ressemblera à ceci :

```
┌───────────────────────────────────────────┐
│ Mes tâches                                │
│ Mon premier projet React                  │
├───────────────────────────────────────────┤
│ Heure actuelle      14:32:07              │
├───────────────────────────────────────────┤
│ Compteur   3    [−1] [+1] [Remettre à 0]  │
├───────────────────────────────────────────┤
│ Nouvelle tâche  [______________] [Ajouter]│
├───────────────────────────────────────────┤
│ Ma liste  [Toutes] [À faire] [Terminées]  │
│  ☑ Installer Node.js et Vite  [Supprimer] │
│  ☐ Gérer l'état avec useState [Supprimer] │
├───────────────────────────────────────────┤
│ Statistiques   5 au total · 2 · 3         │
└───────────────────────────────────────────┘
```

---

## Prérequis

- **Node.js 20.19 ou plus récent** (`node -v` pour vérifier). Téléchargement : <https://nodejs.org>
- **Git** installé et configuré (`git config --global user.name` et `user.email`)
- Un **compte GitHub**
- Un éditeur de code (VS Code recommandé)
- Bases de JavaScript : `const`/`let`, fonctions fléchées, tableaux (`map`, `filter`), objets, *spread* (`...`)

---

## Étape 0 – Mise en place (15 min)

### 0.1 Récupérer le dépôt

1. Sur la page GitHub de ce TP, cliquez sur **« Use this template » → « Create a new repository »**.
2. Nommez votre dépôt `tp-react-taches`, laissez-le **public** et validez.
3. Clonez **votre** dépôt (remplacez `VOTRE-COMPTE`) :

```bash
git clone https://github.com/VOTRE-COMPTE/tp-react-taches.git
cd tp-react-taches
```

Le dépôt contient :

```
tp-react-taches/
├── README.md          ← cet énoncé
└── ressources/
    ├── index.css      ← la feuille de style (fournie, à ne pas modifier)
    └── taches.json    ← des données pour l'étape 5
```

### 0.2 Créer le projet Vite

Depuis le dossier `tp-react-taches` :

```bash
npm create vite@latest mes-taches -- --template react
cd mes-taches
npm install
npm run dev
```

> Si l'outil vous pose des questions, acceptez les choix par défaut.
> Choisissez bien **JavaScript** (template `react`), **pas** TypeScript.

Ouvrez l'adresse affichée (en général <http://localhost:5173>) : la page d'accueil de Vite s'affiche.

### 0.3 Faire le ménage et ajouter les ressources

Dans `mes-taches/` :

1. **Supprimez** `src/App.css` et le dossier `src/assets/`.
2. **Remplacez** tout le contenu de `src/index.css` par celui de `../ressources/index.css`.
3. **Copiez** `../ressources/taches.json` dans le dossier `public/`.
4. Remplacez le contenu de `src/App.jsx` par :

```jsx
function App() {
  return <h1>Bonjour React !</h1>
}

export default App
```

5. Créez un dossier vide `src/components/` : tous vos composants iront dedans.

✅ **Vérification :** la page affiche « Bonjour React ! » sur un fond gris clair.

### 0.4 Premier commit

Depuis la racine du dépôt (`tp-react-taches`) :

```bash
git add .
git commit -m "Étape 0 : mise en place du projet Vite"
git push
```

> Le fichier `.gitignore` créé par Vite empêche d'envoyer `node_modules/` sur GitHub. **Ne le supprimez pas.**

---

## Étape 1 – Les composants (15 min)

### À retenir

- Un **composant** est une **fonction JavaScript** dont le nom commence par une **majuscule** et qui **retourne du JSX**.
- Le JSX ressemble à du HTML, avec quelques différences : `className` au lieu de `class`, toutes les balises doivent être fermées (`<br />`), et le composant retourne **un seul élément racine**.
- Entre accolades `{ }`, on peut insérer **n'importe quelle expression JavaScript**.
- Un composant s'utilise comme une balise : `<Entete />`.

### Travail demandé

Créez trois composants dans `src/components/`, chacun dans son propre fichier.

**`Entete.jsx`**, à recopier :

```jsx
function Entete() {
  return (
    <header className="entete">
      <h1>Mes tâches</h1>
      <p>Mon premier projet React</p>
    </header>
  )
}

export default Entete
```

**`ListeTaches.jsx`** retourne une liste `<ul className="liste-taches">` contenant **trois tâches écrites en dur**.
Chaque tâche suit cette structure :

```jsx
<li className="tache">
  <span className="titre">Comprendre les composants</span>
</li>
```

Ajoutez la classe `terminee` (`className="tache terminee"`) à l'une des tâches et observez le résultat.

**`Pied.jsx`** retourne un `<footer className="pied">` affichant « TP React – » suivi de l'**année en cours**, calculée en JavaScript.

> 💡 Calculez l'année **en dehors** de la fonction : `const ANNEE = new Date().getFullYear()`, puis affichez `{ANNEE}` dans le JSX.

Enfin, assemblez le tout dans `App.jsx` :

```jsx
import Entete from './components/Entete.jsx'
import ListeTaches from './components/ListeTaches.jsx'
import Pied from './components/Pied.jsx'

function App() {
  return (
    <div className="app">
      <Entete />
      <section className="carte">
        <h2>Ma liste</h2>
        <ListeTaches />
      </section>
      <Pied />
    </div>
  )
}

export default App
```

✅ **Vérification :** l'en-tête, une carte blanche avec trois tâches (dont une barrée) et le pied de page s'affichent.

```bash
git add .
git commit -m "Étape 1 : premiers composants"
git push
```

---

## Étape 2 – Les props (20 min)

### À retenir

- Les **props** sont les **paramètres** d'un composant. Elles se transmettent comme des attributs : `<Entete titre="Mes tâches" />`.
- Le composant les reçoit dans **un objet**, qu'on *déstructure* en général : `function Entete({ titre }) { … }`.
- Une valeur qui n'est pas une chaîne s'écrit entre accolades : `terminee={true}`, `taches={TACHES}`.
- La prop spéciale **`children`** contient ce qui est écrit **entre** les balises ouvrante et fermante du composant.
- Pour afficher une liste, on transforme un tableau avec **`map`**. Chaque élément produit doit avoir une prop **`key`** unique.
- Les props sont en **lecture seule** : un composant ne modifie jamais ses props.

### Travail demandé

1. **`Entete`** reçoit deux props, `titre` et `sousTitre`, et les affiche.
2. **`Pied`** reçoit une prop `auteur` et affiche : « TP React – réalisé par *auteur* – *année* ». Mettez **votre nom**.
3. Créez un composant **`Carte`** qui reçoit `titre` et `children` :

```jsx
function Carte({ titre, children }) {
  return (
    <section className="carte">
      <h2>{titre}</h2>
      {children}
    </section>
  )
}

export default Carte
```

4. Créez un composant **`Tache`** qui reçoit `titre` et `terminee` (un booléen) :
   - la classe du `<li>` vaut `"tache terminee"` si la tâche est terminée, sinon `"tache"` (utilisez l'opérateur ternaire `condition ? a : b`) ;
   - affichez ✅ ou ⬜ devant le titre selon `terminee`.
5. Modifiez **`ListeTaches`** pour qu'il reçoive une prop `taches` (un tableau) et affiche un composant `<Tache />` par élément :

```jsx
{taches.map((tache) => (
  <Tache key={tache.id} titre={tache.titre} terminee={tache.terminee} />
))}
```

   Si le tableau est vide, affichez plutôt `<p className="vide">Aucune tâche à afficher.</p>`.

6. Dans `App.jsx`, déclarez les données **au-dessus** de la fonction `App` et transmettez-les :

```jsx
const TACHES = [
  { id: 1, titre: 'Installer Node.js et Vite', terminee: true },
  { id: 2, titre: 'Comprendre les composants', terminee: true },
  { id: 3, titre: 'Passer des données avec les props', terminee: false },
  { id: 4, titre: "Gérer l'état avec useState", terminee: false },
]
```

   Utilisez `<Carte titre="Ma liste">` à la place de la `<section>` écrite à la main.

✅ **Vérification :**
- les 4 tâches s'affichent, les deux premières barrées ;
- votre nom apparaît dans le pied de page ;
- si vous remplacez `taches={TACHES}` par `taches={[]}`, le message « Aucune tâche à afficher. » s'affiche (remettez ensuite la bonne valeur) ;
- la console du navigateur (F12) n'affiche **aucun** avertissement concernant `key`.

```bash
git add .
git commit -m "Étape 2 : props, children et listes"
git push
```

---

## Étape 3 – Événements et `useState` (25 min)

### À retenir

- On réagit à un événement avec un attribut `onClick`, `onChange`, `onSubmit`, etc., auquel on passe **une fonction** :
  `onClick={() => faireQuelqueChose()}`. Attention, `onClick={faireQuelqueChose()}` (sans `() =>`) **appelle** la fonction dès l'affichage.
- **`useState`** donne une mémoire au composant :
  `const [valeur, setValeur] = useState(valeurInitiale)`.
- Appeler `setValeur(nouvelleValeur)` **met à jour l'état et réaffiche** le composant.
- **On ne modifie jamais l'état directement.** Pour un tableau, on en crée un **nouveau** avec `map`, `filter` ou `[...ancien, nouvel]`.
- Quand plusieurs composants ont besoin de la même donnée, on place l'état dans leur **parent commun** et on transmet aux enfants des **fonctions de rappel** via les props (`onSupprimer`, `onBasculer`…). C'est ce qu'on appelle **« remonter l'état »**.

### Partie A – Un compteur

Créez `src/components/Compteur.jsx` :

```jsx
import { useState } from 'react'

function Compteur() {
  const [valeur, setValeur] = useState(0)

  return (
    <>
      <p className="valeur-compteur">{valeur}</p>
      <div className="ligne">
        {/* À compléter : boutons −1, +1 et « Remettre à zéro » */}
      </div>
    </>
  )
}

export default Compteur
```

- Le bouton **+1** porte la classe `principal`.
- Le bouton **−1** est désactivé (`disabled={…}`) quand la valeur vaut 0.
- Affichez le compteur dans une `<Carte titre="Compteur">` de `App`.

> `<> … </>` est un **fragment** : il regroupe plusieurs éléments sans ajouter de balise au HTML.

### Partie B – Rendre la liste interactive

1. Dans `App.jsx`, renommez `TACHES` en `TACHES_INITIALES` et placez la liste dans un état :

```jsx
const [taches, setTaches] = useState(TACHES_INITIALES)
```

2. Toujours dans `App`, écrivez deux fonctions :

```jsx
function basculerTache(id) {
  setTaches(
    taches.map((tache) =>
      tache.id === id ? { ...tache, terminee: !tache.terminee } : tache,
    ),
  )
}

function supprimerTache(id) {
  // À compléter avec filter : garder toutes les tâches sauf celle dont l'id vaut id
}
```

3. Transmettez-les à `ListeTaches` via les props `onBasculer` et `onSupprimer`. `ListeTaches` les transmet à son tour à chaque `Tache`, ainsi que l'`id`.
4. Dans `Tache` :
   - remplacez l'émoji ✅/⬜ par une case à cocher : `<input type="checkbox" checked={terminee} onChange={() => onBasculer(id)} />` ;
   - ajoutez à droite un bouton `<button className="danger">Supprimer</button>` qui appelle `onSupprimer(id)`.

✅ **Vérification :**
- le compteur augmente, diminue, se remet à zéro, et le bouton −1 est grisé à 0 ;
- cocher une tâche la barre, la décocher la rétablit ;
- « Supprimer » retire la tâche ; après avoir tout supprimé, le message « Aucune tâche à afficher. » apparaît.

```bash
git add .
git commit -m "Étape 3 : événements et useState"
git push
```

---

## Étape 4 – Formulaire contrôlé et état dérivé (25 min)

### À retenir

- Un **champ contrôlé** tire sa valeur de l'état React : `value={titre}` et `onChange={(e) => setTitre(e.target.value)}`.
- Dans le gestionnaire `onSubmit` d'un formulaire, on appelle `event.preventDefault()` pour **empêcher le rechargement** de la page.
- Une **valeur dérivée** se **calcule** à partir de l'état ou des props à chaque affichage. **Ne la stockez pas** dans un `useState` (sinon vous risquez des incohérences).

### Travail demandé

**1. `FormulaireAjout`** reçoit une prop `onAjouter(titre)`.

```jsx
import { useState } from 'react'

function FormulaireAjout({ onAjouter }) {
  const [titre, setTitre] = useState('')

  function gererSoumission(event) {
    event.preventDefault()
    // À compléter :
    // - ignorer un titre vide ou composé uniquement d'espaces (trim)
    // - appeler onAjouter avec le titre nettoyé
    // - vider le champ
  }

  return (
    <form className="formulaire" onSubmit={gererSoumission}>
      <input
        type="text"
        value={titre}
        onChange={(event) => setTitre(event.target.value)}
        placeholder="Ex. : Réviser les hooks"
      />
      <button type="submit" className="principal">Ajouter</button>
    </form>
  )
}

export default FormulaireAjout
```

Le bouton **Ajouter** doit être désactivé tant que le champ est vide.

Dans `App`, écrivez la fonction `ajouterTache(titre)` qui ajoute `{ id: Date.now(), titre, terminee: false }` **à la fin** du tableau, puis affichez le formulaire dans une `<Carte titre="Nouvelle tâche">`.

**2. `Filtres`** reçoit `filtre` (la valeur courante) et `onChanger(nouveauFiltre)`. Il affiche trois boutons, **Toutes**, **À faire** et **Terminées**, qui correspondent aux valeurs `'toutes'`, `'actives'` et `'terminees'`.
Le bouton du filtre courant porte la classe `actif`.

> 💡 Définissez un tableau d'options `[{ valeur: 'toutes', libelle: 'Toutes' }, …]` et générez les boutons avec `map`, comme pour les tâches.

Dans `App` :
- ajoutez un état `const [filtre, setFiltre] = useState('toutes')` ;
- calculez **`tachesVisibles`** à partir de `taches` et de `filtre` (avec `filter`) ;
- passez `tachesVisibles` (et non `taches`) à `ListeTaches` ;
- placez `<Filtres />` dans la carte « Ma liste », au-dessus de la liste.

**3. `Statistiques`** reçoit `taches` et affiche le **total**, le nombre de tâches **terminées** et le nombre de tâches **restantes**, tous **calculés** (aucun `useState` dans ce composant). Structure attendue :

```jsx
<div className="stats">
  <div><strong>{total}</strong> au total</div>
  <div className="terminees"><strong>{terminees}</strong> terminée(s)</div>
  <div><strong>{restantes}</strong> à faire</div>
</div>
```

Affichez-le dans une `<Carte titre="Statistiques">`, en lui passant **toutes** les tâches.

✅ **Vérification :**
- on peut ajouter une tâche avec le bouton ou la touche Entrée, et le champ se vide ensuite ;
- une saisie composée uniquement d'espaces n'ajoute rien ;
- les filtres fonctionnent et le bouton actif est mis en évidence ;
- les statistiques se mettent à jour à chaque action et ne changent **pas** quand on change de filtre.

```bash
git add .
git commit -m "Étape 4 : formulaire contrôlé, filtres et statistiques"
git push
```

---

## Étape 5 – Le hook `useEffect` (20 min)

### À retenir

- **`useEffect(fonction, dépendances)`** exécute du code **après l'affichage**, pour se synchroniser avec le monde extérieur : minuteur, requête réseau, titre de l'onglet…
- Le **tableau de dépendances** indique **quand** l'effet doit se relancer :
  - `[]` : une seule fois, après le premier affichage ;
  - `[a, b]` : à chaque changement de `a` ou de `b` ;
  - sans tableau : après **chaque** affichage (rarement souhaitable).
- La fonction peut **retourner une fonction de nettoyage**, appelée quand le composant disparaît ou avant que l'effet ne se relance.
- En développement, React (`StrictMode`) monte, démonte puis remonte chaque composant **une fois de plus** pour vérifier que vos nettoyages sont corrects. Un effet qui s'exécute deux fois au démarrage est donc **normal**.

### Partie A – Une horloge

Créez `Horloge.jsx`, qui affiche l'heure dans un `<p className="horloge">` et se met à jour **chaque seconde** :

```jsx
import { useEffect, useState } from 'react'

function Horloge() {
  const [maintenant, setMaintenant] = useState(() => new Date())

  useEffect(() => {
    // À compléter :
    // 1. démarrer un setInterval qui met à jour « maintenant » toutes les 1000 ms
    // 2. retourner une fonction de nettoyage qui appelle clearInterval
  }, [])

  return <p className="horloge">{maintenant.toLocaleTimeString('fr-FR')}</p>
}

export default Horloge
```

Ajoutez-la dans une `<Carte titre="Heure actuelle">`.

### Partie B – Charger les tâches depuis un fichier JSON

Remplacez les données écrites en dur par celles de `public/taches.json`.

1. Dans `App`, l'état des tâches démarre **vide** : `useState([])`. Supprimez la constante `TACHES_INITIALES`.
2. Ajoutez deux états : `chargement` (initialement `true`) et `erreur` (initialement `null`).
3. Chargez les données dans un effet :

```jsx
useEffect(() => {
  let annule = false

  fetch('/taches.json')
    .then((reponse) => {
      if (!reponse.ok) throw new Error(`Erreur HTTP ${reponse.status}`)
      return reponse.json()
    })
    .then((donnees) => {
      if (!annule) setTaches(donnees)
    })
    .catch((err) => {
      if (!annule) setErreur(err.message)
    })
    .finally(() => {
      if (!annule) setChargement(false)
    })

  return () => {
    annule = true
  }
}, [])
```

4. Dans la carte « Ma liste », affichez :
   - `<p className="vide">Chargement des tâches…</p>` pendant le chargement ;
   - `<p className="erreur">…</p>` avec le message en cas d'erreur ;
   - sinon la liste.

> 💡 Rendu conditionnel : `{condition && <Element />}` n'affiche l'élément que si la condition est vraie.

### Partie C – Synchroniser le titre de l'onglet

Ajoutez un effet qui affiche le **nombre de tâches restantes** dans le titre de l'onglet, par exemple `(3) Mes tâches`.
L'effet ne doit se relancer que lorsque ce nombre change : quelle dépendance faut-il indiquer ?

✅ **Vérification :**
- l'heure avance chaque seconde ;
- les 5 tâches de `taches.json` s'affichent ;
- si vous renommez temporairement `fetch('/taches.json')` en `fetch('/inconnu.json')`, un message d'erreur rouge apparaît (remettez ensuite le bon nom) ;
- le titre de l'onglet change quand vous cochez, ajoutez ou supprimez une tâche.

```bash
git add .
git commit -m "Étape 5 : useEffect (horloge, chargement JSON, titre)"
git push
```

---

## Pour aller plus loin (bonus)

Si vous avez terminé en avance, choisissez un ou plusieurs défis (un commit par défi) :

1. **Sauvegarde locale :** enregistrez les tâches dans `localStorage` à chaque modification (avec un `useEffect`), et rechargez-les au démarrage si elles existent.
2. **Tout effacer :** ajoutez un bouton « Supprimer les tâches terminées », désactivé s'il n'y en a aucune.
3. **Modification :** un double-clic sur le titre d'une tâche permet de le modifier.
4. **Horloge masquable :** ajoutez un bouton qui affiche ou masque l'horloge. Ajoutez un `console.log` dans la fonction de nettoyage et observez quand elle est appelée.

---

## Restitution

Votre code est hébergé sur **GitHub**, et vous remettez **le lien de votre dépôt** dans **Google Classroom**.

### Vérifications avant la remise

- [ ] Le dépôt `tp-react-taches` est **public** sur votre compte.
- [ ] Il contient **au moins 6 commits**, de « Étape 0 » à « Étape 5 », avec les messages indiqués.
- [ ] Le dossier `node_modules/` **n'est pas** sur GitHub.
- [ ] Le projet démarre après un clonage :
  ```bash
  git clone https://github.com/VOTRE-COMPTE/tp-react-taches.git
  cd tp-react-taches/mes-taches
  npm install
  npm run dev
  ```
- [ ] `npm run lint` ne signale aucune erreur.
- [ ] Votre nom apparaît dans le pied de page.

### Remettre le lien dans Google Classroom

1. Copiez l'URL de votre dépôt, de la forme `https://github.com/VOTRE-COMPTE/tp-react-taches`.
2. Dans Google Classroom, ouvrez le devoir **« TP React – Mes tâches »**.
3. Dans le panneau **« Votre travail »**, cliquez sur **« + Ajouter ou créer » → « Lien »**, puis collez l'URL.
4. Cliquez sur **« Remettre »**.

> ⚠️ Seuls les commits **poussés** (`git push`) avant la date limite du devoir seront pris en compte. Vérifiez sur la page GitHub de votre dépôt que tout y est.
> Si vous poussez des corrections après avoir remis le devoir, inutile de le remettre à nouveau : le lien reste le même.

### Grille d'évaluation indicative (/20)

| Critère | Points |
|---|---|
| Étape 0 – Projet Vite propre, ressources intégrées, dépôt correct | 2 |
| Étape 1 – Composants séparés et assemblés | 2 |
| Étape 2 – Props, `children`, liste avec `key` | 3 |
| Étape 3 – Événements, `useState`, état remonté, mises à jour immuables | 4 |
| Étape 4 – Formulaire contrôlé, filtres, valeurs dérivées | 4 |
| Étape 5 – `useEffect` avec dépendances correctes et nettoyage | 3 |
| Qualité : commits réguliers et bien nommés, code lisible, lint sans erreur | 2 |
| *Bonus* | *+1 à +2* |

---

## Aide-mémoire

```jsx
// Composant avec props
function Bouton({ libelle, onClick }) {
  return <button onClick={onClick}>{libelle}</button>
}

// État
const [valeur, setValeur] = useState(0)
setValeur(valeur + 1)

// Mises à jour immuables d'un tableau
setListe([...liste, nouvelElement])                 // ajouter
setListe(liste.filter((e) => e.id !== id))          // supprimer
setListe(liste.map((e) => (e.id === id ? { ...e, fait: true } : e))) // modifier

// Effet avec nettoyage
useEffect(() => {
  const id = setInterval(tick, 1000)
  return () => clearInterval(id)
}, [])

// Rendu conditionnel
{estVide ? <p>Vide</p> : <Liste />}
{erreur && <p className="erreur">{erreur}</p>}
```

**Documentation officielle :** <https://fr.react.dev/learn>
