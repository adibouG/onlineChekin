import React, { useState } from 'react'
import styles from './Input.module.css' ;
import Image from 'next/image' ;


const Input = ({title, id, type, name, pattern, required, value , autocomplete, handleChange}) => {
    
    console.log(value)
    
    const onChange = (e) => handleChange(e.target.value)

    const handleClear = () => handleChange( '' )

    if (type === 'select' && Array.isArray(value))  {

        console.log(value)
        let o = [<option></option>]
        value.forEach((v) => o.push(<option value={v}>{v}</option>))
       // value.map((v) => <option value={v}>{v}</option>)

        return(
            <div className={styles.field}>
                <label htmlFor={id}>{title}</label>
	            <select  required={required}
                        name={name} 
                        id={id} 
                        placeholder=' ' 
                        onChange={onChange}
                >
                    {o}
                </select>
            </div>


        )
    }

    //pattern = name === 'emailConf' ? new RegExp(pattern) : pattern
    
    return(
        <div className={styles.field}>
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
            <button className={value && value.length ? styles.clearButton_show : styles.clearButton} onClick={handleClear}>
               
            </button>
        </div>
    )
}

export default Input;