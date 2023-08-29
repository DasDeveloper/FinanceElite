import React from 'react'
import {Elements} from "@stripe/react-stripe-js"
import axios from "axios"
import { loadStripe } from '@stripe/stripe-js';


// const stripePromise = null;

// if(!stripePromise){

//   const response = await axios.get('/api/config');
//   stripePromise = loadStripe(response.data)
// }

const CheckoutPage = () => {

  const options = {

  }
  
  return (
    <>
      {/* <Elements stripe={stripePromise} options={options}>


      </Elements> */}
    </>
  )
}

export default CheckoutPage