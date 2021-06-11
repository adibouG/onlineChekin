import * as React from 'react'
import styles from './index.module.css'
import Card from '../../components/Card'


const Failed = ({ reason , onContinue = null , step , logo = null}) => {

    const MESSAGE = reason === 'expired' ? 'Unfortunately the link has expired' : 'We can\'t find your reservation' ;
    const DETAILS = 'In case of assistance, please call us at: +31 384629847 Or e-mail: support@hotelenzo.com';
    let TITLE = null ;
    
    if( reason !== 'expired' &&  reason !== 'notFound' ) {
        TITLE = reason
    }
    return (
    
                <div className={styles.screen}>
            <div className={styles.content}>
                <div className={styles.logo} >
                {
                    logo &&
                    <Image w={logo.width} h={logo.height}  
                            src={logo.src} alt={logo.alt}  
                    />
                }
                </div> 
                <Card style={styles}
                    step={step}
                    title={TITLE}
                    supertitle={MESSAGE}
                    subtitle={DETAILS}
                />
            </div>
        </div>
    )
}

export default Failed

