import styles from '../styles/Home.module.css'
import useSWR from 'swr'
import Spinner from 'react-bootstrap/Spinner'
import dynamic from 'next/dynamic'

const Test = dynamic(() => import('components/Test').then((mod) => mod.Test), { ssr: false });
const fetcher = url => fetch(url).then(res => res.json());

export default function Home() {
  
  const { data, error } = useSWR('/api/fetch', fetcher);

  const content = () => {
    if (error) {
      return `Error: ${error.message}`;
    } else if (!data) {
      return <Spinner animation="border" role="status"/>;
    } else {
      return (
        <>
          <div className={[styles.container, styles.top, styles.no_mouse].join(' ')}>Hello {data.name}</div>
          <Test 
            size="75px" 
            radius="15px"
            hoverTint="var(--Grey, rgb(199, 199, 199))"
            tint="var(--Grey_Light, rgb(245, 245, 245))"            
          />
        </>
      );
    }
  };

  return <div className={styles.container}>
    {content()}
  </div>;
}