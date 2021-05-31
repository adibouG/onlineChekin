import * as React from 'react'
import styles from './Stack.module.css'

const Stack = (props) => {
    return <div className={styles.stack} {...props}/>
}

const Header = (props) => {
    return <div className={styles.header} {...props}/>
}

export { Stack, Header }
