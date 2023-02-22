import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import GameOver from './GameOver'
import Play from './Play'
import PlayerInterface from './PlayerInterface'
import Ready from './Ready'
import Pause from './Pause'
import { firestore } from '/src/firebase.js'
import { collection, getDocs, query, where } from 'firebase/firestore'

const num_photos = 8;

export default function Game({isLandscape}) {
  const [gameState, setGameState] = useState('Ready');
  const [gameData, setGameData] = useState(null);
  const [puzzles, setPuzzles] = useState(new Array(num_photos).fill(0).map((elt, index) => index + 1));
  const [score, setScore] = useState(0);
  const initialRender = useRef(true);     // This fixes the weird double render bug in strict mode

  console.log('rendering with array', puzzles)

  const getGameState = () => {
    switch (gameState) {
      case 'Ready':     return <Ready setGameState={setGameState} />;
      case 'Play':      return <Play setGameState={setGameState} gameData={gameData} setScore={setScore} getGameData={getGameData} />;
      case 'GameOver':  return <GameOver setGameState={setGameState} />
    }
  }
  
  const getGameData = async () => {
    if (puzzles.length === 0) {
      setGameState('GameOver');
      return;
    }

    const id_index = Math.floor(Math.random() * puzzles.length);
    const id = puzzles[id_index];
    console.log(id_index, id)
    setPuzzles((prev) => {
      const newPuzzles = [...prev];
      newPuzzles.splice(id_index, 1);
      console.log('changed', newPuzzles)
      return newPuzzles;
    });
    
    const q = query(collection(firestore, 'images'), where('id', '==', id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setGameData(doc.data());
    });
  }

  useEffect(() => {
    if (initialRender.current) {
      console.log('called useEffect!')
      getGameData()
        .catch(console.error);
      initialRender.current = false;
    }
  }, [])

  return (
    <div className='height100vh'>
      {!isLandscape && <Pause />}
      <PlayerInterface 
        gameData={gameData}
        score={score}
      />
      {
        getGameState()
      }
    </div>
  )
}
