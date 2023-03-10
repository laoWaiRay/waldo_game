import classNames from "classnames"
import styles from '/src/scss/components/Leaderboard.module.scss'
import { useState, Fragment, useEffect } from "react"
import { ArrowCircleLeft, ArrowCircleRight } from "phosphor-react"
import { firestore } from '/src/firebase.js'
import {
  query,
  orderBy,
  collection,
  getDocs,
  limit,
  startAfter,
} from 'firebase/firestore'

const PAGINATION_LIMIT = 5; 

const initialCursor = query(collection(firestore, 'scores'), 
                            limit(PAGINATION_LIMIT), 
                            orderBy('score', 'desc'), 
                            orderBy('time'));

export default function Leaderboard({leaderboardData, setLeaderboardData, collectionLength}) {
  const [page, setPage] = useState(1);
  const [queryCursorHistory, setQueryCursorHistory] = useState([initialCursor]);
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [prevHovered, setPrevHovered] = useState(false);
  const [nextHovered, setNextHovered] = useState(false);

  const getNextPage = async () => {
    const documentSnapshots = await getDocs(queryCursorHistory[queryCursorHistory.length - 1]);
    const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    const next = query(collection(firestore, 'scores'),
                        orderBy('score', 'desc'), 
                        orderBy('time'),
                        limit(PAGINATION_LIMIT),
                        startAfter(lastVisible));
    const querySnapshot = await getDocs(next);
    const newLeaderboardData = [];
    querySnapshot.forEach((userData) => {
      newLeaderboardData.push(userData);
    })
    if (!newLeaderboardData.length)
      return;
    setLeaderboardData(newLeaderboardData);
    setQueryCursorHistory((prev) => {
      const newCursorHistory = [...prev];
      newCursorHistory.push(next);
      return newCursorHistory;
    })
    setPage((prev) => prev + 1);
  }

  const getPreviousPage = async () => {
    if (page === 1 || queryCursorHistory.length === 1)
      return;
    const history = [...queryCursorHistory];
    const newLeaderboardData = [];
    history.pop();
    const prevQueryCursor = history[history.length - 1];
    const querySnapshot = await getDocs(prevQueryCursor);
    querySnapshot.forEach((userData) => {
      newLeaderboardData.push(userData);
    })
    setLeaderboardData(newLeaderboardData);
    setQueryCursorHistory(history);
    setPage((prev) => prev - 1);
  }

  useEffect(() => {
    if (page === 1)
      setPrevDisabled(true);
    else
      setPrevDisabled(false);
    
    if (collectionLength <= (PAGINATION_LIMIT * page))
      setNextDisabled(true);
    else
      setNextDisabled(false);
  }, [page])

  const getScoreElements = () => {
    const scoreElements = leaderboardData.map((userData) => {
                            return <Fragment key={userData.id}>
                                    <span 
                                      className={classNames(styles.textOverflowEllipsis)}
                                    >
                                      {userData.data().name}
                                    </span>
                                    <span>{userData.data().score}</span>
                                    <span>{userData.data().time}</span>
                                  </Fragment>
                          });
    let fragmentId = Date.now();
    while (scoreElements.length < 5) {
      scoreElements.push(
        <Fragment key={fragmentId++}>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
        </Fragment>
      )
    }
    return scoreElements
  }

  return (
    <section className={classNames(styles.leaderboard)}>
      <div className={classNames(styles.heading)}>
        <h3>Leaderboard</h3>
        <div className={classNames(styles.btnContainer)}>
          <ArrowCircleLeft 
            size={32} 
            onClick={getPreviousPage}
            className={prevDisabled ? styles.btnDisabled : ''}
            color={(prevHovered && !prevDisabled) ? '#a30000' : '#bbbbbb'}
            onMouseEnter={() => setPrevHovered(true)}
            onMouseLeave={() => setPrevHovered(false)}
          />
          {page} / {Math.ceil(collectionLength / PAGINATION_LIMIT)}
          <ArrowCircleRight 
            size={32} 
            onClick={getNextPage}
            className={nextDisabled ? styles.btnDisabled : ''}
            color={(nextHovered && !nextDisabled) ? '#a30000' : '#bbbbbb'}
            onMouseEnter={() => setNextHovered(true)}
            onMouseLeave={() => setNextHovered(false)}
          />
        </div>
      </div>
      <div className={classNames(styles.scoresGrid)}>
        {/* Table Headings */}
        <span className={styles.scoresHeading}>Name</span>
        <span className={styles.scoresHeading}>Score</span>
        <span className={styles.scoresHeading}>Time</span>

        {
          getScoreElements()
        }
      </div>
    </section>
  )
}
