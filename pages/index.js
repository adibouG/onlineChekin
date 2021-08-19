import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import axios from 'axios';
//import useSWR from 'swr';
import TEXT from './text/text.json';
import SETTINGS from '../settings.json';
import LanguageSelector from '../components/LanguageSelector/LanguageSelector.js';
import Screen from '../components/Screen/Screen.js';
const Welcome = dynamic(() => import('./Welcome/index.js'));
const Failed = dynamic(() => import('./Failed/index.js'));
const Confirmation = dynamic(() => import('./Confirmation/index.js'));
const Success = dynamic(() => import('./Success/index.js'));
const HotelPolicy = dynamic(() => import('./HotelPolicy/index.js'));
const PersonalDetails = dynamic(() => import('./PersonalDetails/index.js'));
const Payment = dynamic(() => import('./Payment/index.js'));

let BACKENDURL = `${process.env.BACKEND_HOST}:${process.env.BACKEND_PORT}${process.env.BACKEND_API}`;
let APIURL =`${BACKENDURL}${SETTINGS.API_ENDPOINT.GET_RESERVATION}`;
let QRCODEURL =`${BACKENDURL}${SETTINGS.API_ENDPOINT.GET_QRCODE}`;
let RESETURL =`${BACKENDURL}${SETTINGS.API_ENDPOINT.RESET_RESERVATION}`; 

const PersonalDetailsWithForwrdRef = React.forwardRef((props, ref) => (
  <PersonalDetails {...props} forwardedRef={ref} />
))
const { DEFAULT_LANG } = SETTINGS;
//TODO:move text in the text file with translations

const STATUS = { 
  COMPLETE : { 
    VALUE : 'complete',
    MESSAGE : (arrivalDate) => `this reservation was already checked in, the stay arrival date is ${arrivalDate}` 
  },
  PRECHECKED : {
    VALUE : 'prechecked',
    MESSAGE : `this reservation was already pre-checked in` 
  },
  PENDING :{ 
    VALUE : 'pending'
  }
}

const Home = (props) => {
  
  const router = useRouter() ;  
  const steps = ['error', 'failed', 'welcome', 'confirm', 'policies', 'details', 'payment', 'paymentProcess', 'success'];
  const languageList = ['en', 'fr'];
  const [hotelAppSettings, setHotelAppSettings] = useState(null); 
  //State values :
  const [disabled, setDisabled] = useState(false);  
  //const { data, error } = useSWR('/api/fetch', fetcher);
  const [name, setName] = useState('');
  const [token, setToken] = useState(null);
  const [step, setStep] = useState(-1);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hotel, setHotel] = useState(null);
  const [error, setError] = useState(null);
  const [preChecked, setPreChecked] = useState(false);
  const [guestValidated, setGuestValidated] = useState(false);
  const [paymentprocessing, setPaymentprocessing] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [lang, setLang] = useState(DEFAULT_LANG);
  const [text, setText] = useState(TEXT || null);
  //ref:
  const formRef = useRef(null);
  const nextButtonRef = useRef(null);
  const originalValue = useRef(null);
  const screenSetting = useRef(null);
  const hotelStyle = useRef(null);
  const requestToken = useRef(null);
   //getLang get the language to into the correct format , take the state value if none provided
  const getLang = ( l = null) => {
    let v = l || lang;
    if (v.includes('-')) v = v.split('-')[0];
    v = v.toLowerCase();
    return v;
  }
  //effects :  
  //set the viewport height according to the address bar size
  useEffect(() => {
    const vhCheck = require('vh-check');
    vhCheck('browser-address-bar');
  });

  useEffect(() => {
    if (!text) setText(TEXT); //if no text set it ;
    let userDefaultLanguage =  window.navigator.userLanguage || window.navigator.language || DEFAULT_LANG ; //get the user default language value
    let appDefaultLanguage = languageList.includes(getLang(userDefaultLanguage)) ? getLang(userDefaultLanguage) :  getLang(DEFAULT_LANG); //set the language
    return setLang(appDefaultLanguage) ;
  }, []);

  useEffect(() => {
    try{
      let location = router.asPath ;
      let queryParams = new URLSearchParams(String(location).replace('/?', '?'));
      let hotelID = queryParams.has('hotel') ? queryParams.get('hotel') : null;
      let tokenurl = queryParams.has('token') ? queryParams.get('token') : null;
      let guestName = queryParams.has('name') ? queryParams.get('name') : null;
      if (guestName) setName(guestName.replace(/\./g , ' '));
      if (hotelID) setHotel(hotelID);
      if (tokenurl) return setToken(tokenurl);
      else throw new Error('NOTOKEN');
    //if (window) (/mobile/i).test(window.navigator.userAgent) && !location.hash && setTimeout(() => window.scrollTo(0, 1) , 1000) ;​ 
    } catch (e) {
        setError(e.message);
    } 
  }, []);

  useEffect(() => { 
    //Remove token from url once it is retrieved (to prevent any token stealing/injections from requests referer url)
    if (name && token && hotel) return router.replace({ pathname: `/`, query: {} }, '/', { shallow: true }) ;
  }, [name, token, hotel]);

  useEffect(() => { 
    //get the hotel style 
    if (hotelAppSettings) {
      if (props.hotelStyling) props.hotelStyling.setStyle(hotelAppSettings)
    } 
  }, [hotelAppSettings]);

  useEffect(() => {
    //set the step according to the data retrieval results
    if (step > -1)  return ;
    if (data) setStep(0) ;
    if (error && !data) setStep(-2) ; 
    if (error || data) setIsLoading(false);
  }, [error, data]);
 
  useEffect(async () => {
    //get the reservation data, using the token retrieved from the url 
    if (!token) return ; 
    let reservationId =`?token=${token}`;
    let messageDisplayed ;
    try {
      const request = await axios.get(`${APIURL}${reservationId}`);
      originalValue.current = request.data.checkin ; //save the original data for later compare
      if (request.data.hotelAppSettings) setHotelAppSettings(request.data.hotelAppSettings);
      if (request.data.request_token) requestToken.current = request.data.request_token;
      if (request.data.status.toLowerCase() === STATUS.COMPLETE.VALUE) {
        messageDisplayed = STATUS.COMPLETE.MESSAGE(request.data.stay.arrivalDate); 
        setPreChecked(false);
        if (hotel !== request.data.hotel_id) setHotel(request.data.hotel_id);
        return setError(messageDisplayed);
      } else if (request.data.status.toLowerCase() ===  STATUS.PRECHECKED.VALUE) {
        messageDisplayed = STATUS.PRECHECKED.MESSAGE ;
        setPreChecked(true);
        setError(messageDisplayed);
      } else if (request.data.status.toLowerCase() ===  STATUS.PENDING.VALUE) setPreChecked(false);
      if (hotel !== request.data.hotel_id) setHotel(request.data.hotel_id);
      return setData(request.data.checkin) ;
    } catch(e) {
      return setError((e.response && e.response.data) || e.message);
    }
  }, [token]);

  useEffect(() => {
    if (step === -1 || step === 0) {
      if (data && data.guest.firstName && data.guest.lastName) return setName(data.guest.firstName + " " + data.guest.lastName);  
      else return;
    }
    else if (step === 1 && disabled) return setDisabled(false);  
    else if (step === 2) {
      if (!data.privacyPolicy) return setStep(3);
      else return setDisabled(data.privacyPolicy && !data.privacyPolicy.accepted);
    }
    else if (step === 3) return setDisabled(!guestValidated);
    else if (step === 4) return setDisabled(data.payment && !data.payment.paid);
    else if (step === 5){
      if (preChecked) resetBooking(data) ;
      return getQrCode(data);
    }
  }, [step, data]);

  //once the hotel application setting is set , split the data 
  //maybe set it using context API ?
  useEffect(() => {
    if (!hotelAppSettings) return; 
    screenSetting.current = hotelAppSettings.screens || null;
    hotelStyle.current = hotelAppSettings.styles || null;
  }, [hotelAppSettings]);

  useEffect(() => {
    if (step === 3 || step === 4 || step === 5) return setDB() ;
  }, [step] );

  useEffect(() => {
   if (step === 3 && guestValidated) {
     const details = getFormValues() ;      
     if (data.email !== data.guest.email) data.email = data.guest.email ;
     let newData = { ...data, guest: details } ;
     setData(newData) ;
   }
  }, [guestValidated] );

//Functions


  const handleLangChange = (v) => setLang(getLang(v));

  const setDB = async () => {
    let payload = { hotel_id: hotel, step: step, token: token, request_token: requestToken.current, checkin: data };
    try {
      let request =  await axios.post(APIURL, payload) ;
      if (request.data.status.toLowerCase() === STATUS.PRECHECKED.VALUE) setPreChecked(true);
      //return setData(request.data.checkin) ;
    } catch (e) {
      setError(e);
    }
  }
  
  const validateGuest = (value) => setGuestValidated(value) ;

  const updateGuestDetails = (guestDetail, value) => {
    if (data.guest[guestDetail] !== value) return setData({ ...data, guest: { ...data.guest, [guestDetail]: value }});
  }

  const getFormValues = () => { 
    let details = {} ;
    if (!formRef.current) return;
    for ( let i = 0; i < 15; i += 2) {
      if (formRef.current[i].name in data.guest) details[formRef.current[i].name] = formRef.current[i].value ;
    } 
    return details;
  } 

  const updatePayment = ({ amount, currency, method, bank, isPaid }) => {
    if (data.payment.paid) return ;
    if (data.payment.paid !== isPaid) return setData({ ...data, payment: { ...data.payment, paid: isPaid, method, bank, transaction: Date.now() }}) ;
  }

  const processPayment = ({ amount, currency, method, bank, isPaid }) => {
    setPaymentprocessing(true);
    //add a delay to fake the asynchronous payment request 
    setTimeout(() => {
      setPaymentprocessing(false);
      updatePayment({ amount, currency, method, bank, isPaid });
      next(); // setStep(5);
    }, 5000 );
  }

  const updatePolicies = ({ name, value }) => {
    if (data.privacyPolicy.accepted !== value) setData({ ...data, privacyPolicy: { ...data.privacyPolicy, accepted: value }});
  }

  const getQrCode = async (data) => {
    try {
      let payload = { hotel_id: hotel, step: step, token: token, checkin: data };
      let request = await axios.post(QRCODEURL, payload) ;
      let qrCode = request.data;
      return setQrCode(qrCode);
    } catch(e) {
      console.log(e) ;
      return setError(e.message);
    }
  }

  const resetBooking = async (data) => {
    try {
      let request = await axios.get(RESETURL + `?email=${data.email}`) ;
      return request.data ;
    } catch(e) {
      console.log(e) ;
      return setError(e.message);
    }
  } 

  const previous = () => setStep(Math.max(step - 1, 0)) ;

  const next = () => setStep(Math.min(step + 1, steps.length - 1));

  const content = (props) => {
    if (step < -1) return <Failed reason={error} 
                                  text={text && text.Failed[lang]} 
                                  step={step} 
                                  onContinue={false} 
                                  {...props}  
                          />
    else if (step === -1 || step === 0 || isLoading ) return <Welcome step={step} 
                                                                      guest={name} 
                                                                      onContinue={next} 
                                                                      text={text && text.Welcome[lang]} 
                                                                      error={error}
                                                                      isLoading={isLoading}
                                                                      styling={hotelAppSettings}
                                                                      {...props}
                                                />
    else if (step === 1) return <Confirmation reservation={data.reservation} 
                                              text={text && text.Confirmation[lang]} 
                                />
    else if (step === 2) return <HotelPolicy  policy={data.privacyPolicy} 
                                              update={updatePolicies}
                                              policyText={hotelAppSettings} 
                                              text={text && text.HotelPolicy[lang]} 
                                />
    else if (step === 3) return <PersonalDetailsWithForwrdRef ref={formRef} 
                                                              guest={data.guest} 
                                                              update={updateGuestDetails} 
                                                              isValid={guestValidated} 
                                                              validate={validateGuest}
                                                              text={text && text.PersonalDetails[lang]} 
                                />
    else if (step === 4) return <Payment  payment={data.payment}
                                          update={updatePayment}
                                          onContinue={processPayment}
                                          isProcessing={paymentprocessing}
                                          text={text && text.Payment[lang]} 
                                />
    else if (step === 5) return <Success  date={data.reservation.startDate} 
                                          lang={getLang} {...props} 
                                          text={text && text.Success[lang]} 
                                />
  }
  
  return(
     <Screen  isLoading={isLoading} 
              canNavigate={step > 0 && step !== 5} 
              onBack={previous}
              onContinue={next}
              disabled={disabled}
              ref={nextButtonRef}
              styling={hotelAppSettings}
              nextLabel={step === 4 ? 'Pay' : false }
      >
        <LanguageSelector supported={languageList}
                	        selected={lang} 
                 	        handleLangChange={handleLangChange}
        />
        {content(props)}
      </Screen>
  )
}

export default Home;