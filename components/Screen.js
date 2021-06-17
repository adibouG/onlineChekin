import  React  from 'react'
import Image from 'next/image'
import styles from './Screen.module.css'

const Screen =  React.forwardRef((props, ref) => {
    
    const { isLoading, canNavigate, onBack, onContinue , disabled , nextLabel , logo = null } = props ;

    if (isLoading) {
        return(<div className={styles.center}>{props.children}</div>)
    } else if (!canNavigate) {
        return(<div className={`${styles.grid} ${styles.grid_no_nav} background`}>{props.children}</div>)
    } else {
        return(
            <div className={`${styles.container} possible_background`}>
                <div className={styles.header}>
                    <div className={styles.header_logoWrapper}>
                    {
                        logo &&
                        <Image w={logo.width} h={logo.height}  
                                src={logo.src} alt={logo.alt}  
                        />
                    }
                    </div>
                </div>
                <div className={styles.wrapper}>
                    <div className={styles.content}>
                        {props.children}
                    </div>

                    <div className={styles.footerWrapper}>
                        <div className={styles.footer}>
                            <button className='secondary_button' onClick={onBack}>Back</button>
                            <button ref={ref} className={`primary_button ${styles.xl} ${disabled ? styles.disabled : false}`} disabled={disabled} onClick={onContinue}>
                                {nextLabel ? `${nextLabel}` : 'Confirm'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})

export default Screen