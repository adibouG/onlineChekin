import * as React from 'react';
import styles from './index.module.css';
import ToggleSwitch from '../../components/TogglerButton/ToggleSwitch.js' ;
import { Stack, Header } from '../../components/Screen/Stack.js';

//component to return a policy rule as formatted block with a switch to accept
const PolicyBlock = ({ text, policyText, validateLabel, policy, handleAccept}) => {
    debugger 
    const policyName = (name) => 
        <div className={styles.policyBlock__policyName} >
            <span className={styles.policyBlock__policyName__text} >
                {name}
            </span>
        </div> ;
    const policyRules = (rules) => 
        <div className={styles.policyBlock__policyRules} >
            <span className={styles.policyBlock__policyRules__text} >
                {rules}
            </span>
        </div> ;

    let splitedPolicyTerm, title, body;
    
    if (!policy) { 
        splitedPolicyTerm = "" ;
        title = "";
        body = "";
    } else {
        let splitter ;
        if (policy.content.contains('\n\n')) splitter = '\n\n';
        else if (policy.content.contains('\n')) splitter = '\n';
        else if (policy.content.contains('<br>')) splitter = '<br>';
        else if (policy.content.contains('<br/>')) splitter = '<br/>';
        else if (policy.content.contains('<br />')) splitter = '<br />';
        splitedPolicyTerm = policy.content.split(splitter) ;
        title = policyName(splitedPolicyTerm[0]);
        body = policyRules(splitedPolicyTerm[1]);
    } 

    return (
        <div className={styles.policyBlock}>
            <div  className={styles.hotelPolicy__wrapper} >
                {title}
                {body}
            </div>
            <div className={styles.hotelPolicy__selectorWrapper} >
                <ToggleSwitch   labelText={validateLabel} 
                                name={`policies`} 
                                isChecked={policy.accepted}
                                handleClick={handleAccept} 
                />
            </div>
        </div>
    )
} 
//Hotel policies screen with 1 policy 
const HotelPolicy = ({text, update, policy, policyText}) => {
    return (
        <Stack>
            <Header>
                {text.header}
            </Header>
            <PolicyBlock text={text} policy={policy} validateLabel={text.validateLabel} handleAccept={update} />
        </Stack>
    )
}

export default HotelPolicy ;