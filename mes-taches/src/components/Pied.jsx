const ANNEE = new Date().getFullYear()

function Pied() {
  return (
    <footer className="pied">
      TP React – {ANNEE}
    </footer>
  )
}

export default Pied
