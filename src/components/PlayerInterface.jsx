import classNames from "classnames"
import styles from '../scss/components/PlayerInterface.module.scss'
import useCountdown from '../hooks/useCountdown'
import { useEffect, useState } from "react";

export default function PlayerInterface() {
  const [pauseCountdown, startCountdown, time, resetCountdown] = useCountdown(60);
  const [score, setScore] = useState(0);

  return (
    <div className={classNames(styles.bar)}>
      <span>Long long long long long long name</span>
      <span>
        {time}
      </span>
      <span>Score: {score}</span>
    </div>
  )
}
