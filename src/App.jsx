import GameBoard from "./components/GameBoard"
import Player from "./components/Player"

function App() {
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player initialName="Player 1" symbol="X" />
          <Player initialName="Player 1" symbol="X" />
        </ol>
        <GameBoard />
      </div>
    </main>
  )
}

export default App
