import * as React from 'react'
import styles from './index.module.css'
import Card from '../../components/Card.js' ;

const TITLE = "Please accept our hotel and privacy policies" ;

const POLICY = "Terms and conditions\n\nSmoking is not permitted in any apartment or apartment building, this includes the use of electronic cigarettes. There is a € 240 deep cleaning fee applied if \
you smoke in a room. Guests are required to keep the apartment, furniture, fittings and effects in the same condition as on arrival. Inventories and condition reports can be provided at the start and end of the stay, if required, at an additional cost. You \
are required to notify us of any damage, loss or broken items or matters requiring general maintenance. Any damage to the apartment will be charged in full. In the event that these are discovered alter departure, we will notify you or the booker within 7 days \
of departure with full details and where possible photographic evidence. Please note this cashless property and all of our partners operate the same policy. By completing the above you are agreeing to our Terms & Condition." ;

const POLICY_VALIDATION_TEXT = "I accept all policies"  ;

const PolicySelector = ({elmntLabel, elmntName , val = false , elmntId = null}) => {

    let accepted = val ? "checked" : null ;
    
    elmntId = elmntId || elmntName ;

    return(
        <div className={styles.policySelectorWrapper}>
            <div className={styles.policySelector}>
                <input type="checkbox" name={elmntName} id={elmntId} className={styles.policySelector__input} value={accepted} />
                <span className={styles.policySelector__cssInput} ></span>
            </div>
            <div className={styles.policySelector__label} >
                <span className={styles.policySelector__label__text}> {elmntLabel}</span>
            </div>
        </div>
    )
}

const PolicyBlock = ({ policy }) => {
    
    let splitedPolicyTerm = policy.split('\n\n') ;

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
           {title}
           {body}
        </div>
    )
} 



const Stack = (props) => <div className={styles.stack} {...props}> {props.children}</div>
const Header = (props) => <div className={styles.header} {...props}>{props.children}</div>
const Item = (props) => <div className={styles.item}>{props.children}</div>
const Title = (props) => <div className={styles.title} {...props}>{props.children}</div>
const Value = (props) => <div className={styles.value} {...props}>{props.children}</div>

const HotelPolicy = ({  hotelPolicies ,isAccepted }) => {
    return (
        <Stack>
            <Header>
                {TITLE}
            </Header>
            <div  className={styles.hotelPolicy__wrapper} >
                <PolicyBlock policy={POLICY} isAccepted={false}  />
            </div>
            <div className={styles.hotelPolicy__selectorWrapper} >
                <PolicySelector elmntLabel={POLICY_VALIDATION_TEXT} elmntName={`policies`} val={isAccepted}  />
            </div>
        </Stack>
     
    )
}

export default HotelPolicy ;