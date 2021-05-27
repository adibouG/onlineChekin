import * as React from "react"
import styles from './Card.module.css'

const Card = ({ supertitle, title, subtitle, buttonTitle, onClick }) => {
    return (
        <div className={styles.card}>
            <div className={styles.grid}>
                <div className={styles.supertitle}>{supertitle}</div>
                <div className={`${styles.title} card-title`}>{title}</div>
                <div className={styles.subtitle}>{subtitle}</div>
                <button className='primary_button' onClick={onClick}>{buttonTitle}</button>
            </div>
        </div>
    )
}

export default Card