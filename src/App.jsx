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
    } else {
      setIsMobile(false);
    }
  }, [])
  
  return (
    <div className={classNames(styles.app)}>
      <Navbar />
      {isMobile 
        ? <Mobile />
        : <Desktop />
      }
    </div>
  )
}

export default App
