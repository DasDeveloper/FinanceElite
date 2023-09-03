import { Elements } from '@stripe/react-stripe-js'
import React, { useContext, useEffect, useState } from 'react'
import CheckoutPage from './CheckoutPage'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from "axios"
import { SessionAPIContext } from '../contexts/SessionAPIContext'
import Loading from '../components/loading/Loading'
import Swal from "sweetalert2"

const StripeContainer = ({stripePromise}) => {

  const location = useLocation();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState();
  const userInfo = useContext(SessionAPIContext)
  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#0c141c',
      colorBackground: '#e1e8ef',
    },
  };
  const options = {

    clientSecret: clientSecret,
    appearance:appearance

  }

  useEffect(() =>{
    
    getClientSecret();

  }, [])

  const getClientSecret = async () =>{

    if(!location.state){
      navigate('/')
      return;
    }

    await axios.post('/api/stripe/create-payment-intent',{
      userID: userInfo.userID,
      productID: location.state.productID
    }).then(res =>{
      if(res.data.status === 403){
        Swal.fire({
          title:'Not allowed to purchase this item. Contact administrator.'
        })
        navigate('/')
      }
      setClientSecret(res.data.clientSecret)
    }).catch(err =>{
      if(err.status ==404){
        Swal.fire({
          title:'Something went wrong.'
        })
        navigate('/')
      }
    })
  }

  if(!location.state){
    return;
  }

  if(!clientSecret){
    return <Loading/>;
  }

  // if(loading){
  //   return <Loading/>
  // }
 
  return (
    <div className='w-100vh mx-auto'>
      {clientSecret && (
      <Elements stripe={stripePromise} options={options}>

        <CheckoutPage/>

      </Elements>)}
    
    </div>
    
  )
}

export default StripeContainer