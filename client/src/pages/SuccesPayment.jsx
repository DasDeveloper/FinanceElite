import React from 'react'
import { useNavigate } from 'react-router-dom'


const SuccesPayment = () => {

  const navigate = useNavigate()

  const redirectToDashboard = () =>{
    navigate('/dashboard')
  }
  return (
    <div className="bg-dark-main h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-8 bg-dark-secondary rounded-lg shadow-lg">
        <svg
          className="mx-auto w-16 h-16 fill-dark-icon"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 0a10 10 0 100 20 10 10 0 000-20zm4.2 6.1L8.5 13.5 5.8 10.8a1 1 0 10-1.4 1.4l3 3a1 1 0 001.4 0l6-6a1 1 0 00-1.4-1.4z"
            clipRule="evenodd"
          />
        </svg>
        <h2 className="mt-4 text-xl font-semibold text-dark-text">Payment Successful</h2>
        <p className="mt-2 text-dark-text">
          Thank you for your payment! Your transaction was successful and you've upgraded to your new plan.
        </p>
        <button  onClick={redirectToDashboard} className="mt-6 bg-dark-graph-red hover:bg-dark-graph-red-light text-dark-text px-4 py-2 rounded-md">
          Continue
        </button>
      </div>
    </div>
  )
}

export default SuccesPayment