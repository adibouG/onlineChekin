import * as React from "react"
import F from "react-bootstrap/Form"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import styles from './Form.module.css'

export function Form(props) {
    const { defaultValue } = props

    return (
        <Card className={styles.card}>
            <Card.Header>Enter your details</Card.Header>
            <Card.Body>
                <F>
                    <F.Group controlId="formBasicEmail">
                        <F.Label>Email address</F.Label>
                        <F.Control id="email" aria-describedby="basic-addon3" defaultValue={defaultValue} />
                        <F.Text className="text-muted">We'll never share your email with anyone else.</F.Text>
                    </F.Group>
                    <Button className="float-right" variant="primary" type="submit">Next</Button>         
                </F>
            </Card.Body>
        </Card>
    )
}