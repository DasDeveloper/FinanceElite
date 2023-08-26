import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom"
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import axios from "axios"
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

const response = await axios.get('/api/config');

const stripePromise = loadStripe(response.data)
root.render(
  
    <BrowserRouter>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
      
    </BrowserRouter>
);

