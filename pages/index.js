import React, { useEffect, useState , useRef } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
//import useSWR from 'swr'
import axios from 'axios'
import Spinner from '../components/Spinner'
import Screen from '../components/Screen'


//const fetcher = url => fetch(url).then(res => res.json());
const Welcome = dynamic(() => import('./Welcome/index.js'))
const Confirmation = dynamic(() => import('./Confirmation/index.js'))
const HotelPolicy = dynamic(() => import('./HotelPolicy/index.js'))
const PersonalDetails = dynamic(() => import('./PersonalDetails/index.js'))
const Payment = dynamic(() => import('./Payment/index.js'))
const Success = dynamic(() => import('./Success/index.js'))

let isValidGuest = false ;
let originalValue = {} ;

const Home = (props) => {

  const router = useRouter() ;

  console.log(router)

  console.log(router.query.token)
  console.log(router.query.name)

  console.log(router.asPath)

  let  queryParams = new URLSearchParams(String(router.asPath).replace('/' , ''))

  console.log(queryParams.has('token'))
  console.log(queryParams.has('name'))
  


  

  
  const steps = ['welcome', 'confirm',  'policies' , 'details', 'payment' , 'success']
  const [disabled , setDisabled] = useState(false);
  //const { data, error } = useSWR('/api/fetch', fetcher)

  //const [ name, setName ] = useState(null);
  //const [ token, setToken ] = useState(null);
  const [ step, setStep ] = useState(0);
  const [ data, setData ] = useState(null);
  const [ error, setError ] = useState(null);

  const formRef = useRef();

  useEffect(() => {
    const vhCheck = require('vh-check')
    vhCheck('browser-address-bar')
  });

  
  useEffect( () => {

    console.log(router.query)
    console.log(router.query.name)
    console.log(router.query.token)
    
   // router.push(  {
  //   pathname: `/`,
  //   query: {
  //     token : token,
  //     name:guestName
  //   }
  // },
  ///',
  //shallow: true}
  //
  } , [] );

 
    
  let backendUrl = `${process.env.BACKEND_HOST}:${process.env.BACKEND_PORT}`;
  let url =`${backendUrl}/reservation`;
  

  useEffect( async () => {
    let token = queryParams.get('token')
    let reservationId =`?token=${token}` ;
    let getUrl = url + reservationId
    console.log(getUrl)
    try{
      const request =  await axios.get(getUrl) ;
      originalValue = request.data.checkin ;
      return setData(request.data.checkin) ;
    }catch(e){
      console.log(e)
    }
  } , [] );


  useEffect( () => {
    console.log('setData')
  }, [data]);


   
   const setDB = async () => {
    let setRequest =  await axios.post(url , data) ;
    originalValue = setRequest.data.checkin ;
    return setData(setRequest.data.checkin) ;
  }

  
  
  
  useEffect(() => {
    if (step == 2) {
      setDisabled(!data.privacyPolicy.accepted)
    }  
    if (step == 3) {
     
      setDisabled(!isValidGuest)
      
    } 
    if (step == 4) {  
      setDisabled(!data.payment.paid)
        
    }
  } , [step , data] );


  
   useEffect(() => {

     if (step == 3) {
        setDB() ;
     } 
     if (step == 4) {  
      setDB() ;
     }
   } , [step] );


  const validate = (v) => {
    isValidGuest = v ;
    setDisabled(!isValidGuest)
  }


  const updateGuestDetails = (guestDetail , value) => {
   
    if (data.guest[guestDetail] !== value) { 
      setData({ 
        ...data ,
        guest : {
          ...data.guest ,
          [guestDetail] : value 
        }
      })
    } 
  }

  const updatePayment = ({amount , currency , method , bank , isPaid}) => {

    setDisabled(false);
    setData( {
      ...data, 
      payment : { 
        ...data.payment ,
        paid : true 
      }
      }
    )

  }

const getFormValues = () => {
  debugger
 
  let details = {} ;
  
  let f = document.getElementById('form') ;
  for ( let i = 0 ; i < 15 ; i+=2) {

      if (f[i].name in data.guest) details[f[i].name] = f[i].value  ;
  } 

  return details;
} 



  const updatePolicies = ({name , value}) => {

      setData( {
            ...data, 
            privacyPolicy : { 
              ...data.privacyPolicy ,
              accepted : value 
            }
          }
      )
}

  const previous = () => {
    setStep(Math.max(step - 1, 0))
  }

  const next = () => { 
   
    if (step === 2) {
      setDisabled(!data.privacyPolicy.accepted)
    }  
    if (step === 3) { 

      let details = getFormValues() ;
      
      setData({ 
        ...data ,
        guest : details
      })
    }
    if (step === 4) {
    
    }
    setStep(Math.min(step + 1, steps.length - 1))
  }

  const GUEST_DISPLAY_NAME = data ? ( data.guest.firstName + ' ' + data.guest.lastName ) : queryParams.get('name')
  const content = (props) => {
    
    if (error) {
      return `Error: ${error.message}`;
    } else if (!data || router.isFallback) {
      return <Spinner/>
    } else if (step === 0) {
      return <Welcome guest={GUEST_DISPLAY_NAME} onContinue={next} {...props}/>
    } else if (step === 1) {
      return <Confirmation reservation={data.reservation} />
    } else if (step === 2) {
      return <HotelPolicy policy={data.privacyPolicy} 
                          update={updatePolicies} 
                          />
    }  else if (step === 3) {
      return <PersonalDetails ref={formRef} guest={data.guest} 
      update={updateGuestDetails} isValid={validate} 
      />
    } else if (step === 4) {
      return <Payment payment={data.payment} update={updatePayment}/>
    } else if (step === 5) {
      return <Success day={data.reservation} {...props} />
    }
  }
  
  return <Screen 
    isLoading={!data} 
    canNavigate={step !== 0 && step !== 5} 
    onBack={previous}
    onContinue={next}
    disabled={disabled}
    // ref={ref}
    >
      {content()}
    </Screen>
}


const WaitingWelcome = (props) => {

  
  return (
    <div className={styles.screen}>
        <div className={styles.content}>
            <div className={styles.logo}/>
            <Card step={-1}
                supertitle={SUCCESS}
                title={DETAILS}
                subtitle={BYE}
                
            />
        </div>
    </div>
)


}  
/*

export async function getStaticPaths() {
  return {
    // Only `/posts/1` and `/posts/2` are generated at build time
    params: [{ params: { id: '1' } }, { params: { id: '2' } }],
    // Enable statically generating additional pages
    // For example: `/posts/3`
    fallback: true,
  }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await axios.(`https://.../posts/${params.id}`)
  const post = await res.json()

  // Pass post data to the page via props
  return {
    props: { post },
    // Re-generate the post at most once per second
    // if a request comes in
    revalidate: 1,
  }
}
*/

export default Home