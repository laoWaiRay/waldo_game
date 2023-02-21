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
    const landscape = window.matchMedia("(orientation: landscape)");
    setIsLandscape(landscape.matches);
    landscape.addEventListener("change", (event) => {
      setIsLandscape(event.matches);
      // When orientation changes, also change CSS custom vh variable
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
  }, [])

  useEffect(() => {
    console.log(isLandscape);
  }, [isLandscape])

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
