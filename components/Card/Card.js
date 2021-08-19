import * as React from "react";
import styles from './Card.module.css';
import Spinner from '../Spinner.js';

const Card = ({ step, supertitle, title, subtitle, buttonTitle, onClick, isLoading, style= null }) => {
    let superTitleStyle, titleStyle, subTitleStyle ; 
    //set the correct css style for the card 
    if (step < -1 && style) {
        superTitleStyle = style.expired_text;
        titleStyle = style.failed_title;
        subTitleStyle = style.expired_assist_text;
    } else if (step === 5) {
        superTitleStyle = styles.successSupertitle;
        titleStyle = styles.successtitle;
        subTitleStyle = styles.successSubtitle;
    } else {
        superTitleStyle = styles.supertitle;
        titleStyle = styles.title;
        subTitleStyle = styles.subtitle;
    }
    return (
        <div className={step === 5 ? styles.successCard : styles.card}>
            <div className={step === 5 || step < -1 ? styles.flex : styles.grid}>
                <div className={superTitleStyle}>{`${supertitle}`}</div>
                <div className={`${titleStyle} card-title`}>{title}</div>
                <div className={subTitleStyle}>{subtitle}</div>
                { step === 0 ? <button className='primary_button' onClick={onClick}>{buttonTitle}</button>
                    : ((step === -1 || isLoading) && <Spinner />)
                }
            </div>
        </div>
    )
}

export default Card;