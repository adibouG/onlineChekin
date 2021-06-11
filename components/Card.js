import * as React from "react"
import styles from './Card.module.css'
import Spinner from './Spinner'

const Card = ({ step , supertitle, title, subtitle, buttonTitle, onClick , style= null  }) => {

    let text , subtext ;

    return (
        <div className={ step === 5 ? styles.successCard : styles.card}>
            <div className={step === 5 || step < -1   ? styles.flex : styles.grid}>
                <div className={step < -1   ?  style['expired_text'] : step === 5 ? styles.successSupertitle : styles.supertitle }>{`${supertitle}`}</div>
                <div className={ step < -1   ? style.failed_title :`${step === 5 ?  styles.successtitle : styles.title} card-title`}>{title}</div>
                <div className={step < -1   ?  style.expired_assist_text : step === 5 ?  styles.successSubtitle : styles.subtitle}>{subtitle}</div>
                {
                    step === 0  &&
                        <button className='primary_button' onClick={onClick}>{buttonTitle}</button>
                }
                {
                step === -1 &&
                <Spinner />
                }
            </div>
        </div>
    )
}

export default Card