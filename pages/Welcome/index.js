import * as React from 'react';
import styles from '../css/index.module.css';
import Card from '../../components/Card';
import Image from 'next/image';

const Welcome = ({ text, guest, onContinue, step, error = null, logo = null }) => {
    let subtitleText = error ? error : text ? step === 0 ? text.subtitle : text.waitsubtitle : "";
    let buttonText =  text ? (error ? text.buttonTitleWithError : text.buttonTitle ) : "";
    let supertitleText = text ? text.supertitle : "" ;
    return (
        <div className={styles.screen}>
            <div className={styles.content}>
                <div className={styles.logo} >
                    {   logo &&
                            <Image  w={logo.width} h={logo.height}  
                                    src={logo.src} alt={logo.alt}  
                            />
                    }
                </div> 
                <Card   step={step}
                        supertitle={supertitleText}  
                        title={guest}
                        subtitle={subtitleText}
                        buttonTitle={buttonText}
                        onClick={onContinue}
                />
            </div>
        </div>
    )
}

export default Welcome