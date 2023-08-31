import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate, useLocation } from 'react-router-dom';
import {useStripe, useElements, PaymentElement, LinkAuthenticationElement} from '@stripe/react-stripe-js';
import Loading from '../components/loading/Loading';
import { Typography } from '@mui/material';
import { SessionAPIContext } from '../contexts/SessionAPIContext';
import Swal from "sweetalert2"
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

  useEffect(() =>{

    getProductDetails();
    
  }, [])
  
  const handleSubmit = async (e) =>{
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }


    setLoading(true);

    const {error, paymentIntent} = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/success`,
      },
      redirect: "if_required",

    })

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error) {
      setMessage(error.message);
      setLoading(false)
    }

    if(paymentIntent && paymentIntent.status === "succeeded"){
    try{

      await axios.post('/api/users/upgradeUserPurchase', {
        productID: location.state.productID,
        userID: userInfo.userID
  
      }).then(res =>{
        setLoading(false)
        if(res.data.status ===200){
          Swal.fire({
            title: 'Upgraded to another plan.'
          })
          delete location.state;
          navigate('/success')
  
        }
      })

      await axios.post('/api/auth/updateSession', {withCredentials: true}).then(res =>{
        
        if(res.data.status===401){
          Swal.fire({
            title:"Unable to update session"
          })
        }
      })
    }catch (error) {
      console.error('Error updating database:', error);
      setLoading(false);
    }
  }
    
  }


  const getProductDetails = async () =>{

    await axios.post('/api/product/getProductByProductID',{
      productID: location.state.productID
    } ).then(res =>{

      setProductDetail(res.data);

    }).catch(err =>{
      console.log(err)
    })
  }
  
  return (
    
    <div className="flex mx-auto w-full mt-44 p-6 shadow-md rounded-lg">
    {/* Order Summary */}
    {/* <div className="w-1/2 pr-6">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      <div className='m-4'>

        <Typography fontSize={20}>{productDetail.productName}</Typography>
        <Typography fontSize={20}>{productDetail.productPrice}</Typography>

       </div>
    </div> */}
    <div class="w-1/2 rounded-lg bg-white p-6 text-dark-main">
      <h2 class="text-xl font-semibold mb-4">Order Summary</h2>
      <div class="flex items-center justify-between mb-4">
        {productDetail.productName ==='PREMIUMTOPRO' ? (<>
        <p>Upgrade from Premium to Pro</p>
        <p>${productDetail.productPrice}</p></>):
        (<>
        <p>{productDetail.productName} Plan</p>
        <p>${productDetail.productPrice}</p></>)}
      </div>
      <hr class="border-t border-dark-text my-4"/>
      <div class="flex items-center justify-between">
        <p>Total</p>
        <p class="text-xl font-semibold">${productDetail.productPrice}</p>
      </div>
      {/* <button class="mt-6 w-full py-2 bg-dark-graph-red text-white rounded-md hover:bg-dark-graph-red-light transition duration-300">Checkout</button> */}
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
        {!loading ?(
         <button
          disabled={!stripe || !elements}
          className="w-full py-3 px-4 bg-dark-main text-dark-text rounded-md cursor-pointer transition duration-300 hover:bg-blue-600"
        >
          <span className="text-base font-medium">Pay</span>
        </button>):<button disabled={true} type="button" className="w-full py-3 px-4 bg-dark-main text-dark-text rounded-md cursor-pointer transition duration-300 hover:bg-blue-600">
                    <svg aria-hidden="true" role="status" className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"></path>
                    </svg>
                    Loading...
                </button>}
        {/* Show any error or success messages */}
        {message && <div className="mt-4 text-sm text-red-500">{message}</div>}
      </form>
    </div>
  </div>
  

      
  )
}

export default CheckoutPage