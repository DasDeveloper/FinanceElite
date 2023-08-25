import React from 'react'
import {Typography} from "@mui/material"
import PublicIcon from '@mui/icons-material/Public';
import { backgroundColor } from '../theme';
import {useNavigate} from "react-router-dom"

const Homepage = () => {

  const colors = backgroundColor;
  const navigate = useNavigate();

  const redirectToSignUp = () =>{

    navigate('/signup')
     
  }
  const redirectToLogin = () =>{
    navigate('/login')
  }
  return (
    <div className='pl-20 pr-16 flex flex-col h-100vh bg-gradient-to-t from-[#374e67] from-20% to-[#0c141c] to-70%'>

      <div className='flex flex-row justify-between h-44 mt-12'>
          <div className='flex flex-row text-dark-text'>
            <PublicIcon sx={{fontSize:35, color:colors['dark-text']}}/> <Typography fontSize={25}>FinanceElite</Typography>
          </div>
          <div>
            <button  onClick={redirectToLogin}className=' mr-2 w-40 h-12 bg-none text-center text-dark-text border-2 border-dark-text rounded-3xl hover:bg-dark-graph-red hover:text-dark-text hover:border-dark-graph-red'>Login</button>
            <button  onClick={redirectToSignUp}className='w-40 h-12 bg-none text-center text-dark-text border-2 border-dark-text rounded-3xl hover:bg-dark-text hover:text-dark-main'>Sign Up</button>
          </div>
          
      </div>

      <div className='text-dark-text w-120'>
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