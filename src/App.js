import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const initialArr = [];
  for (let i = 0; i < 64; i++) {
    initialArr.push({status: 'dead'})
  }
  const [cells, setCells] = useState(initialArr);
  const [count, setCount] = useState(0)
  const [gameOn, setGameOn] = useState(false);
  const [intervalId, setIntervalId] = useState();

  const boardWidth = 8;

  function generation() {
    console.log('GENERATION STARTED')
    let arr = [...cells];
    
    for (let i = 0; i < arr.length; i++) {
      let neighbours = [i - 1, i + 1, i - boardWidth, i - boardWidth - 1, i - boardWidth + 1, i + boardWidth, i + boardWidth - 1, i + boardWidth + 1];
      // TOP LEFT CORNER 
      if(i === 0) {
        neighbours = [i + 1, i + boardWidth, i + boardWidth + 1];
      } 
      // TOP RIGHT CORNER
      if(i === (boardWidth - 1)) {
        neighbours = [i - 1, i + boardWidth, i + boardWidth - 1];
      }
      // BOTTOM LEFT CORNER
      if (i === cells.length - boardWidth) {
        neighbours = [i - boardWidth, i - boardWidth + 1, i + 1]
      }
      //BOTTOM RIGHT CORNER
      if(i === cells.length - 1) {
        neighbours = [i - boardWidth, i - 1, i - boardWidth - 1]
      }
      // TOP BORDER
      if (i > 0 && i < boardWidth - 1) {
        neighbours = [i + 1, i - 1, i + boardWidth, i + boardWidth - 1, i + boardWidth + 1]
      }
      // LEFT BORDER
      if(i > 0 && i < cells.length - boardWidth && i%boardWidth === 0) {
        neighbours = [i + 1, i - boardWidth, i - boardWidth + 1, i + boardWidth, i + boardWidth + 1]
      }
      //RIGHT BORDER
      if (i > boardWidth && i < cells.length - 1 && (i + 1)%boardWidth === 0) {
        neighbours = [i - 1, i - boardWidth, i - boardWidth - 1, i + boardWidth, i + boardWidth - 1];
      }
      // BOTTOM BORDER
      if (i > (cells.length - boardWidth) && i < cells.length - 1) {
        neighbours = [i - 1, i + 1, i - boardWidth, i - boardWidth - 1, i - boardWidth + 1];
      }
            
      let aliveArr = [];
      neighbours.forEach((cellNum) => {
        if (cells[cellNum].status === 'alive') {
          aliveArr.push('alive')
        }
      })

      // Fewer than two or more than 3 live neighbours - dies
      if (aliveArr.length < 2 || aliveArr.length > 3) {
        arr[i] = {status: 'dead'};
        continue
      }
      if(cells[i].status === 'alive' && aliveArr.length === 2) {
        continue
      } 
      if(cells[i].status === 'alive' && aliveArr.length === 3) {
        continue
      }
      if(cells[i].status === 'dead' && aliveArr.length === 3) {
        arr[i] = {status: 'alive'};
      }
    }
    console.log(arr);
    setCells(arr);
    // console.log(arr.filter((item) => {
    //   return item.status === 'alive'
    // }))
  }

 

  function generationTest() {
    console.log('TEST STARTED')
    let arr = [...cells];
    for (let i = 0; i < cells.length; i++) {
      // First and last line not included yet
      if(i < 8 || i > 56) {
        continue
      }
      //
      const neighbours = [i - 1, i + 1, i - boardWidth, i - boardWidth - 1, i - boardWidth + 1, i + boardWidth, i + boardWidth - 1, i + boardWidth + 1];
      let aliveArr = [];
      //console.log(`${i} ${cells[i].status}`)

       if(cells[i].status === 'alive') {
        console.log(`cell ${i} is alive!`)
        //console.log('next neighbour is' + ' ' + arr[i + 1].status)
        for (let u = 0; u < 8; u++) {
          const num = neighbours[u];
          arr[num] = {status: 'alive'};
          console.log(arr[num].status)
          //console.log(`neighbour is: ${num} and it is ${arr[num].status}`);
          //arr[num].status = 'alive';
        }
        /* neighbours.forEach((neighbour) => {
          console.log(`neighbour is: ${neighbour} and it is ${arr[neighbour].status}`);
          arr[neighbour].status = 'alive'; 
        }) */
      } 
    }
    //console.log(arr)
    setCells(arr); 
    return
  }

 

  function populateCell(e) {
    const targetID = parseInt(e.target.id);
    let arr = [...cells];
    if (cells[targetID].status === 'dead') {
      arr[targetID].status = 'alive';
    }
    setCells(arr);
  }

  useEffect(() => {
    generation()
  }, [count])

  
  function handleClick() {
  
    //generation()
    // setInterval(() => {
    //   setCount((count) => count + 1)
    // }, 1000);

    if (gameOn === false) {
      const gameFlow = setInterval(() => {
        setCount((count) => count + 1)
      }, 1000);
      setIntervalId(gameFlow);
      setGameOn(true);
      console.log('interval set!')
      console.log(intervalId);
    } else {
      clearInterval(intervalId);
      setGameOn(false);
      console.log('interval cleared!')
    }
    
    
    
  }
  let cellHTML = cells.map((cell, index) => {
    if(cell.status === 'dead') {
      return <div className='cell' onClick={populateCell} id={index}></div>;
    } else {
      return <div className='cell alive' onClick={populateCell} id={index}></div>;
    }
  })
  useEffect(() => {
    console.log('cells updated!')
  }, [cells])
  
  return (
    <div className="App">
      <button onClick={handleClick}>Start</button>
      <span>Count is: {count}</span>
      <div className='board'>
        {cellHTML}
      </div>
    </div>
  );
}

export default App;
