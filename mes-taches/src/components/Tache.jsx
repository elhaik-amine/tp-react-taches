function Tache({ titre, terminee }) {
  return (
    <li className={terminee ? 'tache terminee' : 'tache'}>
      <span className="titre">
        {terminee ? '✅' : '⬜'} {titre}
      </span>
    </li>
  )
}

export default Tache
