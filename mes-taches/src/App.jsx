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
