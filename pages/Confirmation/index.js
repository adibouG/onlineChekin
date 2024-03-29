import * as React from 'react';
import styles from './index.module.css';
import { Stack, Header } from '../../components/Screen/Stack.js';

const Item = (props) => <div className={styles.item}>{props.children}</div>;
const Title = (props) => <div className={styles.title} {...props}/>;
const Value = (props) => <div className={styles.value} {...props}/>;

const Confirmation = (props) => {
    const { reservation, text } = props ;
    const startDate = new Date(reservation.startDate);
    const endDate = new Date(reservation.endDate);
    const numOfNight = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const options = [] ;
    if (reservation.options && reservation.options.length) {
       for (let i of reservation.options) {
           options.push(
               <Item key={i}>
                   <Title key={reservation.options.indexOf(i)} >Options</Title>
                   <Value key={i + reservation.options.indexOf(i)}>{i}</Value>
               </Item>
           );
        }
    } else {
        options.push(
            <Item key={"Breakfast"}>
                <Title>Options</Title>
                <Value>Breakfast</Value>
            </Item>
        );
    }

    return(
        <Stack>
            <Header>{text.header}</Header>
            <Item>
                <Title>{text.yourStay}</Title>
                <Value>{startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}</Value>
                <Title>{text.nights}</Title>
                <Value>{numOfNight}</Value>
                <Title>{text.guests}</Title>
                <Value>{reservation.guestCount}</Value>
            </Item>
            <Item>
                <Title>{text.room}</Title>
                <Value>{reservation.roomType}</Value>
            </Item>
            {options}
        </Stack>
    )
}

export default Confirmation