import  React, { useState , useEffect , useRef , useImperativeHandle}  from 'react'
import styles from './index.module.css'
import { Stack, Header } from '../../components/Stack.js'
import Input from '../../components/Input.js'

const PersonalDetails = React.forwardRef((props, ref) => {
    
    let { guest  , update , isValid } = props ;

    console.log(guest)
 
   const [firstName , setFirstName] = useState(guest.firstName || "" );
   const [lastName , setLastName] = useState(guest.lastName || "" );
   const [address , setAddress] = useState(guest.address || "" );
   const [postalCode , setPostalCode] = useState(guest.postalCode || "" );
   const [city , setCity] = useState(guest.city || "" );
   const [email , setEmail] = useState(guest.email || "" );
   const [mobile , setMobile] = useState(guest.mobile || "" );
   
   const [emailConf , setEmailConf] = useState("");
   
  
   //useImperativeHandle(ref, () => ({getMyState: () => {return firstName}}), []);
   
   let validForm = false;

    useEffect(() => {
        
        let valid = false ;
        if(firstName && lastName && address &&  postalCode  &&  city &&  email &&  emailConf &&  mobile) {
            valid = true ;
            //document.getElementsByTagName('input')
            let f = document.getElementById('form') ;
            for ( let i = 0 ; i < 15 ; i+=2) {

                if (!f[i].validity.valid) valid = false ;
            } 
        }
        if (valid) {
       
            validForm = valid ;
            isValid(validForm);
        }
       

  } , [firstName ,lastName,address,postalCode,city,email, emailConf , mobile] );

 
  const checkAndSaveDetails = (e) => {

    let fieldname = e.target.name ;
    let fieldValue = e.target.value ;
    let valid = e.target.validity.valid ;
    e.stopPropagation() ;
   // e.stopImmediatePropagation()
    e.preventDefault();
 
    if (fieldname in guest && fieldValue.length && valid) {
        console.log(fieldValue)

        update(fieldname , eval(`${fieldname}`))
    }
  }



    return <Stack>
        <Header>Please fill in your details</Header>
            <form className={styles.form} 
                    autoComplete='off' 
                    lpignore='true' 
                    id='form'
                    // ref={ref}
                    onBlur={checkAndSaveDetails}
            >
                
            <div className={styles.group}>
            <Input title='First Name' name='firstName' id='firstName' type='text'
                    handleChange={setFirstName} value={firstName}
                    required={true} autocomplete='true'  lpignore='true'
            />
            
            <Input title='Last Name'  name='lastName' id='lastName' type='text'
                    handleChange={setLastName} value={lastName}
                    required={true} autocomplete='true'  lpignore='true'
            />
            </div>
            <div className={styles.group}>
            <Input title='Address' name='address' id='address' type='text'
                    handleChange={setAddress} value={address}
                    required={true} autocomplete='street-address'  lpignore='true'
            />
            
            <Input title='Postal code'  name='postalCode' id='postalCode' type='text'
                    handleChange={setPostalCode} value={postalCode}
                    required={true} autocomplete='postal-code'  lpignore='true'
            />
            
            <Input title='City'  name='city' id='city' type='text' 
                    handleChange={setCity} value={city}
                    required={true} autocomplete='address-level2'  lpignore='true'
            />
            </div>
            <div className={styles.group}>
            <Input title='Email address' type='email'   name='email' id='email'
                    handleChange={setEmail}  value={email}   
                    required={true}  autocomplete='email' lpignore='true'
            />
            <Input title='Confirm email address' type='email'  name='emailConf' id='emailConf' 
                pattern={email.length ? email : null} 
                handleChange={setEmailConf}    value={emailConf}
                required={true} autocomplete='email' lpignore='true'
            />
            
            <Input title='Mobile' name='mobile' id='mobile' type='phone'
                handleChange={setMobile} value={mobile}  pattern='\d{6,12}'
                required={true} autocomplete='mobile' lpignore='true'
            />
            </div>



        </form>

    </Stack>
}
)

export default PersonalDetails