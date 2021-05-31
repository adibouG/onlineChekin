import React, { useState } from 'react'
import styles from './Input.module.css' ;
import Image from 'next/image' ;

const Input = ({title, id, type, name, pattern, required, value , autocomplete, handleChange}) => {
    
    console.log(value)
    
    const onChange = (e) => handleChange(e.target.value)

    const handleClear = () => handleChange( '' )

    return  <div className={styles.field}>
	    <input  required={required}
                type={type} 
                autoComplete={autocomplete} 
                pattern={pattern}
                name={name} 
                id={id} 
                value={value} 
                placeholder=' ' 
                onChange={onChange}
            />
	    <label htmlFor={id}>{title}</label>
        <button className={value.length ? styles.clearButton_show : styles.clearButton} onClick={handleClear}>
         </button>
    </div>
}

export default Input;