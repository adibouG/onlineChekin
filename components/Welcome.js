import * as React from 'react'
import styles from './Welcome.module.css'
import Card from './Card'

const Welcome = ({ guest, onContinue }) => {
    return (
        <div className={styles.screen}>
            <div className={styles.content}>
                <div className={styles.logo}/>
                <Card 
                    supertitle="Welcome!" 
                    title={guest}
                    subtitle="Are you ready to check-in?"
                    buttonTitle="Yes, start check-in"
                    onClick={onContinue}
                />
            </div>
        </div>
    )
}

export default Welcome