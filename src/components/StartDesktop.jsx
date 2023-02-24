import React from 'react'
import classNames from 'classnames'
import styles from '/src/scss/components/StartDesktop.module.scss'
import Navbar from './Navbar'
import Footer from './Footer'

export default function StartDesktop({setIsGameStart}) {
  return (
    <>
      <Navbar />
      <header className={classNames(styles.container, 'padding')}>
        <section className={classNames(styles.textBox)}>
          <p>
            Welcome to <span className='italics'>Where's Waldo?</span>, {' '}
            a photo-tagging game where you race to find {' '}
            <img src='/src/images/waldo.png' alt='Waldo' className={classNames('waldo')} /> {' '}
            before the time 
            runs out.
          </p>
          <p>
            You will have 1 minute per photo to find and tap on Waldo, and you 
            will get 1 point per successful find.
          </p>
          <p className='textCenter textLg'>
            Good luck!
          </p>
        </section>
        <section className={classNames(styles.flexContainer, 'padding')}>
          <button 
            className={styles.btnStart}
            onClick={() => setIsGameStart(true)}
          >
            Start
          </button>
          <button className={styles.btnLeaderboard}>Leaderboard</button>
        </section>
      </header>
      <Footer />
    </>
  )
}
