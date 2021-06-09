import * as React from 'react'
import styles from './index.module.css'
import ToggleSwitch from '../../components/ToggleSwitch.js' ;
import { Stack, Header } from '../../components/Stack.js'

const TITLE = "Please accept our hotel and privacy policies" ;

const POLICY = "Terms and conditions\n\nSmoking is not permitted in any apartment or apartment building, this includes the use of electronic cigarettes. There is a € 240 deep cleaning fee applied if \
you smoke in a room. Guests are required to keep the apartment, furniture, fittings and effects in the same condition as on arrival. Inventories and condition reports can be provided at the start and end of the stay, if required, at an additional cost. You \
are required to notify us of any damage, loss or broken items or matters requiring general maintenance. Any damage to the apartment will be charged in full. In the event that these are discovered alter departure, we will notify you or the booker within 7 days \
of departure with full details and where possible photographic evidence. Please note this cashless property and all of our partners operate the same policy. By completing the above you are agreeing to our Terms & Condition." ;

const POLICY_VALIDATION_TEXT = "I accept all policies"  ;


const PolicyBlock = ({ policy , handleAccept}) => {
    
    
    let splitedPolicyTerm = policy.content.split('\n\n') ;

    let policyName = (polName) => 
        <div className={styles.policyBlock__policyName} >
            <span className={styles.policyBlock__policyName__text} >
                {polName}
            </span>
        </div>
    let policyRules = (rules) => 
        <div className={styles.policyBlock__policyRules} >
            <span className={styles.policyBlock__policyRules__text} >
                {rules}
            </span>
        </div>

    let title = policyName(splitedPolicyTerm[0])
    let body = policyRules(splitedPolicyTerm[1])

    return (
        <div className={styles.policyBlock}>
            <div  className={styles.hotelPolicy__wrapper} >
                {title}
                {body}
            </div>
            <div className={styles.hotelPolicy__selectorWrapper} >
                <ToggleSwitch labelText={POLICY_VALIDATION_TEXT} name={`policies`} 
                isChecked={policy.accepted}  handleClick={handleAccept} />
            </div>
        </div>
    )
} 

const HotelPolicy = ({  policy , update}) => {
    
    return (
        <Stack>
            <Header>
                {TITLE}
            </Header>
            <PolicyBlock policy={policy}  handleAccept={update} />

        </Stack>
     
    )
}

export default HotelPolicy ;