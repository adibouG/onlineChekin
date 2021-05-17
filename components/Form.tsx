import * as React from "react"
import F from "react-bootstrap/Form"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import styles from './Form.module.css'

export function Form(props) {
    const { defaultValue } = props

    return (
        <div className={styles.screen}>
            <div className={styles.card}>
                <Button variant="primary" type="submit">Yes, start check-in</Button>
            </div>
        </div>
    )
}