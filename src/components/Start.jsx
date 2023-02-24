import classNames from 'classnames'
import styles from '/src/scss/components/Start.module.scss'

export default function Start({setIsGameStart}) {
  const handleClick = () => {
    setIsGameStart(true);
  }

  return (
    <header className={classNames(styles.start)}>
      <button 
        className={classNames(styles.btn)}
        onClick={handleClick}
      >
        Start
      </button>
    </header>
  )
}
