import * as React from 'react'
import styles from './Confirmation.module.css'

const Stack = (props) => {
    return <div className={styles.stack} {...props}/>
}

const Header = (props) => {
    return <div className={styles.header} {...props}/>
}

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
            <Value>{reservation.startDate} - {reservation.endDate}</Value>
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