import * as React from 'react'
import styles from './index.module.css'
import { Stack, Header } from '../../components/Stack.js'



const Item = (props) => {
    return <div className={styles.item}>{props.children}</div>
}

const Title = (props) => {
    return <div className={styles.title} {...props}/>
}

const Value = (props) => {
    return <div className={styles.value} {...props}/>
}

const Confirmation = ({ reservation }) => {
    return <Stack>
        <Header>Please confirm your reservation details</Header>
        <Item>
            <Title>Your stay</Title>
            <Value>{new Date(reservation.startDate).toLocaleDateString()} - {new Date(reservation.endDate).toLocaleDateString()}</Value>
            <Title>Number of guests</Title>
            <Value>{reservation.guestCount}</Value>
        </Item>
        <Item>
            <Title>Room type</Title>
            <Value>{reservation.roomType}</Value>
        </Item>
        <Item>
            <Title>Options</Title>
            <Value>{reservation.options.join('\r\n')}</Value>
        </Item>
        <Item>
            <Title>Options</Title>
            <Value>{reservation.options.join('\r\n')}</Value>
        </Item>
        <Item>
            <Title>Options</Title>
            <Value>{reservation.options.join('\r\n')}</Value>
        </Item>
        <Item>
            <Title>Options</Title>
            <Value>{reservation.options.join('\r\n')}</Value>
        </Item>
    </Stack>
}

export default Confirmation