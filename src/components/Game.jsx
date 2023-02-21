import classNames from 'classnames'
import { useState } from 'react'
import GameOver from './GameOver'
import Play from './Play'
import PlayerInterface from './PlayerInterface'
import Ready from './Ready'
import Pause from './Pause'
import { storage } from '/src/firebase.js'
import {
  ref,
  getDownloadURL,
} from 'firebase/storage';

export default function Game({isLandscape}) {
  const [gameState, setGameState] = useState('Ready');
  const [gameData, setGameData] = useState(null);

  const getGameState = () => {
    switch (gameState) {
      case 'Ready':     return <Ready setGameState={setGameState}/>;
      case 'Play':      return <Play setGameState={setGameState}/>;
      case 'GameOver':  return <GameOver setGameState={setGameState}/>
    }
  }
  
  const getGameData = () => {
    
  }

  return (
    <div className='height100vh'>
      {!isLandscape && <Pause />}
      <PlayerInterface />
      {
        getGameState()
      }
    </div>
  )
}
