import React from 'react';
import styles from '../css/index.module.css';
import Card from '../../components/Card/Card.js';

const Welcome = ({ text, guest, onContinue, step, error = null, styling = null, isLoading }) => {
    let subtitleText = error ? error : text ? step === 0 ? text.subtitle : text.waitsubtitle : "";
    let buttonText =  text ? (error ? text.buttonTitleWithError : text.buttonTitle ) : "";
    let supertitleText = text ? text.supertitle : "" ;
    const logoSrc = styling && styling.style && styling.style.logo ? styling.style.logo : '/logo.svg';
 
    return (
        <div className={styles.screen}>
            <div className={styles.content}>
                <div className={styles.logo} >
                {   
                logoSrc && 
                <img src={logoSrc} />
                }
                </div> 
                <Card   step={step}
                        isLoading={isLoading}
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