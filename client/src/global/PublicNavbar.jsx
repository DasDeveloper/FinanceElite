import React from 'react'
import {Typography} from "@mui/material"
import PublicIcon from '@mui/icons-material/Public';
import { backgroundColor } from '../theme';
import {useNavigate} from "react-router-dom"
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import {SessionAPIContext} from  "../contexts/SessionAPIContext"

const PublicNavbar = () => {

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
      const redirectToHomepage = () =>{

        navigate('/')

      }

  return (
     <div className='bg-none flex flex-row justify-between h-20 mt-12'>
          <div className='flex flex-row text-dark-text'>
            <PublicIcon onClick={redirectToHomepage} sx={{fontSize:35, color:colors['dark-text']}}/> <Typography onClick={redirectToHomepage} fontSize={25}>FinanceElite</Typography>
            <p className='h-10 ml-10 mt-1 text-2xl text-dark-text hover:underline'><Link to={'/plans'}>Our plans</Link></p>
          </div>
          <div>
          {!userInfo ? (
              <>
            <button  onClick={redirectToLogin}className=' mr-2 w-40 h-12 bg-none text-center text-dark-text border-2 border-dark-text rounded-3xl hover:bg-dark-graph-red hover:text-dark-text hover:border-dark-graph-red'>Login</button>
            <button  onClick={redirectToSignUp}className='w-40 h-12 bg-none text-center text-dark-text border-2 border-dark-text rounded-3xl hover:bg-dark-text hover:text-dark-main'>Sign Up</button></>):
            <button  onClick={redirectToDashboard}className='w-40 h-12 bg-none text-center text-dark-text border-2 border-dark-text rounded-3xl hover:bg-dark-text hover:text-dark-main'> Dashboard</button>}
          </div> 
     </div>   
  )
}

export default PublicNavbar