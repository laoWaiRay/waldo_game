import { useEffect, useRef, useState } from 'react'
import GameOver from './GameOver'
import Play from './Play'
import PlayerInterface from './PlayerInterface'
import Ready from './Ready'
import Pause from './Pause'
import { firestore } from '/src/firebase.js'
import {
  query,
  where,
  orderBy,
  collection,
  onSnapshot,
  getDocs,
  limit,
  startAfter
} from 'firebase/firestore'
import useCountdown from '../hooks/useCountdown'

const num_photos = 8;

export default function Game({isLandscape}) {
  const [pauseCountdown, startCountdown, time, resetCountdown] = useCountdown(1);

  const [isStarted, setIsStarted] = useState(false);
  const [gameState, setGameState] = useState('Ready');
  const [gameData, setGameData] = useState(null);
  const [puzzles, setPuzzles] = useState(new Array(num_photos).fill(0).map((elt, index) => index + 1));
  const [score, setScore] = useState(0);
  const [totalTimeElapsed, setTotalTimeElapsed] = useState(0);
  const initialRender = useRef(true);     // This fixes the weird double render bug in strict mode
  const isResetCalled = useRef(false);
  const [leaderboardData, setLeaderboardData] = useState([]);

  const getGameState = () => {
    switch (gameState) {
      case 'Ready':     return <Ready setGameState={setGameState} 
                                      isLandscape={isLandscape}
                                      setIsStarted={setIsStarted}
                                />;
      case 'Play':      return <Play setGameState={setGameState} 
                                     gameData={gameData} 
                                     setScore={setScore} 
                                     getGameData={getGameData}
                                     startCountdown={startCountdown}
                                     pauseCountdown={pauseCountdown}
                                     resetCountdown={resetCountdown}
                                     time={time}
                                     setTotalTimeElapsed={setTotalTimeElapsed}
                                     setIsStarted={setIsStarted}
                                />;
      case 'GameOver':  return <GameOver setGameState={setGameState}
                                         totalTimeElapsed={totalTimeElapsed}  
                                         resetGameData={resetGameData}
                                         score={score}
                                         isLandscape={isLandscape}
                                         leaderboardData={leaderboardData}
                                         setLeaderboardData={setLeaderboardData}
                                />
    }
  }

  // Populate leaderboard data from database
  useEffect(() => {
    const q = query(collection(firestore, 'scores'), limit(5), orderBy('score', 'desc'), orderBy('time'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newLeaderboardData = [];
      querySnapshot.forEach((doc) => {
        newLeaderboardData.push(doc);
      });
      setLeaderboardData(newLeaderboardData);
    })

    return unsubscribe;
  }, [])
  
  const getGameData = async () => {
    if (puzzles.length === 0) {
      setIsStarted(false);
      setGameState('GameOver');
      return;
    }

    const id_index = Math.floor(Math.random() * puzzles.length);
    const id = puzzles[id_index];
    setPuzzles((prev) => {
      const newPuzzles = [...prev];
      newPuzzles.splice(id_index, 1);
      return newPuzzles;
    });

    const q = query(collection(firestore, 'images'), where('id', '==', id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setGameData(doc.data());
      return;
    });
  }

  const resetGameData = () => {
    setPuzzles(new Array(num_photos).fill(0).map((elt, index) => index + 1));
    setScore(0);
    resetCountdown();
    setTotalTimeElapsed(0);
    isResetCalled.current = true;
  }

  useEffect(() => {
    if (initialRender.current) {
      console.log('first render of Game component!')
      getGameData()
        .catch(console.error);
      initialRender.current = false;
    }
  }, [])

  useEffect(() => {
    if (isResetCalled.current) {
      console.log('resetting data, current is: ', puzzles)
      getGameData()
        .catch(console.error);
      isResetCalled.current = false;
    }
  }, [isResetCalled.current])

  useEffect(() => {
    if (time <= 0)
    {
      setTotalTimeElapsed((prev) => prev + (60 - time))
      setIsStarted(false);
      setGameState('GameOver');
    }
  }, [time])

  useEffect(() => {
    if (!isStarted)
      return;

    if (isLandscape)
      startCountdown()
    else
      pauseCountdown()
  }, [isLandscape, isStarted])

  return (
    <div className='height100vh'>
      <PlayerInterface 
        gameData={gameData}
        score={score}
        time={time}
      />
      {!isLandscape && gameState !== 'GameOver' &&  <Pause />}
      {
        getGameState()
      }
    </div>
  )
}
