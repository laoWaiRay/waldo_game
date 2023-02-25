import classNames from "classnames"
import styles from '/src/scss/components/Register.module.scss'

export default function Register({isFormShown, name, setName, isSaved, setIsSaved,
                                  isLoading, setIsLoading, inputRef, registerRef,
                                  handleClickSave
                                }) {

  return (
    <div 
      className={classNames(
        styles.register,
        {'slideIn': isFormShown}
      )}
      ref={registerRef}
    >
      <div className={classNames(styles.formContainer)}>
        <form onSubmit={handleClickSave}>
          <span>Enter your name: </span>
          <input 
            className={classNames(styles.pill)}
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            ref={inputRef}
          />
        </form>
      </div>
    </div>
  )
}
