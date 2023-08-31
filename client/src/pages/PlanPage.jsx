import React from 'react'
import {Typography} from "@mui/material"
import {Link, useNavigate} from "react-router-dom"
import CheckIcon from '@mui/icons-material/Check';
import { useContext } from 'react';
import {SessionAPIContext} from  "../contexts/SessionAPIContext"
import PublicNavbar from '../global/PublicNavbar';
import { backgroundColor } from '../theme';

const PlanPage = () => {
    const colors = backgroundColor;
    const navigate = useNavigate();
    const userInfo = useContext(SessionAPIContext)


  return (
    <div className='pl-20 pr-16 flex flex-col h-full bg-gradient-to-t from-[#374e67] from-20% to-[#0c141c] to-70%'>

        <PublicNavbar/>

        <div className='flex justify-between mt-10 m-auto h-120 w-full'>

            <div className='p-4 m-2 h-90% w-80 text-dark-text border-dark-text border-2 rounded-3xl bg-none animate-fade-down animate-duration-500'>

                <Typography className='text-center' fontSize={35}>Free</Typography>

                <ul className='mt-10 p-2'>
                    <li className='my-4'><CheckIcon/> Access to our charts about your transaction</li>
                    <li className='my-4'><CheckIcon/> Access to our tables with your transactions</li>
                    <li className='my-4'><CheckIcon/> Add up to 25 custom categories and companies that can used to define your transactions</li>
                    <li className='my-4'><CheckIcon/> Add up to 200 transactions with reliable tables and charts.</li>
                </ul>

            </div>

            <div className='p-4 m-2 h-90% w-80 text-dark-text border-dark-text border-2 rounded-3xl bg-none animate-fade-down animate-duration-500 animate-delay-500'>

                <Typography className='text-center' fontSize={35}>Premium</Typography>

                <ul className='mt-10 p-2'>
                    <li className='my-4'><CheckIcon/> Access to our charts about your transaction</li>
                    <li className='my-4'><CheckIcon/> Access to our tables with your transactions</li>
                    <li className='my-4'><CheckIcon/> Up to 75 custom categories and companies that can used to define your transactions</li>
                    <li className='my-4'><CheckIcon/> Add up to 2500 transactions with reliable tables and charts.</li>
                </ul>

                
                <div className='text-center'>
                    <Typography className="text-center py-12" fontSize={35}>39.99$</Typography>
                </div>
            </div>

            <div className='p-4 m-2 h-90% w-80 text-dark-text border-dark-text border-2 rounded-3xl bg-none animate-fade-down animate-duration-500 animate-delay-1000'>

                <Typography className='text-center' fontSize={35}>Pro</Typography>

                <ul className='mt-10 p-2'>
                    <li className='my-4'><CheckIcon/> Access to our charts about your transaction</li>
                    <li className='my-4'><CheckIcon/> Access to our tables with your transactions</li>
                    <li className='my-4'><CheckIcon/> Unlimited custom categories and companies that can be used to define your transactions</li>
                    <li className='my-4'><CheckIcon/> Unlimited transactions with reliable tables and charts.</li>
                </ul>

                <div className='text-center'>
                    <Typography className="text-center py-12" fontSize={35}>99.99$</Typography>
                </div>

            </div>

        </div>
    </div>


  )
}


export default PlanPage;