import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate, useLocation } from 'react-router-dom';
import {useStripe, useElements, PaymentElement, LinkAuthenticationElement} from '@stripe/react-stripe-js';
import Loading from '../components/loading/Loading';
import { Typography } from '@mui/material';
import { SessionAPIContext } from '../contexts/SessionAPIContext';

const CheckoutPage = () => {

  const userInfo = useContext(SessionAPIContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOrderSummaryLoading, setIsOrderSummaryLoading] = useState(false);
  const [productDetail, setProductDetail] = useState({
    productName: null,
    productPrice:null
  });
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();
  const stripe = useStripe();
  const elements = useElements();
  const paymentElementOptions = {
    layout: "tabs"
  }
  
  const handleSubmit = async (e) =>{
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    
    //CHECK if current user can upgrade to that plan.


    // setLoading(true);

    // const { error } = await stripe.confirmPayment({
    //   elements,
    //   confirmParams: {
    //     // Make sure to change this to your payment completion page
    //     return_url: `${window.location.origin}/payment/success`,
    //     receipt_email: email,
    //   },
    // });

    // if (error.type === "card_error" || error.type === "validation_error") {
    //   setMessage(error.message);
    // } else {
    //   setMessage("An unexpected error occurred.");
    // }
    
    // setLoading(false);

  }

  useEffect(() =>{

    getProductDetails();
    
  }, [])

  const getProductDetails = async () =>{
    setIsOrderSummaryLoading(true)

    await axios.post('/api/product/getProductByProductID',{
      productID: location.state.productID
    } ).then(res =>{
      setIsOrderSummaryLoading(false);

      setProductDetail(res.data);

    }).catch(err =>{
      console.log(err)
    })
  }
  
  if(loading){
    return <Loading/>
  }
  return (
    
    <div className="flex mx-auto w-full mt-44 p-6 bg-white shadow-md rounded-lg">
    {/* Order Summary */}
    <div className="w-1/2 pr-6">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      {isOrderSummaryLoading ? <Loading/>:<div className='m-4'>

          <Typography fontSize={20}>{productDetail.productName}</Typography>
          <Typography fontSize={20}>{productDetail.productPrice}</Typography>

        </div>}
    </div>
  
    {/* Payment Form */}
    <div className="w-1/2">
      <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-md">
        <div className="mb-6">
          <LinkAuthenticationElement
            id="link-authentication-element"
            onChange={(e) => setEmail(e.value.email)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <PaymentElement
            options={paymentElementOptions}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          disabled={loading || !stripe || !elements}
          className="w-full py-3 px-4 bg-dark-main text-dark-text rounded-md cursor-pointer transition duration-300 hover:bg-blue-600"
        >
          <span className="text-base font-medium">Pay</span>
        </button>
        {/* Show any error or success messages */}
        {message && <div className="mt-4 text-sm text-red-500">{message}</div>}
      </form>
    </div>
  </div>
  

      
  )
}

export default CheckoutPage