import classNames from "classnames"
import styles from '/src/scss/components/Ready.module.scss'
import useCountdown from '/src/hooks/useCountdown.js'
import { useEffect } from "react";

export default function Ready({setGameState}) {
  const [pauseCountdown, startCountdown, time, resetCountdown] = useCountdown(3);

  useEffect(() => {
    startCountdown()
  }, [])

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
