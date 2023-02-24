import classNames from 'classnames'
import styles from '../scss/components/Navbar.module.scss'

export default function Navbar() {
  return (
    <div className={classNames(styles.navbar, 'padding')}>
      <h1>Where's Waldo?</h1>
    </div>
  )
}
