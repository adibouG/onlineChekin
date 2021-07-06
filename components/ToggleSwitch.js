import * as React from 'react';
import styles from './ToggleSwitch.module.css';

const ToggleSwitch = ({labelText, name, isChecked = false, handleClick, id = null }) => {
    const handleChange = (e) => {
        let name = e.target.name ;  
        let value = e.target.checked ;
        if (handleClick) { handleClick({ name, value }) ;}
        return ({ name, value })  ;
    } 

    return(
        <label htmlFor={id} className={styles.switchWrapper} > 
            <span className={styles.label_text}>{labelText}</span>
            <div className={styles.switch}>
                <input  className={styles.hidden} type="checkbox" 
                        name={name} checked={isChecked} 
                        onChange={handleChange} id={id}
                />
                <span className={styles.roundSlider} ></span>
            </div>
        </label>

    )
}


export default ToggleSwitch ;