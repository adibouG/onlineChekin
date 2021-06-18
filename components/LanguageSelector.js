import  React  from 'react'

import styles from './LanguageSelector.module.css'

const LanguageSelector = (props) => {

    let selectedLanguage = props.selected || props.default || 'EN';


    

    let selectorLabel = props.text && props.text.selectorLabel ? props.text.selectorLabel : 'Languages'

    const handleLangChange = (e) => { 
        if (selectedLanguage === e.target.value) return ;
 
        if (props.handleLangChange) {
            
            props.handleLangChange(e.target.value)
        
        }
    }

    return (
<div className={styles.wrapper}>
   
    <select className={styles.select} name={"lang"} onChange={handleLangChange}> 
            
        <option value={selectedLanguage}>{selectedLanguage.toUpperCase()}</option>
        <option value={'en'}>EN</option>
        <option value={'fr'}>FR</option>
        <option value={'es'}>ES</option>
    </select>
</div>
    )
}


export default LanguageSelector