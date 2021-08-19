import  React, { useState, useEffect }  from 'react';
import styles from './index.module.css';
import { Stack, Header } from '../../components/Screen/Stack.js';
import Input from '../../components/InputField/Input.js';

const MAILREGEXP = "[A-Za-z0-9._%+-]{2,}@[a-zA-Z]{1,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})";
const PHONEREGEXP = "^(\\+?)((( ?)\\d){6,})";//"(?[\d +\/()–-]{6,}\)?[ .\/–-]?\d+";
const PersonalDetails = (props) => {
   let { text, guest, update, validate, isValid, forwardedRef } = props ;
   const [firstName, setFirstName] = useState(guest.firstName || "" );
   const [lastName, setLastName] = useState(guest.lastName || "" );
   const [address, setAddress] = useState(guest.address || "" );
   const [postalCode, setPostalCode] = useState(guest.postalCode || "" );
   const [city, setCity] = useState(guest.city || "");
   const [email, setEmail] = useState(guest.email || "");
   const [mobile, setMobile] = useState(guest.mobile || "");
   const [emailConf, setEmailConf] = useState('');
   useEffect(() => {
        if (guest.email && isValid && email) setEmailConf(email) ;    
   }, [])
   //useImperativeHandle(ref, () => ({getMyState: () => {return firstName}}), []);
    useEffect(() => {
        let valid = false ;
        if(firstName && lastName && address && postalCode && city && email && emailConf && mobile) {
            valid = true ;
            let f = forwardedRef.current; //document.getElementById('form') ; //we want to use/get the css validation result
            for (let i = 0; i < 15; i+=2) {
                if (!f[i].validity.valid) valid = false ;
            } 
        }
        validate(valid);
    }, [firstName, lastName, address, postalCode, city, email, emailConf, mobile]);
 
  const checkAndSaveDetails = (e) => {
    let fieldname = e.target.name;
    let fieldValue = e.target.value;
    let valid = e.target.validity.valid;
    e.stopPropagation();
    e.preventDefault();
    if (fieldname in guest && fieldValue.length && valid) update(fieldname, eval(`${fieldname}`));
  }

    return(
        <Stack>
            <Header>{text.header}</Header>
            <form   className={styles.form} 
                    autoComplete='off' 
                    lpignore='true' 
                    id='form'
                    ref={forwardedRef}
                    onBlur={checkAndSaveDetails}
            >
                <div className={styles.group}>
                    <Input  title='First Name' name='firstName' id='firstName' type='text'
                            handleChange={setFirstName} value={firstName}
                            required={true} autocomplete='off'  lpignore='true'
                    />
                    <Input  title='Last Name'  name='lastName' id='lastName' type='text'
                            handleChange={setLastName} value={lastName}
                            required={true} autocomplete='off'  lpignore='true'
                    />
                </div>
                <div className={styles.group}>
                    <Input  title='Address' name='address' id='address' type='text'
                            handleChange={setAddress} value={address}
                            required={true} autocomplete='street-address'  lpignore='true'
                    />
                    <Input  title='Postal code'  name='postalCode' id='postalCode' type='text'
                            handleChange={setPostalCode} value={postalCode}
                            required={true} autocomplete='postal-code'  lpignore='true'
                    />
                    <Input title='City'  name='city' id='city' type='text' 
                            handleChange={setCity} value={city}
                            required={true} autocomplete='address-level2'  lpignore='true'
                    />
                </div>
                <div className={styles.group}>
                    <Input  title='Email address' type='email'   name='email' id='email'
                            handleChange={setEmail}  value={email}   pattern={MAILREGEXP}
                            required={true}  autocomplete='email' lpignore='true'
                    />
                    <Input  title='Confirm email address' type='email'  name='emailConf' id='emailConf' 
                            pattern={email.length ? email : null} 
                            handleChange={setEmailConf}    value={emailConf}
                            required={true} autocomplete='email' lpignore='true'
                    />
                    <Input  title='Mobile' name='mobile' id='mobile' type='phone'
                            handleChange={setMobile} value={mobile}  pattern={PHONEREGEXP}
                            required={true} autocomplete='mobile' lpignore='true'
                    />
                </div>
            </form>
        </Stack>
    )
}

export default PersonalDetails;