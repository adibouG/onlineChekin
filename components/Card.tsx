import * as React from "react"
import Button from 'react-bootstrap/Button'
import styles from './Card.module.css'

export function Card(props) {
    const { supertitle, title, subtitle, buttonTitle } = props

      
    return (
        <>
        <style type="text/css">
        {`
        .btn-custom:enabled {
            background-color: var(--button-background-color);
            color: var(--button-color);
        }
        `}
        </style>
        <div className={styles.card}>
            <div className={styles.supertitle}>{supertitle}</div>
            <div className={styles.title}>{title}</div>
            <div className={styles.subtitle}>{subtitle}</div>
            <Button variant="custom" type="submit" className={styles.submit} size='lg'>{buttonTitle}</Button>
        </div>
        </>
    )
}