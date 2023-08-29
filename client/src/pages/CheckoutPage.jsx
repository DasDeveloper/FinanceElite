import React, { useEffect, useState } from 'react'
import {Elements} from "@stripe/react-stripe-js"
import axios from "axios"
import { loadStripe } from '@stripe/stripe-js';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import { Navigate, useNavigate } from 'react-router-dom';


const CheckoutPage = () => {

  const [stripePromise, setStripePromise] = useState()
  const [clientSecret, setClientSecret] = useState()
  const navigate = useNavigate();
  

  return (
    <>
      {/* <Elements stripe={stripePromise} options={options}>

        <form>

        </form>
      </Elements> */}
    </>
  )
}

export default CheckoutPage