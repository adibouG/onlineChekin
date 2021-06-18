import * as React from 'react'
import styles from './index.module.css'
import Card from '../../components/Card'
import Image from 'next/image'


const Welcome = ({ text , guest, onContinue , step , logo = null }) => {
    
    console.log(text)
 
 
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
                        supertitle={text && text.supertitle ? text.supertitle : "Welcome!"} 
                        title={guest}
                        subtitle={ text && text.subtitle ? (step === 0 ? text.subtitle : text.waitsubtitle ): step === 0 ? "Are you ready to check-in?" : "Getting your reservation details..."}
                        buttonTitle={ text && text.buttonTitle ? text.buttonTitle : "Yes, start check-in"}
                        onClick={onContinue}
                />
            </div>
        </div>
    )
}

export default Welcome