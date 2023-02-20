import React from 'react'
import classNames from 'classnames'
import styles from '../scss/components/Greeting.module.scss'
import RotatePhone from './svg/RotatePhone'

export default function Greeting() {
  return (
    <header>
      <h2 className='italics textCenter'> Rules </h2>
      <p>
        Welcome to <span className='italics'>Where's Waldo?</span>, {' '}
        a photo-tagging game where you race to find {' '}
        <img src='/src/images/waldo.png' alt='Waldo' className={classNames(styles.waldo)} /> {' '}
        before the time 
        runs out.
      </p>
      <p>
        You will have 1 minute per photo to find and tap on Waldo, and you 
        will get 1 point per successful find.
      </p>
      {/* <p>
        In order to begin the game, please turn your phone to landscape 
        mode.
      </p> */}
      <div className='container'>
        <RotatePhone />
      </div>
    </header>
  )
}
