import classNames from "classnames"
import styles from '/src/scss/components/Register.module.scss'

export default function Register({isFormShown}) {
  return (
    <div 
      className={classNames(
        styles.register,
        {'slideIn': isFormShown}
      )}
    >
      <div className={classNames(styles.formContainer)}>
        <span>Enter your name: </span>
        <input 
          className={classNames(styles.pill)}
        />
      </div>
    </div>
  )
}
