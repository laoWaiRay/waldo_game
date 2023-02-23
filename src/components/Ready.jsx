import classNames from "classnames"
import styles from '/src/scss/components/Ready.module.scss'
import useCountdown from '/src/hooks/useCountdown.js'
import { useEffect, useState } from "react";

export default function Ready({setGameState, isLandscape}) {
  const [pauseCountdown, startCountdown, time, resetCountdown] = useCountdown(3);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    startCountdown();
  }, [])

  useEffect(() => {
    // Pause the timer if the phone is not in landscape mode
    if (!isLandscape) {
      setIsPaused(true);
      pauseCountdown();
    }
    else if (isPaused)
    {
      setIsPaused(false);
      startCountdown();
    }
  }, [isLandscape])

  useEffect(() => {
    if (time <= 0) {
      setGameState('Play')
    }
  }, [time])

  return (
    <div className={classNames('fullscreen')}>
      <div>
        <div>Get Ready</div>
        <div className={classNames(styles.countdown)}>{time}</div>
      </div>
    </div>
  )
}
