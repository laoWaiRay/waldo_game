import classNames from "classnames"
import { useEffect } from "react";
import styles from '/src/scss/components/Play.module.scss'

const audio = new Audio("https://firebasestorage.googleapis.com/v0/b/waldogame-dda5b.appspot.com/o/sound_effects%2Fcorrect_beep.mp3?alt=media&token=714a561d-91ed-43dd-9fa9-b2b5f1fad357");

export default function Play({setGameState, gameData, setScore, getGameData, 
                              startCountdown, pauseCountdown, resetCountdown,
                              time, setTotalTimeElapsed, setIsStarted
                            }) {
  useEffect(() => {
    startCountdown();
    setIsStarted(true);
    return pauseCountdown;
  }, [])

  const isValidSolution = (playerX, playerY, solutionX, solutionY) => {
    const dx = Math.abs(playerX - solutionX);
    const dy = Math.abs(playerY - solutionY);
    // console.log(dx, dy)
    if (dx < 4 && dy < 4)
    // if (true) // testing only
      return true;
    else
      return false;
  }

  const handleClick = (e) => {
    const img = e.target;
    const ratio = img.naturalWidth / img.naturalHeight;
    const width = img.height * ratio;
    const rect = e.target.getBoundingClientRect();
    const difference = rect.width - width;
    let x = (e.clientX - rect.left);
    x -= (difference / 2);
    x /= width;
    x *= 100;
    let y = (e.clientY - rect.top) / rect.height;
    y *= 100;

    if (isValidSolution(x, y, gameData.x, gameData.y)) {
      audio.play();
      resetCountdown();
      setTotalTimeElapsed((prev) => prev + (60 - time))
      setGameState('Ready');
      setScore((prev) => prev + 1);
      getGameData();
    }
  }

  return (
    <div className={classNames(styles.container, 'fullscreen relative')}>
      <img 
        src={gameData.url} 
        alt="where's waldo puzzle" 
        className={classNames(styles.gameImage)}
        onClick={handleClick}
      />
    </div>
  )
}
