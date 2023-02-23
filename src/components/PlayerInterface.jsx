import classNames from "classnames"
import styles from '../scss/components/PlayerInterface.module.scss'
import useCountdown from '../hooks/useCountdown'
import { useEffect, useState } from "react";

export default function PlayerInterface({gameData, score, time}) {
  return (
    <div className={classNames(styles.bar)}>
      <span>{gameData?.name || ""}</span>
      <span>
        {time}
      </span>
      <span>Score: {score}</span>
    </div>
  )
}
