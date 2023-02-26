import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import styles from '/src/scss/components/StartDesktop.module.scss'
import Navbar from './Navbar'
import Footer from './Footer'
import { firestore } from '/src/firebase.js'
import {
  query,
  orderBy,
  collection,
  onSnapshot,
  limit,
  getCountFromServer
} from 'firebase/firestore'
import Leaderboard from './Leaderboard'


let collectionLength;
getCountFromServer(collection(firestore, 'scores'))
                  .then((snapshot) => {
                    collectionLength = snapshot.data().count;
                  })

export default function StartDesktop({setIsGameStart}) {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

   // Populate leaderboard data from database
   useEffect(() => {
    const q = query(collection(firestore, 'scores'), limit(5), orderBy('score', 'desc'), orderBy('time'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newLeaderboardData = [];
      querySnapshot.forEach((doc) => {
        newLeaderboardData.push(doc);
      });
      setLeaderboardData(newLeaderboardData);
    })

    return unsubscribe;
  }, [])

  const handleClickLeaderboard = () => {
    setShowLeaderboard((prev) => !prev)
  }

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
          <button 
            className={styles.btnLeaderboard}
            onClick={handleClickLeaderboard}
          >
            Leaderboard
          </button>
        </section>
        <div 
          hidden={!showLeaderboard}
          className={classNames(styles.leaderboard)}
        >
          <Leaderboard 
            leaderboardData={leaderboardData}
            setLeaderboardData={setLeaderboardData}
            collectionLength={collectionLength}
          />
        </div>
      </header>
      <Footer />
    </>
  )
}
