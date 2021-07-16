import Head from 'next/head';

const HeadTags = ({ title }) => 
  <div>
    <Head>
      <title>Register your stay : Advanced Check In</title>
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta name = "viewport" content = "width = device-width , initial-scale = 1, user-scalable = no" />
      <meta name = "viewport" content = "height = device-height, initial-scale = 1 , user-scalable = no" />
{/*<!--
          <meta name="format-detection" content="telephone=no" />
          <meta property="og:title" content="Check In" key="CheckIn" /> 
-->*/}
    </Head>
  </div>
 
export default HeadTags ;