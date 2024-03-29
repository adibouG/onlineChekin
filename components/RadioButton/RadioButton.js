import React from 'react';
import styles from './RadioButton.module.css';
import Image from 'next/image';
//import SvgImage from './SvgImage.js';
const RadioButton = ({ name, id, value, w, h, isChecked, src, img, handleChange = false }) => {
    const onChange = (e) => {
        let name = e.target.name ;
        let value = e.target.value ;
        let checked = e.target.checked ;
        if (handleChange) return handleChange({ name, value, checked });
    }

    return(
        <label htmlFor={id} className={styles.RadioButton}>
            <input type="radio" name={name} id={id} value={value} checked={isChecked} onChange={onChange}/>
            <Image width={w} height={h} alt={`${value}`} src={isChecked ? `/${src}2.svg` : `/${src}.svg`} className={isChecked ? styles.bankMethodButton_img2 : styles.bankMethodButton_img} />
            {/*
            <SvgImage img={img} url={`${src}.svg`} svgStyle={isChecked ? 'selected' : 'normal'} />
            */}
        </label>
    )
}

export default RadioButton;