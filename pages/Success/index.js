import * as React from 'react';
import styles from '../css/index.module.css';
import Card from '../../components/Card';

const Success = (props) => {
    let { date, lang, text } = props;
    let day = new Date(date).toLocaleDateString(lang(), { weekday: 'long' });     
    const onContinue = () => false ;
    let subtitleText = text ? text.subtitle.replace('$day' , day) : "";
    let supertitleText = text ? text.supertitle : "" ;
    let titleText = text ? text.title : "" ;
    return (
        <div className={styles.screen}>
            <div className={styles.content}>
                <div className={styles.logo}/>
                <Card step={5}
                    supertitle={supertitleText}
                    title={titleText}
                    subtitle={subtitleText}
                />
            </div>
        </div>
    )
}

export default Success;

