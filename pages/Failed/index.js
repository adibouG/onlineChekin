import * as React from 'react'
import styles from './index.module.css'
import Card from '../../components/Card'


const Failed = ({ reason , text , onContinue = null , step , logo = null}) => {

    const MESSAGE = reason === 'expired' ? text.expired : text.notFound ;
    const DETAILS = text.assistance;
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

