import './index.scss'
import './scss/styles.scss'
import styles from './scss/components/App.module.scss'
import classNames from 'classnames'
import { firebaseApp, storage, firestore } from './firebase'
import Navbar from './components/Navbar'
import Mobile from './components/Mobile'
import Desktop from './components/Desktop'
import { useEffect, useState } from 'react'

function App() {
  const [isMobile, setIsMobile] = useState(false);
  // console.log(window.screen.orientation.type)
  useEffect(() => {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      setIsMobile(true);
      // Assign CSS custom variable for mobile styling of body's min-height
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    } else {
      setIsMobile(false);
    }
  }, [])
  
  return (
    <div className={classNames(styles.app)}>
      {isMobile 
        ? <Mobile />
        : <Desktop />
      }
    </div>
  )
}

export default App
