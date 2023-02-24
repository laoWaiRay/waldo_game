import classNames from "classnames"
import { useState } from "react";
import Leaderboard from "./Leaderboard";
import styles from '/src/scss/components/GameOver.module.scss'
import Footer from '/src/components/Footer'
import Register from "./Register";

export default function GameOver({setGameState, totalTimeElapsed, resetGameData, score, isLandscape}) {
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormShown, setIsFormShown] = useState(false);

  const handleClickTryAgain = () => {
    setGameState('Ready');
    resetGameData();
  }

  const handleClickShowForm = () => {
    setIsFormShown((prev) => !prev);
  }

  return (
    <div className={classNames(styles.gameOverGrid)}>
      <div className={classNames(styles.display)}>
        <div>
          You solved {score} {score === 1 ? 'puzzle' : 'puzzles'} in {totalTimeElapsed} seconds!
        </div>
        <div>
          <button 
            onClick={handleClickTryAgain}
            className={classNames(styles.btn)}
          >
            Try Again
          </button>
          <button 
            onClick={handleClickShowForm}
            className={classNames(styles.btn)}
          >
            Save Score
          </button>
        </div>
      </div>
      <Leaderboard />
      {!isLandscape &&
        <Footer />
      }
      <Register 
        isFormShown={isFormShown}
      />
    </div>
  )
}
