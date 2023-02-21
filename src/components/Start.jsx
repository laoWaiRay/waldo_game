import classNames from 'classnames'
import styles from '/src/scss/components/Start.module.scss'
import { FrameCorners } from 'phosphor-react'

export default function Start({setIsGameStart}) {
  // const handleClickFullscreen = (e) => {
  //   e.preventDefault();
  //   document.body.requestFullscreen();
  // }
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
      {/* <button 
        className={classNames(styles.fullscreen)}
        onClick={handleClickFullscreen}
      >
        <FrameCorners size="2rem" color='white'/>
      </button> */}
    </header>
  )
}
