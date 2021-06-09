import * as React from 'react'
import styles from './index.module.css'
import Card from '../../components/Card'


const Welcome = ({ guest, onContinue , step }) => {
    return (
        <div className={styles.screen}>
            <div className={styles.content}>
                <div className={styles.logo}/>
                <Card   step={step}
                        supertitle="Welcome!" 
                        title={guest}
                        subtitle={step === 0 ? "Are you ready to check-in?" : "Getting your reservation details..."}
                        buttonTitle="Yes, start check-in"
                        onClick={onContinue}
                />
            </div>
        </div>
    )
}

export default Welcome