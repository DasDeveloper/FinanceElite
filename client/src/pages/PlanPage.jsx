import React from 'react'
import {Typography} from "@mui/material"
import PublicIcon from '@mui/icons-material/Public';
import { backgroundColor } from '../theme';
import {Link, useNavigate} from "react-router-dom"
import CheckIcon from '@mui/icons-material/Check';
import { useContext } from 'react';
import {SessionAPIContext} from  "../contexts/SessionAPIContext"
import PublicNavbar from '../global/PublicNavbar';

const PlanPage = () => {
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

        {/* <div className='flex flex-row justify-between h-20 mt-12'>
          <div className='flex flex-row text-dark-text'>
            <PublicIcon sx={{fontSize:35, color:colors['dark-text']}}/> <Typography fontSize={25}>FinanceElite</Typography>
            <p className='h-10 ml-10 mt-1 text-2xl text-dark-text hover:underline'><Link to={'/plans'}>Our plans</Link></p>
          </div>
          <div>
          {!userInfo ? (
              <>
            <button  onClick={redirectToLogin}className=' mr-2 w-40 h-12 bg-none text-center text-dark-text border-2 border-dark-text rounded-3xl hover:bg-dark-graph-red hover:text-dark-text hover:border-dark-graph-red'>Login</button>
            <button  onClick={redirectToSignUp}className='w-40 h-12 bg-none text-center text-dark-text border-2 border-dark-text rounded-3xl hover:bg-dark-text hover:text-dark-main'>Sign Up</button></>):
            <button  onClick={redirectToDashboard}className='w-40 h-12 bg-none text-center text-dark-text border-2 border-dark-text rounded-3xl hover:bg-dark-text hover:text-dark-main'> Dashboard</button>}
          </div> 
        </div>       */}
        <PublicNavbar/>

        <div className='flex justify-between mt-10 m-auto h-120 w-4/5'>

            <div className='p-4 h-full w-100 text-dark-text border-dark-text border-2 rounded-3xl bg-none animate-fade-down animate-duration-500'>

                <Typography className='text-center' fontSize={35}>Free</Typography>

                <ul className='mt-10 p-2'>
                    <li className='my-4'><CheckIcon/> Access to our charts about your transaction</li>
                    <li className='my-4'><CheckIcon/> Access to our tables with your transactions</li>
                    <li className='my-4'><CheckIcon/> Up to 25 custom categories and companies that can used to define your transactions</li>
                    {/* <li><CheckIcon/>Up to 100 requests per day</li> */}
                </ul>

                <div className='text-center'>
                    <Typography className="text-center py-12" fontSize={35}>0$/month</Typography>
                    {/* <button className='bg-dark-graph-red w-2/4 h-10 rounded-2xl'><Link to={"/"}>Select</Link></button> */}
                </div>

            </div>

            <div className='p-4 h-full w-100 text-dark-text border-dark-text border-2 rounded-3xl bg-none animate-fade-down animate-duration-500 animate-delay-500'>

                <Typography className='text-center' fontSize={35}>Premium</Typography>

                <ul className='mt-10 p-2'>
                    <li className='my-4'><CheckIcon/> Access to our charts about your transaction</li>
                    <li className='my-4'><CheckIcon/> Access to our tables with your transactions</li>
                    <li className='my-4'><CheckIcon/> Up to 75 custom categories and companies that can used to define your transactions</li>
                    {/* <li><CheckIcon/>Up to 100 requests per day</li> */}
                </ul>

                
                <div className='text-center'>
                    <Typography className="text-center py-12" fontSize={35}>12.99$/month</Typography>
                    <button className='bg-dark-graph-red w-2/4 h-10 rounded-2xl'><Link to={"/"}>Select</Link></button>
                </div>
            </div>

            <div className='p-4 h-full w-100 text-dark-text border-dark-text border-2 rounded-3xl bg-none animate-fade-down animate-duration-500 animate-delay-1000'>

                <Typography className='text-center' fontSize={35}>Pro</Typography>

                <ul className='mt-10 p-2'>
                    <li className='my-4'><CheckIcon/> Access to our charts about your transaction</li>
                    <li className='my-4'><CheckIcon/> Access to our tables with your transactions</li>
                    <li className='my-4'><CheckIcon/> Unlimited custom categories and companies that can be used to define your transactions</li>
                    {/* <li><CheckIcon/>Up to 100 requests per day</li> */}
                </ul>

                <div className='text-center'>
                    <Typography className="text-center py-12" fontSize={35}>29.99$/month</Typography>
                    <button className='bg-dark-graph-red w-2/4 h-10 rounded-2xl'><Link to={"/"}>Select</Link></button>
                </div>

            </div>

        </div>
    </div>


  )
}


export default PlanPage;