import React, {useState} from 'react';
import styles from './Screen.module.css';

const Screen =  React.forwardRef((props, ref) => {
    const { isLoading, canNavigate, onBack, onContinue, disabled, nextLabel, styling = null } = props ;
    const nextButtonLabel = nextLabel || 'Confirm' ;
    const logoSrc = styling && styling.style && styling.style.logo ? styling.style.logo : '/logo.svg';
    const bgSrc = styling && styling.style && styling.style['background-image'] ? styling.style['background-image'] : '' ;
    const font = styling && styling.style && styling.style['font-family'] ? styling.style['font-family'] : 'sans-serif' ;
    if (isLoading) return(<div className={styles.center}>{props.children}</div>) ;
    else if (!canNavigate) return(<div style={{fontFamily: font, background: `url(${bgSrc}) center no-repeat`, backgroundSize: 'cover'}} className={`${styles.grid} ${styles.grid_no_nav} background`}>{props.children}</div>);
    else {

        return(
            <div style={{fontFamily: font, background: `url(${bgSrc}) center no-repeat`,backgroundSize: 'cover', }} className={`${styles.container} possible_background`}>
                <div className={styles.header}>
                    <div className={styles.header_logoWrapper}>
                    {   
                        logoSrc && 
                        <img src={logoSrc} />
                    }
                    </div>
                </div>
                <div  className={styles.wrapper} >
                    <div   className={styles.content}>{props.children}</div>
                    <div   className={styles.footerWrapper}>
                        <div className={styles.footer}>
                            <button className='secondary_button' onClick={onBack}>Back</button>
                            <button ref={ref} className={`primary_button ${styles.xl} ${disabled ? styles.disabled : false}`} disabled={disabled} onClick={onContinue}>
                            { nextLabel ? `${nextLabel}` : nextButtonLabel }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
})

export default Screen;