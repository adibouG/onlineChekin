import styles from './Screen.module.css'

const Screen = (props) => {
    const { isLoading, canNavigate, onBack, onContinue } = props
    if (isLoading) {
        return <div className={styles.center}>
            {props.children}
        </div>
    } else if (!canNavigate) {
        return <div className={`${styles.grid} ${styles.grid_no_nav} background`}>
            {props.children}
        </div>
    } else {
        return <div className={`${styles.container} possible_background`}>
            <div className={styles.header}/>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    {props.children}
                </div>
                <div className={styles.footer}>
                    <button className='secondary_button' onClick={onBack}>Back</button>
                    <button className={`primary_button ${styles.xl}`} onClick={onContinue}>Confirm</button>
                </div>
            </div>
        </div>
    }
}

export default Screen