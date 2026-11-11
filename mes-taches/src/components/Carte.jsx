function Carte({ titre, children }) {
  return (
    <section className="carte">
      <h2>{titre}</h2>
      {children}
    </section>
  )
}

export default Carte
