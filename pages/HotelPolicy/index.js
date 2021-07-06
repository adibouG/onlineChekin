import * as React from 'react';
import styles from './index.module.css';
import ToggleSwitch from '../../components/ToggleSwitch.js' ;
import { Stack, Header } from '../../components/Stack.js';

const PolicyBlock = ({ text, validateLabel, policy, handleAccept}) => {
    if (!policy) return;
    let splitedPolicyTerm = policy.content.split('\n\n') ;
    let policyName = (polName) => 
        <div className={styles.policyBlock__policyName} >
            <span className={styles.policyBlock__policyName__text} >
                {polName}
            </span>
        </div>;
    let policyRules = (rules) => 
        <div className={styles.policyBlock__policyRules} >
            <span className={styles.policyBlock__policyRules__text} >
                {rules}
            </span>
        </div> ;
    let title = policyName(splitedPolicyTerm[0]);
    let body = policyRules(splitedPolicyTerm[1]);

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

const HotelPolicy = ({text, update, policy}) => {
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