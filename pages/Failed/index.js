import * as React from 'react';
import styles from './index.module.css';
import styles2 from './../css/index.module.css';
import Card from '../../components/Card';
const Failed = ({ reason, text, step, onContinue = null, logo = null }) => {
    const MESSAGE = reason === 'expiredLink' ? text.expired : text.notFound ;
    const DETAILS = text.assistance;
    let TITLE = null ;
    if( reason !== 'expiredLink' &&  reason !== 'notFound' ) TITLE = reason ;
    return (
        <div className={styles2.screen}>
            <div className={styles2.content}>
                <div className={styles2.logo} >
                { logo &&
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

export default Failed;

