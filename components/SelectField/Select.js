import React , {useRef , useState} from 'react';
import styles from './Select.module.css' ;

const Select = ({ title, id, name, required, values, selected, handleChange }) => { 
    let elmntRef = useRef(null) ;
    const [open , setOpen] = useState(false) ;
    const toggleList = () => setOpen(!open) ;
    const handleSelect = (e) => {
        let value = e.target.value || e.target.innerHTML;
        console.log(value);
        handleChange(value);
    }

    let list = [];
    if (selected && values.includes(selected)) {
        list.push(
            <li key={selected} className={styles.Select_selected}>{selected}</li>
        )
        list.push(
            <li key={title} className={styles.Select_selected}>{title}</li>
        )
    } else {
        list.push(
            <li key={title} className={styles.Select_selected}>{title}</li>
        )
    }

    values.forEach((v , i) => 
        list.push( 
            <li key={i} value={v} className={styles.Select_items}>
                {v}
            </li>           
        )
    )
   
    return(
        <div ref={elmntRef} className={styles.Select} onClick={toggleList}>
            {/*
             <div className={open ? styles.Select_arrow_active : styles.Select_arrow} ></div>
            */}
            <ul className={open ? styles.Select_items : styles.Select_items_hidden}  
                onClick={handleSelect}
            >
                {list}
            </ul>
        </div>
    )
}


export default Select;