import React, { useEffect, useState , useRef } from 'react'

import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
//import useSWR from 'swr'
import axios from 'axios'
import Screen from '../components/Screen'

import LanguageSelector from '../components/LanguageSelector.js'

//const fetcher = url => fetch(url).then(res => res.json());
const Welcome = dynamic(() => import('./Welcome/index.js'))
const Failed = dynamic(() => import('./Failed/index.js'))
const Confirmation = dynamic(() => import('./Confirmation/index.js'))
const HotelPolicy = dynamic(() => import('./HotelPolicy/index.js'))
const PersonalDetails = dynamic(() => import('./PersonalDetails/index.js'))
const Payment = dynamic(() => import('./Payment/index.js'))
const Success = dynamic(() => import('./Success/index.js'))


let backendUrl = `${process.env.BACKEND_HOST}:${process.env.BACKEND_PORT}`;
let url =`${backendUrl}/reservation`;
let qrUrl =`${backendUrl}/qrcode`;

let isValidGuest = false ;
let originalValue = {} ;

const PersonalDetailsWithForwrdRef = React.forwardRef((props, ref) => (
  <PersonalDetails {...props} forwardedRef={ref} />
))

const Home = (props) => {

  const router = useRouter() ;

  
  const steps = ['error', 'failed', 'welcome', 'confirm',  'policies' , 'details', 'payment' , 'success']
  const languageList = ['en', 'fr' ]
  

  const [disabled , setDisabled] = useState(false);
  
  //const { data, error } = useSWR('/api/fetch', fetcher)

  const [ name, setName ] = useState('');
  const [ token, setToken ] = useState(null);
  const [ step, setStep ] = useState(-1);
  const [ data, setData ] = useState(null);
  const [ error, setError ] = useState(null);
  
  const [ guestValidated, setGuestValidated ] = useState(false);
  const [ qrCode, setQrCode ] = useState(null);
 


  const formRef = useRef(null);
  const nextButtonRef = useRef(null);
  
  const [lang , setLang] = useState(null);
  const [text , setText] = useState(null);
  
  useEffect(() => {
    const vhCheck = require('vh-check')
    vhCheck('browser-address-bar')
  });
  
  
  
  useEffect(() => {
    
    let userLanguage = window.navigator.userLanguage || window.navigator.language || 'en-GB' ;
    setLang(getLang(userLanguage))
    let text = require('public/text_en.json')
    console.log('text')
    console.log(text)
    setText(text)
    
  } , [] );

  
 
  
  useEffect(() => {

    
  
  } , [ lang ] );
    
      
  useEffect( () => {
    let location = router.asPath ;
    let  queryParams = new URLSearchParams(String(location).replace('/?' , '?'))
    let tokenurl = queryParams.get('token')
    let guestName = queryParams.get('name')
    
    if (guestName) setName(guestName.replace(/\./g , ' '))
    if (tokenurl) setToken(tokenurl)
    else if (!tokenurl) setError('your start-checking-in token provided in your email could not be retrieved.')

    //if (window) (/mobile/i).test(window.navigator.userAgent) && !location.hash && setTimeout(() => window.scrollTo(0, 1) , 1000) ;​
    
  } , [] );


  
  useEffect( () => {

    if (error) setStep(-2) ;

  }, [error] )
 
    
 
  

  useEffect( async () => {

    if (!token) return ;
    
    let reservationId =`?token=${token}` ;
    let getUrl = url + reservationId

    console.log(getUrl)

    try{
      const request =   await axios.get(getUrl) ;
      originalValue = request.data.checkin ;
      return setData(request.data.checkin) ;
    }catch(e){

      console.log(e)
      setError(e.message);

    }
  } , [token] );



  useEffect( async () => {

    if (name && token){ //TODO:Remove token from url
      router.replace(  {
          pathname: `/`,
          query: {}
          }, '/', 
          {shallow: true}
        )
    }
  } , [name , token] );


  const  handleLangChange = (v) => {

    if (v.includes('-')) v = v.split('-')[0];

    setLang(v.toLowerCase())

  } 

const getLang = ( l = null) => {

    let v = l || lang ;
    if (v.includes('-')) {
      v = v.split('-')[0];
    } 

    v = v.toLowerCase()

   return v

}   

  const setDB = async () => {
    let setRequest =  await axios.post(url , data) ;
    originalValue = setRequest.data.checkin ;
    return setData(setRequest.data.checkin) ;
  }

  
  
  const validateGuest = (v) => {
    isValidGuest = v ;
    setGuestValidated(v) ;
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

 
  const updatePayment = ({ amount , currency , method , bank , isPaid}) => {

    
    setData( {
      ...data, 
      payment : { 
        ...data.payment ,
        paid : true 
      }
    }
    )
    
    setDisabled(!isPaid);
  }

const getFormValues = () => { 
  let details = {} ;
  debugger
  let f = formRef.current // document.getElementById('form') ;
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

const getQrCode = async (data) => {

  
  try{

    let request = await axios.post(qrUrl , data ) ;
    let response = request.data ;
    let qrCode = request.data.qrcode ;
    setQrCode(qrCode) ;
  }
  catch(e){
    console.log(e) ;
    setError(e.message)
  }
}


useEffect(() => {
    
  if (step === -1) {
    if (data) setStep(0);  
    else if (error) setStep(-2);  
  }  
 
  if (step === 0) {
  // if (data) setName( data.guest.firstName ));  
   
  }  

  if (step === 1) {
    if (disabled) setDisabled(false);  
  }  

  if (step === 2) {
    setDisabled(!data.privacyPolicy.accepted)
  }  
  if (step === 3) {
    
    setDisabled(!isValidGuest)
    
  } 
  if (step === 4) {  
    setDisabled(!data.payment.paid)
      
  }
  if (step === 5) {  
   // getQrCode(data) //token ?
      
  }
} , [step , data] );



 useEffect(() => {

   if (step === 3) {
      setDB() ;
   } 
   if (step === 4) {  
     setDB() ;
   }
   if (step === 5) {  
    setDB() ;
    getQrCode(data)
  }
 } , [step] );



  const previous = () => {
    setStep(Math.max(step - 1, 0))
  }

  const next = () => { 
   
    if (step === 2) {
    
    }  
    if (step === 3) { 

      let details = getFormValues() ;
      
      setData({ 
        ...data ,
        guest : details
      })
    }
    if (step === 4) {
     
      //trigger payment  

    }

    setStep(Math.min(step + 1, steps.length - 1))
  }



  const content = (props) => {
    
    if (step < -1) {
        return <Failed reason={error} 
                      text={text && text.Failed[getLang()]} 
                      step={step} 
                      onContinue={false} 
                      {...props}  
                />
    }  else if (step === -1 || step === 0 ) {
      return <Welcome step={step} 
                      guest={name} 
                      onContinue={next} 
                      text={text && text.Welcome[getLang()]} 
                      {...props}
              />
    } else if (step === 1) {
      return <Confirmation reservation={data.reservation} 
                          text={text && text.Confirmation[getLang()]} 
              />
    } else if (step === 2) {
      return <HotelPolicy policy={data.privacyPolicy} 
                          update={updatePolicies} 
                />
    }  else if (step === 3) {
      return <PersonalDetailsWithForwrdRef ref={formRef} 
                              guest={data.guest} 
                              update={updateGuestDetails} 
                              isValid={isValidGuest} 
                              validate={validateGuest}
      />
    } else if (step === 4) {
      return <Payment payment={data.payment} update={updatePayment}/>
    } else if (step === 5) {
      return <Success date={data.reservation.startDate} {...props} />
    }
  }
  
  return <Screen 
    isLoading={!data} 
    canNavigate={step > 0 && step !== 5} 
    onBack={previous}
    onContinue={next}
    disabled={disabled}
    ref={nextButtonRef}
    nextLabel={step === 4 ? 'Pay' : false }
    >
      {content(props)}
      

   
        <LanguageSelector supported={languageList}
            	            selected={lang} 
            	            handleLangChange={handleLangChange}
         />

    </Screen>
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