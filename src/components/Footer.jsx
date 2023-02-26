import classNames from 'classnames'
import styles from '/src/scss/components/Footer.module.scss'
import odinLogoURL from "/odin-icon.svg"
import githubLogoURL from "/github-icon.svg"

export default function Footer() {
  return (
    <footer className={classNames(styles.footer)}>
      <a href='https://theodinproject.com'>
        Odin Project
        <img 
          src={odinLogoURL}
          alt="odin project logo" 
          className={classNames(styles.logo)}
        />
      </a>
      <span className={classNames(styles.divider)}> | </span>
      <a href="https://github.com/">
        LaoWaiRay
        <img
          src={githubLogoURL}
          alt="github logo" 
          className={classNames(styles.logo, styles.muted)}
        />
      </a>
    </footer>
  )
}
