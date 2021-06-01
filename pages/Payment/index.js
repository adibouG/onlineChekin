import  React, { useState }  from 'react'
import styles from './index.module.css'
import { Stack, Header } from '../../components/Stack.js'
import Input from '../../components/Input.js'
import Image from 'next/image' ;



const BankMethodButton = ({name , id , value , src , isChecked = false}) => {

    const onChange = (e) => {
        let name = e.target.name ;
        let value = e.target.value ;
        let checked = e.target.checked ;
        handleChange({name , value , checked})
    }

    return(
        <label htmlFor={id} className={styles.bankMethodButton}>
            <input type="radio" name={name} id={id} value={value} checked={isChecked} onChange={onChange}/>
            <img src={src} className={styles.bankMethodButton_img} />
        </label>
    )
}


const Payment = ({ payment = {}}) => {

    console.log(payment)
    console.log(payment.amount)
    console.log(payment.currency)
    console.log(payment.paid)
    
    const [amount , setAmout] = useState(payment.amount || 0 );
    const [currency , setCurrency] = useState(payment.currency || "€" );
    const [paid , setPaid] = useState(payment.paid || false );
    const [paymentMethod , setPaymentMethod] = useState( null );
    const [bank , setBank] = useState( null );
    
    const availableMethods = ['Ideal' , 'Visa' , 'PayPal' , 'ApplePay' ] ;
    const availableBanks = ['RaboBank' , 'Ing' ] ;

    const selectPaymentMethod = ({name, value , checked}) => {

        if (name === "payMethod" && checked) setPaymentMethod(value)

    } ;
 

    return <Stack>
            <Header>Please complete your payment</Header>
            
            
            <form className={styles.paymentForm}  >
            

            <div className={styles.displayAmount}>
                <div className={styles.displayAmount_header}>
                    <span className={styles.displayAmount_header_text}>
                        Amount to pay
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
                        Choose your payment method
                    </span>
                </div>
                <div className={styles.displayMethods_body}>
                   <div className={styles.displayMethods_body_method}>
                        <BankMethodButton handlesChange={selectPaymentMethod} name={"payMethod"} id={"Ideal"}  value={"Ideal"}   src={"/ideal.svg"}   isChecked={false} />
                        <BankMethodButton handleChange={selectPaymentMethod} name={"payMethod"} id={"Visa"}  value={"Visa"}   src={"/visa.svg"}   isChecked={false} />
                        <BankMethodButton handleChange={selectPaymentMethod} name={"payMethod"} id={"PayPal"}  value={"PayPal"}   src={"/paypal.svg"}   isChecked={false} />
                        <BankMethodButton handleChange={selectPaymentMethod} name={"payMethod"} id={"ApplePay"}  value={"ApplePay"}   src={"/applepay.svg"}   isChecked={false} />
                   </div>
                   <div className={styles.displayMethods_body_bank} >
                        <Input title='Select your bank' name='bank' id='bank' type='select' 
                        value={availableBanks} 
                        handleChange={setBank} > 
                       
                    </Input>
       
                   </div>
                </div>
            </div>
            
        </form>

    </Stack>
}

export default Payment