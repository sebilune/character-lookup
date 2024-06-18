import './App.css'

import IconUpdate from './components/IconUpdate';
import CharacterInfo from './components/CharacterInfo'

function App() {
  return (
    <div className="App">
        <CharacterInfo initialSearch="" />
        <IconUpdate />
    </div>
  )
}

export default App
