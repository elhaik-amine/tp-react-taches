const ANNEE = new Date().getFullYear()

function Pied({ auteur }) {
  return (
    <footer className="pied">
      TP React – réalisé par {auteur} – {ANNEE}
    </footer>
  )
}

export default Pied
