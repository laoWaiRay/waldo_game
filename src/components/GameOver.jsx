import classNames from "classnames"
import { useState, useRef, useEffect } from "react";
import Leaderboard from "./Leaderboard";
import styles from '/src/scss/components/GameOver.module.scss'
import Footer from '/src/components/Footer'
import Register from "./Register";
import { firestore } from '/src/firebase.js'
import {
  collection,
  addDoc,
  getCountFromServer
} from 'firebase/firestore';
import BadWordsFilter from "bad-words";

let initialCollectionLength;
getCountFromServer(collection(firestore, 'scores'))
                  .then((snapshot) => {
                    initialCollectionLength = snapshot.data().count;
                  })

export default function GameOver({setGameState, totalTimeElapsed, resetGameData, 
                                  score, isLandscape, leaderboardData, setLeaderboardData
                                }) {
  const [isFormShown, setIsFormShown] = useState(false);
  const [name, setName] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [collectionLength, setCollectionLength] = useState(initialCollectionLength);
  const registerRef = useRef(null);
  const inputRef = useRef(null);
  const saveBtnRef = useRef(null);

  const saveUserScore = async () => {
    const filter = new BadWordsFilter;
    await addDoc(collection(firestore, 'scores'), {
      name: filter.clean(name),
      score: score,
      time: totalTimeElapsed
    })
    setCollectionLength((prev) => prev + 1);
  }

  useEffect(() => {
    const handleClickEvent = (e) => {
      if(isFormShown 
          && registerRef.current 
          && !registerRef.current.contains(e.target)
          && saveBtnRef.current
          && !saveBtnRef.current.contains(e.target)) {
        setIsFormShown(false);
      }
    }
    document.addEventListener('click', handleClickEvent);

    return () => document.removeEventListener('click', handleClickEvent);
  }, [isFormShown])

  useEffect(() => {
    if (name.length <= 20)
      setError('');
  }, [name])

  const handleClickTryAgain = () => {
    setGameState('Ready');
    resetGameData();
  }

  const handleClickSave = async (e) => {
    e.preventDefault();
    if (isFormShown) {
      // Basic input validation
      if (name.length > 20) {
        setError('Name must be 20 characters or less');
        return;
      }

      inputRef.current.blur();
      setName('');
      setIsFormShown(false);
      setIsSaved(true);

      try {
        await saveUserScore();
      } catch (error) {
        console.error("Problem saving score data to database", error);
      }      
    } else {
      inputRef.current.focus();
      setIsFormShown(true);
    }
  }

  return (
    <div className={classNames('fullscreen')}>
      <div className={classNames(styles.gameOverGrid)}>
        <div className={classNames(styles.display)}>
          {(error && isFormShown)
            ? <div className={classNames(styles.error)}>{error}</div>
            : <div>
                You solved {score} {score === 1 ? 'puzzle' : 'puzzles'} in {totalTimeElapsed} seconds!
              </div>
          }
          <div>
            <button 
              onClick={handleClickTryAgain}
              className={classNames(styles.btn)}
            >
              Try Again
            </button>
            {!isSaved
              ? <button 
                  onClick={handleClickSave}
                  className={classNames(
                              styles.btn,
                              isFormShown && styles.active,
                              {'pulse': isFormShown && !error},
                              error && isFormShown && styles.btnDisabled
                            )}
                  ref={saveBtnRef}
                >
                  Save Score
                </button>
              : <button
                  className={classNames(styles.btnSaved)}
                  disabled
                >
                  Saved!
                </button>
            }
            
          </div>
        </div>
        <Leaderboard 
          leaderboardData={leaderboardData}
          setLeaderboardData={setLeaderboardData}
          collectionLength={collectionLength}
        />
        {!isLandscape &&
          <Footer />
        }
        <Register 
          isFormShown={isFormShown}
          name={name}
          setName={setName}
          isSaved={isSaved}
          setIsSaved={setIsSaved}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          inputRef={inputRef}
          registerRef={registerRef}
          handleClickSave={handleClickSave}
        />
      </div>
    </div>
  )
}
