import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [name, setName] = useState(null);

  useEffect(() => {
    fetch("api/fetch")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setName(result.name);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  const content = () => {
    if (error) {
      return `Error: ${error.message}`;
    } else if (!isLoaded) {
      return (<Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>);
    } else {
      return `Hello ${name}`;
    }
  };

  return <div className={styles.container}>{content()}</div>;
}

export default Home