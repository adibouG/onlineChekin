import * as React from "react"
import styles from './Card.module.css'

const Card = ({ step , supertitle, title, subtitle, buttonTitle, onClick }) => {
    return (
        <div className={step === 5 ? styles.successCard : styles.card}>
            <div className={step === 5 ? styles.flex : styles.grid}>
                <div className={step === 5 ?  styles.successSupertitle : styles.supertitle}>{supertitle}</div>
                <div className={`${step === 5 ?  styles.successtitle : styles.title} card-title`}>{title}</div>
                <div className={step === 5 ?  styles.successSubtitle : styles.subtitle}>{subtitle}</div>
                {
                step === 0 &&  
                <button className='primary_button' onClick={onClick}>{buttonTitle}</button>
                }
            </div>
        </div>
    )
}

export default Card