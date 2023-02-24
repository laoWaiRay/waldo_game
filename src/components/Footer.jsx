import classNames from 'classnames'
import styles from '/src/scss/components/Footer.module.scss'

export default function Footer() {
  return (
    <footer className={classNames(styles.footer)}>
      <a href='https://theodinproject.com'>
        Odin Project
        <img 
          src="/odin-icon.svg" 
          alt="odin project logo" 
          className={classNames(styles.logo)}
        />
      </a>
      <span className={classNames(styles.divider)}> | </span>
      <a href="https://github.com/">
        LaoWaiRay
        <img
          src="/github-icon.svg" 
          alt="github logo" 
          className={classNames(styles.logo, styles.muted)}
        />
      </a>
    </footer>
  )
}
