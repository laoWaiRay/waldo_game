import { useState } from 'react'
import Game from './Game'
import StartDesktop from './StartDesktop'

export default function Desktop() {
  const [isGameStart, setIsGameStart] = useState(false)

  return (
    <main className='relative minHeight100vh flexCol'>
      {isGameStart
        ? <Game isLandscape={true} />
        : <StartDesktop setIsGameStart={setIsGameStart}/>
      }
    </main>
  )
}
