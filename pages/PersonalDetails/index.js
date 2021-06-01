import  React, { useState }  from 'react'
import styles from './index.module.css'
import { Stack, Header } from '../../components/Stack.js'
import Input from '../../components/Input.js'

const PersonalDetails = ({ guest = {} }) => {

    console.log(guest)
    console.log(guest.address)
    
    const [address , setAddress] = useState(guest.address || "" );
    const [postalCode , setPostalCode] = useState(guest.postalCode || "" );
    const [city , setCity] = useState(guest.city || "" );
    const [email , setEmail] = useState(guest.email || "" );
    const [emailConf , setEmailConf] = useState("");
    const [mobile , setMobile] = useState(guest.mobile || "" );
    
    console.log(address)
    console.log(email)

    return <Stack>
        <Header>Please fill in your details</Header>
            <form className={styles.form} 
                    autoComplete='off' 
                    lpignore='true' 
            >
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
                handleChange={setMobile} value={mobile}  
                required={true} autocomplete='mobile' lpignore='true'
            />
            </div>



        </form>

    </Stack>
}

export default PersonalDetails