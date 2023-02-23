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
    const calculateVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    const landscape = window.matchMedia("(orientation: landscape)"); 

    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      setIsMobile(true);
      // Assign CSS custom variable for mobile styling of body's min-height
      window.addEventListener('resize', calculateVH);
      landscape.addEventListener('change', () => {
        // setTimeout fixes a bug on chrome where it takes time to calculate window.innerHeight on phone rotation
        setTimeout(() => {
          calculateVH();
        }, 100);
      })
    } else {
      setIsMobile(false);
    }

    return () => {
      window.removeEventListener('resize', calculateVH);
      landscape.removeEventListener('change', calculateVH);
    };
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
