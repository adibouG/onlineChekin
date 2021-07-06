import  React, { useState, useEffect }  from 'react';
import styles from './index.module.css';
import { Stack, Header } from '../../components/Stack.js';
import Input from '../../components/Input.js';
import RadioButton from '../../components/RadioButton.js';
import Select from '../../components/Select.js';
import Spinner from '../../components/Spinner.js';

const MethodGroup = (props) => {
    const { names, selected, setMethod } = props;
    let group = [] ;
    for (let i of names) {
        let src = i.toLowerCase();
        group.push(
            <RadioButton key={i} w={69} h={60} handleChange={setMethod} name={"payMethod"} id={i}  value={i}   src={src}   isChecked={selected === i} />
        );
    }    
    return(    
        <div className={styles.displayMethods_body_method}>
            {group}
        </div>
    )
}
                                        
const Payment = ({ isProcessing , payment = {}, update, text }) => {
    const [amount , setAmount] = useState(payment.amount || 0 );
    const [currency , setCurrency] = useState(payment.currency || "€" );
    const [paid , setPaid] = useState(payment.paid || false );
    const [paymentMethod , setPaymentMethod] = useState( null );
    const [bank , setBank] = useState( null );
    const availableMethods = ['Ideal' , 'Visa' , 'PayPal' , 'ApplePay' ] ;
    const availableBanks = ['RaboBank' , 'Ing' ] ;
    let selected ;
    const selectPaymentMethod = ({name, value, checked}) => (name === "payMethod" && checked && setPaymentMethod(value)) ;

    useEffect(() => {
        if (paid) setAmount(0);
        if (amount === 0 ) setPaid(true);
        if  (paymentMethod &&  bank) return update({amount, currency, paymentMethod, bank, paid}) ;
    }, [amount, paid, paymentMethod, bank])
 
    return (
        <Stack>
            <Header>{text.header}</Header>
            <form className={styles.paymentForm}  >
                <div className={styles.displayAmount}>
                    <div className={styles.displayAmount_header}>
                        <span className={styles.displayAmount_header_text}>
                            {text.title}
                        </span>
                    </div>
                    <div className={styles.displayAmount_body}>
                        <span className={styles.displayAmount_body_amount}>
                           {amount}
                        </span>
                        <span className={styles.displayAmount_body_currency}>
                           {currency}
                        </span>
                    </div>
                </div>
                <div className={styles.displayMethods}>
                    <div className={styles.displayMethods_header}>
                        <span className={styles.displayMethods_header_text}>
                            {text.selectorLabel}
                        </span>
                    </div>
                    <div className={styles.displayMethods_body}>
                        <MethodGroup names={availableMethods} setMethod={selectPaymentMethod} selected={paymentMethod} />
                        <div className={styles.displayMethods_body_bank} >
                            <Input title='Select your bank' name='bank' id='bank' type='select' 
                                    value={availableBanks} handleChange={setBank} 
                            /> 
                        {/*
                            <Select title='Select your bank' 
                                    name='bank' id='bank'  
                                    selected={bank}
                                    values={availableBanks} 
                                    handleChange={setBank} 
                            />
                        */}

                        { isProcessing && <Spinner /> }
                       </div>
                    </div>
                </div>
            </form>
        </Stack>
    )
}

export default Payment;