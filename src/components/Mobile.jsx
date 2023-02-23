import classNames from 'classnames'
import { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Greeting from './Greeting'
import Start from './Start'
import Game from './Game'

export default function Mobile() {
  const [isGameStart, setIsGameStart] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const handleChangeOrientation = (event) => {
      setIsLandscape(event.matches);
    }

    const landscape = window.matchMedia("(orientation: landscape)");    
    landscape.addEventListener("change", handleChangeOrientation);
    return () => removeEventListener('change', handleChangeOrientation);
  }, [])

  // useEffect(() => {
  //   // When orientation changes, also change CSS custom --vh variable.
  //   // Need to set timeout to allow browser to calculate the new window height
  //   setTimeout(() => {
  //     console.log(window.screen.availHeight)
  //     console.log(window.innerHeight)
  //     const vh = window.innerHeight * 0.01;
  //     console.log('changing screen size to', vh)
  //     document.documentElement.style.setProperty('--vh', `${vh}px`);
  //   }, 200);
  // }, [isLandscape])

  return (
    <>
    {!isGameStart && !isLandscape &&
      <Navbar />
    }
    <main className='relative'>
      {isGameStart
        ? <Game 
          isLandscape={isLandscape}
        />
        : isLandscape
          ? <Start 
              setIsGameStart={setIsGameStart}
            />
            : <Greeting />
      }
    </main>
    </>
  )
}
