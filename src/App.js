
import {useState} from 'react';
import confetti from 'canvas-confetti'
import {Square} from './componets/Square.jsx'
import { TURNS, WINNER_COMBOS } from './constants.js';
import { WinnerModal } from './componets/WinnerModal.jsx';

function App() {
  const  [board, setBoard] = useState( Array(9).fill(null) )
  const[turn, setTurn]=useState( TURNS.X )

  const [winner, setWinner] = useState(null)
  const resetGame=()=>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkWinner = (boardToCheck) => {
    for(const combo of WINNER_COMBOS){
      const [a, b, c] = combo
      if(
        boardToCheck[a] &&
        boardToCheck[a]===boardToCheck[b] &&
        boardToCheck[a]===boardToCheck[c]
      ){
        return boardToCheck[a]
     
    }
  }
  return null
}
const checkEndGame = (newBoard) => {
return newBoard.every((square)=> square !==null)
}
  const updateBoard = (index) =>{
    if(board[index] || winner) return
  
    const newBoard = [...board]
    newBoard[index]= turn
    setBoard(newBoard)
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn( newTurn )
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    }else if(checkEndGame(newBoard)){
      setWinner(false)
    }

  }
  return (
  <main className='board'>
    <h1 >Tic Tac toe</h1>
    <button onClick={resetGame}>Reset</button>
    <section className='game'>
      {
        board.map((_,index)=>{
          return (
          <Square
          key={index}
          index={index}
          updateBoard={updateBoard}
          >
            {board[index]}
          </Square>
        )})
      }
    </section>
    <section className='turn'>
      <Square isSelected={turn ===TURNS.X}>{TURNS.X}</Square>
      <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
    </section>
     <WinnerModal resetGame={resetGame} winner={winner}/>
  </main>
  );
}

export default App;
