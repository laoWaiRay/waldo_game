import classNames from "classnames"
import styles from '/src/scss/components/GameOver.module.scss'

export default function GameOver({setGameState, totalTimeElapsed, resetGameData, score}) {
  const handleClick = () => {
    setGameState('Ready');
    resetGameData();
  }

  return (
    <div className={classNames('fullscreen')}>
      <div className={classNames(styles.display)}>
        <div>
          You solved {score} {score === 1 ? 'puzzle' : 'puzzles'} in {totalTimeElapsed} seconds!
        </div>
        <button onClick={handleClick}>Try Again</button>
      </div>
    </div>
  )
}
