import * as React from "react"
import Button from 'react-bootstrap/Button'
import styles from './Form.module.css'
import { Card } from './Card'

export function Form(props) {
    const { defaultValue } = props

    return (
        <div className={styles.screen}>
            <div className={styles.content}>
                <div className={styles.logo}/>
                <Card 
                    supertitle="Welcome!" 
                    title="Franciscus Hubertus Hendrikus Schouenberg von Wienerschnitzel III"
                    subtitle="Are you ready to check-in?"
                    buttonTitle="Yes, start check-in"
                />
            </div>
        </div>
    )
}