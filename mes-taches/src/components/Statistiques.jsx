function Statistiques({ taches }) {
  const total = taches.length
  const terminees = taches.filter((tache) => tache.terminee).length
  const restantes = total - terminees

  return (
    <div className="stats">
      <div><strong>{total}</strong> au total</div>
      <div className="terminees"><strong>{terminees}</strong> terminée(s)</div>
      <div><strong>{restantes}</strong> à faire</div>
    </div>
  )
}

export default Statistiques
