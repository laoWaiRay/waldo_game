import classNames from "classnames"
import styles from '/src/scss/components/Pause.module.scss'

export default function Pause() {
  return (
    <div className={classNames(styles.overlay, 'fullscreen')}>
      Paused
    </div>
  )
}
