import * as React from 'react'
import styles from './ToggleSwitch.module.css'



const ToggleSwitch = ({labelText, name , isChecked = false , onClick , id = null }) => {

   // let accepted = val ? "checked" : null ;
    
    id = id || name ;
    const handleClick = (e) => {

        let name = e.target.name ;  
        let value = e.target.checked ;
        if (onClick) { onClick({name, value}) ;}
        return ({name , value})  ;
    } 


    return(
        <label htmlFor={id} className={styles.switchWrapper} > 
            <span className={styles.label_text}>{labelText}</span>
            <div className={styles.switch}>
                <input className={styles.hidden} type="checkbox" name={name} id={id} /*checked={isChecked}*/  onChange={handleClick} />
                <span className={styles.roundSlider} ></span>
            </div>
        </label>

    )
}


export default ToggleSwitch ;