import  React, { useState ,useEffect }  from 'react'
import styles from './index.module.css'
import { Stack, Header } from '../../components/Stack.js'
import Input from '../../components/Input.js'
import Image from 'next/image' ;



const BankMethodButton = ({name , id , value , src , isChecked , handleChange = false}) => {

    const onChange = (e) => {
        let name = e.target.name ;
        let value = e.target.value ;
        let checked = e.target.checked ;
        handleChange({name , value , checked})
    }

    return(
        <label htmlFor={id} className={styles.bankMethodButton}>
            <input type="radio" name={name} id={id} value={value} checked={isChecked} onChange={onChange}/>
            <img src={isChecked ? `/${src}2.svg` : `/${src}.svg`} className={isChecked ? styles.bankMethodButton_img2 : styles.bankMethodButton_img} />
        </label>
    )
}

const MethodGroup = (props) => {

    const {names  , selected , setMethod} = props
    let group = [] ;
    for (let i of names) {
        group.push(
            <BankMethodButton handleChange={setMethod} name={"payMethod"} id={i}  value={i}   src={i}   isChecked={selected === i} />
        )
    }
        
    return(    
        <div className={styles.displayMethods_body_method}>
            {group}
        </div>
    )
}

const Payment = ({ payment = {} , update}) => {

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

    let selected 
    const selectPaymentMethod = ({name, value , checked}) => {

        if (name === "payMethod" && checked) setPaymentMethod(value)

    } ;
   
         
    useEffect(() => {

if (amount === 0 || paid) return update(null , true )
if (paymentMethod &&  bank ) return update({bank , paymentMethod , amount ,  currency }, true ) ;

    } , [paid , paymentMethod , bank]
)
 
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

                    <MethodGroup names={availableMethods} setMethod={selectPaymentMethod} selected={paymentMethod} />
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