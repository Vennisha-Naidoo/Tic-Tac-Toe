import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function deriveWinner(gameBooard, players) {
  let winner;

  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBooard[combinations[0].row][combinations[0].column];
    const secondSquareSymbol = gameBooard[combinations[1].row][combinations[1].column];
    const thirdSquareSymbol = gameBooard[combinations[2].row][combinations[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }

  }

  return winner;
}

function deriveGameBoard(gameTurns) {
  let gameBooard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBooard[row][col] = player;
  }

  return gameBooard;
}

function App() {

  const [players, setPlayers] = useState(PLAYERS);

  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBooard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBooard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {

      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer }, 
        ...prevTurns
      ];

      return updatedTurns;

    })
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={ PLAYERS.X } symbol="X" isActive={ activePlayer === 'X' } onChangeName={ handlePlayerNameChange } />
          <Player initialName={ PLAYERS.O } symbol="O" isActive={ activePlayer === 'O' } onChangeName={ handlePlayerNameChange } />
        </ol>
        { (winner || hasDraw) && <GameOver winner={ winner } onRestart={ handleRestart } /> }
        <GameBoard onSelectSquare={ handleSelectSquare } board={ gameBooard } />
      </div>
      <Log turns={ gameTurns } />
    </main>
  )
}

export default App
