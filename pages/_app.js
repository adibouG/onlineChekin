import '../styles/globals.css';
import HeadTags from '../components/HeadTags.js';
function MyApp({ Component, props }) 
{
  return (
    <>
      <HeadTags />
      <Component {...props} />
    </>
  )
}

export default MyApp;