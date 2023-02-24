import classNames from "classnames"
import styles from '/src/scss/components/Leaderboard.module.scss'

export default function Leaderboard() {
  return (
    <section className={classNames(styles.leaderboard)}>
      <h3 className={classNames(styles.heading)}>Leaderboard</h3>
      <div className={classNames(styles.scoresGrid)}>
        <span className={styles.scoresHeading}>Name</span>
        <span className={styles.scoresHeading}>Score</span>
        <span className={styles.scoresHeading}>Time</span>

        <span>Steve Jobs</span>
        <span>8</span>
        <span>1 second</span>

        <span>Steve Jobs</span>
        <span>8</span>
        <span>1 second</span>

        <span>Steve Jobs</span>
        <span>8</span>
        <span>1 second</span>

        <span>Steve Jobs</span>
        <span>8</span>
        <span>1 second</span>

        <span>Steve Jobs</span>
        <span>8</span>
        <span>1 second</span>

        <span>Steve Jobs</span>
        <span>8</span>
        <span>1 second</span>
        
        <span className={classNames(styles.textOverflowEllipsis)}>Some guy with a really long name</span>
        <span>8</span>
        <span>1 second</span>
        

      </div>
    </section>
  )
}
