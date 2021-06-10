import * as React from 'react'
import styles from './index.module.css'
import Card from '../../components/Card'


const Success = ({ date  }) => {
    date = date ||  new Date(((new Date().getTime()) + (24 * 60 * 60 * 1000 ))).toLocaleDateString()
    let day = new Date(date).toLocaleDateString(false, { weekday: 'long' });
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

