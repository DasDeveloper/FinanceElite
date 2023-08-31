import React from 'react'
import {Typography} from "@mui/material"
import PublicIcon from '@mui/icons-material/Public';
import { backgroundColor } from '../theme';
import {useNavigate} from "react-router-dom"
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import {SessionAPIContext} from  "../contexts/SessionAPIContext"
import PublicNavbar from '../global/PublicNavbar';

const Homepage = () => {

  const colors = backgroundColor;
  const navigate = useNavigate();
  const userInfo = useContext(SessionAPIContext)


  const redirectToSignUp = () =>{

    navigate('/signup')
     
  }
  const redirectToLogin = () =>{
    navigate('/login')
  }
  const redirectToDashboard = () =>{
    navigate('/dashboard')
  }
  return (
    <div className='pl-20 pr-16 flex flex-col h-100vh bg-gradient-to-t from-[#374e67] from-20% to-[#0c141c] to-70%'>
      
      <PublicNavbar/>

      <div className='text-dark-text mt-10 w-120'>
        <Typography fontSize={45}>Summarize your transactions with ease.</Typography>
          <Typography fontSize={20 } className='w-110 pt-10'>
            Analyze your expenses and transactions by adding your own data. 
            Improve your decisions by using our reliable and secure graphs.
            Enjoy a smooth experience!
          </Typography>
      </div>
     
    </div>
  )
}






export default Homepage