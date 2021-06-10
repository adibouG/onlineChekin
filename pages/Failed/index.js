import * as React from 'react'
import styles from './index.module.css'
import Card from '../../components/Card'


const Failed = ({ reason , step }) => {

    const MESSAGE = reason === 'expired' ? 'Unfortunately the link has expired' : 'We can\'t find your reservation' ;
    const DETAILS = 'In case of assistance, please call us at: +31 384629847 Or e-mail: support@hotelenzo.com';
  

    
    return (
        <div className={styles.screen}>
            <div className={styles.content}>
                <div className={styles.logo}/>
                <Card style={styles}
                    step={step}
                    supertitle={MESSAGE}
                    subtitle={DETAILS}
                />
            </div>
        </div>
    )
}

export default Failed

