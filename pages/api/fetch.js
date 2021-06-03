
import axios from 'axios'



export default async (req, res) => {

  // TODO: get this from db
let url ='http://localhost:3003/reservation?token=43c98ac2-8493-49b0-95d8-de843d90e6ca' ;
let reservation = await axios.get(url) ;
/*
  const start = new Date()
  const end = new Date(start.getDate() + 2)
  const options = { weekday: 'long', month: 'short', day: 'numeric' };
  const locale = undefined
  const startDate = start.toLocaleDateString(locale, options)
  const endDate = end.toLocaleDateString(locale, options)


  const reservation = {
    uuid: "3a4e4236-01fe-4d1a-b104-d4ded4e96c6b",
    guest:  {
       fullName: "Franciscus Hubertus Schouenberg",
       firstName: "Franciscus",
       lastName: "Hubertus Schouenberg",
       address: null,
       postalCode: null,
       city: null ,
       email: "frank@enzosystems.com",
       mobile: null ,
    },
  
    reservation: {
      startDate: startDate,
      endDate: endDate,
      guestCount: 2,
      roomType: "Queens Room Deluxe",
      options: ["Breakfast", "Late Checkout"]
    },
  
    hotelPolicies : {
      termsAndConditions: {
        content: "Terms and conditions\n\nSmoking is not permitted in any apartment or apartment building, this includes the use of electronic cigarettes. There is a € 240 deep cleaning fee applied if \
        you smoke in a room. Guests are required to keep the apartment, furniture, fittings and effects in the same condition as on arrival. Inventories and condition reports can be provided at the start and end of the stay, if required, at an additional cost. You \
        are required to notify us of any damage, loss or broken items or matters requiring general maintenance. Any damage to the apartment will be charged in full. In the event that these are discovered alter departure, we will notify you or the booker within 7 days \
        of departure with full details and where possible photographic evidence. Please note this cashless property and all of our partners operate the same policy. By completing the above you are agreeing to our Terms & Condition.",
       accepted:  false,
      }
    }, 
    payment: {
       amount: 90.58,
       currency: "€",
       paid: true
    }
  };
  */
  
  
console.log(reservation.data)
  // TODO: locale based on header

  res.status(200).send(reservation.data) 

}
