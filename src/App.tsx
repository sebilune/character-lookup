import './App.css'

import FaviconUpdate from './components/FaviconUpdate';
import CharacterInfo from './components/CharacterInfo'

function App() {
  return (
    <div className="App">
        <CharacterInfo initialSearch="" />
        <FaviconUpdate />
    </div>
  )
}

export default App
