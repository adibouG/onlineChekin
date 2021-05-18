import * as React from "react"
import Button from 'react-bootstrap/Button'
import styles from './Card.module.css'

export function Card(props) {
    const { supertitle, title, subtitle, buttonTitle } = props

    // We probably need to override a sass variable before importing bootstrap instead of styling inline
    // See here: https://getbootstrap.com/docs/4.0/getting-started/theming/
      
    return (
        <div className={styles.card}>
            <div className={styles.supertitle}>{supertitle}</div>
            <div className={styles.title}>{title}</div>
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
    )
}