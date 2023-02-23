import classNames from "classnames"
import styles from '/src/scss/components/Ready.module.scss'
import useCountdown from '/src/hooks/useCountdown.js'
import { useEffect, useRef, useState } from "react";

export default function Ready({setGameState, isLandscape, setIsStarted}) {
  const [pauseCountdown, startCountdown, time, resetCountdown] = useCountdown(3);
  const isPaused = useRef(false);

  useEffect(() => {
    setIsStarted(false);
    startCountdown();
  }, [])

  useEffect(() => {
    // Pause the timer if the phone is not in landscape mode
    if (!isLandscape) {
      isPaused.current = true;
      pauseCountdown();
    }
    else if (isPaused.current)
    {
      isPaused.current = false;
      startCountdown();
    }
  }, [isLandscape, isPaused.current])

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
