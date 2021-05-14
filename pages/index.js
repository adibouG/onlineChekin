import styles from '../styles/Home.module.css'
import useSWR from 'swr'
import Spinner from 'react-bootstrap/Spinner'
import dynamic from 'next/dynamic'

const Form = dynamic(() => import('components/Form').then((mod) => mod.Form), { ssr: false });

const fetcher = url => fetch(url).then(res => res.json());

export default function Home() {
  
  const { data, error } = useSWR('/api/fetch', fetcher);

  const content = () => {
    if (error) {
      return `Error: ${error.message}`;
    } else if (!data) {
      return <Spinner animation="border" role="status"/>;
    } else {
      return <Form defaultValue={data.name} />
    }
  };

  return <div className={styles.container}>
    {content()}
  </div>;
}