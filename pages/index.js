import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import useSWR from 'swr'
import Spinner from '../components/Spinner'
import Screen from '../components/Screen'


const fetcher = url => fetch(url).then(res => res.json());
const Welcome = dynamic(() => import('./Welcome/index.js'))
const Confirmation = dynamic(() => import('./Confirmation/index.js'))
const HotelPolicy = dynamic(() => import('./HotelPolicy/index.js'))
const PersonalDetails = dynamic(() => import('./PersonalDetails/index.js'))
const Payment = dynamic(() => import('./Payment/index.js'))
const Success = dynamic(() => import('./Success/index.js'))


const dataUpdater = ({ data }) => {

  fetch({ method : 'POST' , url  }) ;
}


const reservationData = null ;

const Home = () => {

  const [disabled , setDisabled] = useState(false);

  const { data, error } = useSWR('/api/fetch', fetcher)

  const [ step, setStep ] = useState(0);

  const [ resData, setResData ] = useState(data||null);

  const steps = ['welcome', 'confirm',  'policies' , 'details', 'payment' , 'success']

  useEffect(() => {
    const vhCheck = require('vh-check')
    vhCheck('browser-address-bar')
  });

 

  console.log(resData)
  useEffect(() => {
    if (step == 2) {
      setDisabled(false)
    }  
    if (step == 3) {
      setDisabled(false)
    } 
    if (step == 4) {  
      setDisabled(false)
    }
  } , [step] );


  
  // useEffect(() => {
  //   if (step == 2) {
  //     resData.
  //     setDisabled(true)
  //   }  
  //   if (step == 3) {
  //     setDisabled(true)
  //   } 
  //   if (step == 4) {  
  //     setDisabled(true)
  //   }
  // } , [resData] );



  const updateDb = (updatedData) => {


    
  }

  const updateGuestDetails = (guest) => {

    console.log(data)
    console.log(guest)
    next()

  }

  const updatePayment = ({amount , currency , method , isPaid}) => {

    console.log(data)
    console.log(guest)
   // next()

  }


  const updatePolicies = (e) => {

   
    alert(e.target.name)
    alert(e.target.checked)
    let value = e.target.checked
    if (value) { 
    
      data.hotelPolicies.termsAndConditions.accepted = value ;
      setResData(data) ;

      setDisabled(false)
  }
}

  const previous = () => {
    setStep(Math.max(step - 1, 0))
  }

  const next = () => { 
    setStep(Math.min(step + 1, steps.length - 1))
  }

  const content = (props) => {
    if (error) {
      return `Error: ${error.message}`;
    } else if (!data) {
      return <Spinner/>
    } else if (step === 0) {
      return <Welcome guest={data.guest.fullName} onContinue={next} {...props}/>
    } else if (step === 1) {
      return <Confirmation reservation={data.reservation} />
    } else if (step === 2) {
      return <HotelPolicy policy={data.hotelPolicies.termsAndConditions} 
                          update={updatePolicies} 
                          />
    }  else if (step === 3) {
      return <PersonalDetails guest={data.guest} update={updateGuestDetails} />
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
    >
      {content()}
    </Screen>
}

export default Home