import React, { useEffect, useState } from 'react';
import { get } from 'lodash'
import './App.css';
import './snake.scss';

function App() {
  let [ width, setWidth ] = useState(20);
  let [ rotation, setRotation ] = useState(0);
  let [ left, setLeft ] = useState(0);
  let [ top, setTop ] = useState(0);
  let [ disabled, setDisabled ] = useState(false);
  let [intervalId, setIntervalId ] = useState();
  let [display, setDisplay ] = useState('none');
  let [foodLeft, setFoodLeft ] = useState();
  let [foodTop, setFoodTop] = useState();

  let positions = {
    0: {
      ArrowUp: 270,
      ArrowDown: 90
    },
    90: {
      ArrowRight: 0,
      ArrowLeft: 180 
    },
    180: {
      ArrowUp: 270,
      ArrowDown: 90
    },
    270: {
      ArrowRight: 0,
      ArrowLeft: 180 
    },
  }

  function showFood() {
    setFoodPosition();
    console.log(foodLeft)
    setDisplay('block')
  }

  function setFoodPosition() {
    const height = (window.innerHeight / 2) - 10;
    const width = (window.innerWidth / 2) - 10;
    let isNegative = parseInt(Math.random() * 2 - 1 + 1);
    let left = parseInt(Math.random() * width - 1 + 1)
    console.log('setFoodPosition', left)
    setFoodLeft(isNegative ? -left :  left);

    let right = parseInt(Math.random() * height - 1 + 1)
    isNegative = parseInt(Math.random() * 2 - 1 + 1);
    setFoodTop(isNegative ? -right : right);
  }

  function grow() {
    setWidth(width+10);
  }
  
  function rotate({ code }){
    setRotation(get( positions, `${rotation}.${code}`, rotation));
  }

  function start() {
    if (!disabled)
      setDisabled(true);

    let play = setInterval(() => {
      if (rotation === 0 )
        setLeft( left++ );

      if (rotation === 90 )
        setTop(top++);

      if (rotation === 180)
        setLeft( left-- );

      if (rotation === 270 )
        setTop(top--);
      
      if(top === foodTop && left === foodLeft) {
        grow()
        showFood()
      }

    }, 100);

    setIntervalId(play);
  }

  useEffect(() => {
    if (intervalId) 
      clearInterval(intervalId);

    start();

    if(display === 'none')
      showFood();
    // eslint-disable-next-line
  }, [rotation]);

  return (
    <div className="App" onKeyDown={rotate}>
      <div className="App-header" tabIndex="0">
        <div className="snake" style={{ width, transform : `translate(${left}px, ${top}px) rotate(${rotation}deg)` }}>
          <div className="snake-head"></div>
        </div>
        <div style={{ left: foodLeft, top: foodTop, display }} className="snake-food"></div>
      </div>
    </div>
  );
}

export default App;
