import * as React from 'react'
import styles from './index.module.css'
import Card from '../../components/Card'
import Image from 'next/image'


const Welcome = ({ guest, onContinue , step , logo = null }) => {
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