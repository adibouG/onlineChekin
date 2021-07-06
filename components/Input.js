import React from 'react';
import styles from './Input.module.css' ;

 
const Input = ({ title, id, type, name, pattern, required, value, autocomplete, handleChange }) => {
    const onChange = (e) => handleChange(e.target.value);
    const handleClear = () => handleChange('');
    if (type === 'select' && Array.isArray(value)) {
        let o = [<option key={title}>{title}</option>];
        value.forEach((v , i) => o.push(<option key={i} value={v}>{v}</option>));
        return(
            <div className={styles.selectfield}>
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
    } else {
        return(
            <div className={styles.field}>
	            <input  required={required}
                        type={type} 
                        autoComplete={autocomplete} 
                        pattern={pattern}
                        name={name} 
                        id={id} 
                        key={id} 
                        value={value} 
                        placeholder=' ' 
                        onChange={onChange}
                />
	            <label htmlFor={id}>{title}</label>
                <button className={value && value.length ? styles.clearButton_show : styles.clearButton} 
                        onClick={handleClear}
                        tabIndex="-1"
                >
                </button>
            </div>
        )
    }
}

export default Input;