import * as React from "react"
import Button from 'react-bootstrap/Button'
import styles from './Card.module.css'

export function Card(props) {
    const { title, subtitle, message, buttonTitle } = props

    return (
        <div className={styles.card}>
            <h2>{title}</h2>
            <h1>{subtitle}</h1>
            <p>{message}</p>
            <Button variant="primary" type="submit" className={styles.submit} size='lg'>{buttonTitle}</Button>
        </div>
    )
}