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

    const startDate =  new Date(reservation.startDate)
    const endDate = new Date(reservation.endDate)
    
    const numOfNight = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))

    const options = [] ;
    if (reservation.options && reservation.options.length) {
       for (let i of reservation.options) {
           options.push(
               <Item key={i}>
                   <Title>Options</Title>
                   <Value>{i}</Value>
               </Item>
           )
        }
    }
    else {
        options.push(
            <Item>
                <Title>Options</Title>
                <Value>Breakfast</Value>
            </Item>
        )
    }

    return(
        <Stack>
            <Header>Please confirm your reservation details</Header>
            
            <Item>
                <Title>Your stay</Title>
                <Value>{startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}</Value>
                <Title>Number of night(s)</Title>
                <Value>{numOfNight}</Value>
                <Title>Number of guests</Title>
                <Value>{reservation.guestCount}</Value>
            </Item>
            <Item>
                <Title>Room type</Title>
                <Value>{reservation.roomType}</Value>
            </Item>
            {options}
        </Stack>
    )
}

export default Confirmation