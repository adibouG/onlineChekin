import * as React from 'react'
import styles from './index.module.css'
import Card from '../../components/Card'

const weekDays = {
    en : ['Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday' , 'Sunday'] ,
 //fr : ['Lundi' , 'Mardi' , 'Mercredi' , 'Thursday' , 'Friday' , 'Saturday' , 'Sunday']
}

 const Success = ( props) => {
    
    let {date , lang} = props;

    let userDefaultLanguage =  window.navigator.userLanguage || window.navigator.language 
    
    let day ;
    if (lang() !== lang(userDefaultLanguage)) {
        day = new Date(date).toDateString(false, { weekday: 'long' });
    }
    else{
        day = new Date(date).toLocaleDateString(false, { weekday: 'long' });
    }
    const SUCCESS = 'Checked in!'
    const DETAILS = 'To pick up your room key, please use the QR-code in your e-mail at the key pick up device in the lobby.'
    const BYE = `Looking forward seeing you ${day}!`

    const onContinue = () => false ;
    
    return (
        <div className={styles.screen}>
            <div className={styles.content}>
                <div className={styles.logo}/>
                <Card step={5}
                    supertitle={SUCCESS}
                    title={DETAILS}
                    subtitle={BYE}
                />
            </div>
        </div>
    )
}

export default Success

