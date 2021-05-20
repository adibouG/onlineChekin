import * as React from "react"
import Button from 'react-bootstrap/Button'
import styles from './Card.module.scss'

export function Card(props) {
    const { supertitle, title, subtitle, buttonTitle } = props
    return (
        <div className={styles.card}>
            <div className={styles.grid}>
                <div className={styles.supertitle}>{supertitle}</div>
                <div className={`${styles.title} card-title`}>{title}</div>
                <div className={styles.subtitle}>{subtitle}</div>
                <Button 
                    variant="custom2" 
                    type="submit" 
                    className={styles.submit} 
                    size='lg' 
                    style={{
                        backgroundColor: 'var(--button-background-color)',
                        color: 'var(--button-color)'
                    }}
                >
                    {buttonTitle}
                </Button>
            </div>
        </div>
    )
}