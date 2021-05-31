import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import useSWR from 'swr'
import Spinner from '../components/Spinner'
import Screen from '../components/Screen'


const fetcher = url => fetch(url).then(res => res.json());
const Welcome = dynamic(() => import('../components/Welcome'))
const Confirmation = dynamic(() => import('../components/Confirmation'))
const HotelPolicy = dynamic(() => import('./HotelPolicy/index.js'))
const PersonalDetails = dynamic(() => import('./PersonalDetails/index.js'))



const Home = () => {

  const { data, error } = useSWR('/api/fetch', fetcher)
  const [ step, setStep ] = useState(0)
  const steps = ['welcome', 'confirm',  'policies' , 'details', 'payment' ]

  useEffect(() => {
    const vhCheck = require('vh-check')
    vhCheck('browser-address-bar')
  });


  const updateDb = (updatedData) => {


    
  }

  const updateGuestDetails = (guest) => {

    console.log(data)
    console.log(guest)
    next()

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
      return <Confirmation reservation={data.reservation}/>
    } else if (step == 2) {
      return <HotelPolicy policy={data.policy}/>
    }  else if (step == 3) {
      return <PersonalDetails guest={data.guest} onContinue={updateGuestDetails} />
    } else if (step == 4) {
      return <div>TODO: Enter details</div>
    }
  }
  
  return <Screen 
    isLoading={!data} 
    canNavigate={step !== 0} 
    onBack={previous}
    onContinue={next}>
      {content()}
    </Screen>
}

export default Home