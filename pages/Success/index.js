import * as React from 'react'
import styles from './index.module.css'
import Card from '../../components/Card'


const Success = ({ day  }) => {

    const SUCCESS = 'Checked in!'
    const DETAILS = 'To pick up your room key, please use the QR-code in your e-mail at the key pick up device in the lobby.'
    const BYE = `Looking forward seeing you ${day}!`

    const onContinue = () => false ;
    
    return (
        <div className={styles.screen}>
            <div className={styles.content}>
                <div className={styles.logo}/>
                <Card step={5}
                    supertitle={SUCCESS}
                    title={DETAILS}
                    subtitle={BYE}
                    
                />
            </div>
        </div>
    )
}

export default Success

