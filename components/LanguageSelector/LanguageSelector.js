import  React  from 'react';
import styles from './LanguageSelector.module.css';
const LanguageSelector = (props) => {
    let selectedLanguage = props.selected || props.default || 'EN';
    let supportedLanguages = props.supported || ['en'];
    let options = [];
    for (let l of supportedLanguages) {
        options.push(
            <option key={l} value={l}>{l.toUpperCase()}</option>
        );
    }
    const handleLangChange = (e) => { 
        if (selectedLanguage === e.target.value) return ;
        if (props.handleLangChange) return props.handleLangChange(e.target.value);
    }

    return (
        <div className={styles.wrapper}>
            <select value={selectedLanguage} className={styles.select} name={"lang"} onChange={handleLangChange}> 
                {options}
            </select>
        </div>
    )
}

export default LanguageSelector;