import React from 'react'
import classNames from 'classnames'
import RotatePhone from './svg/RotatePhone'
import Footer from './Footer'
import waldoIconUrl from '/src/assets/waldo.png'

export default function Greeting() {
  return (
    <div className='height100Mobile flexCol'>
    <header className={classNames('padding')}>
      <h2 className='italics textCenter'> Rules </h2>
      <p>
        Welcome to <span className='italics'>Where's Waldo?</span>, {' '}
        a photo-tagging game where you race to find {' '}
        <img src={waldoIconUrl} alt='Waldo' className={classNames('waldo')} /> {' '}
        before the time 
        runs out.
      </p>
      <p>
        You will have 1 minute per photo to find and tap on Waldo, and you 
        will get 1 point per successful find.
      </p>
      <div className='padding container'>
        <RotatePhone />
      </div>
    </header>
    <Footer />
    </div>
  )
}
