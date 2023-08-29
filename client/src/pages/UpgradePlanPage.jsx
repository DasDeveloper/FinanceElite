import { Typography } from '@mui/material'
import React, { useContext } from 'react'
import { SessionAPIContext } from '../contexts/SessionAPIContext'
import CheckIcon from '@mui/icons-material/Check';
import PublicNavbar from '../global/PublicNavbar';
import { Link } from 'react-router-dom';

const UpgradePlanPage = () => {

    
  const userInfo = useContext(SessionAPIContext);



  return (
    <div className='pl-20 pr-16 flex flex-col h-100vh bg-dark-main text-dark-text'>

        <PublicNavbar/>

        <Typography  className="text-center" fontSize={50}>Based on your current plan, here are your possible upgrades:</Typography>

        
        <div className='flex justify-between mt-10 m-auto h-120 w-4/5'>
          
          {userInfo.userPlan ==='FREE' ?<>
            <div className='p-4 h-full w-100 text-dark-text border-dark-text border-2 rounded-3xl bg-none animate-fade-down animate-duration-500'>
                  <Typography className='text-center' fontSize={35}>Premium</Typography>

                  <ul className='mt-10 p-2'>
                      <li className='my-4'><CheckIcon/> Access to our charts about your transaction</li>
                      <li className='my-4'><CheckIcon/> Access to our tables with your transactions</li>
                      <li className='my-4'><CheckIcon/> Up to 75 custom categories and companies that can used to define your transactions</li>
                      <li className='my-4'><CheckIcon/> Add up to 2500 transactions with reliable tables and charts.</li>
                  </ul>


                  <div className='text-center'>
                      <Typography className="text-center py-12" fontSize={35}>39.99$</Typography>
                      <button className='bg-dark-graph-red w-2/4 h-10 rounded-2xl'><Link to={'/checkout'} state={{productID:1}}>Select</Link></button>
                  </div>
            </div>



            <div className='p-4 h-full w-100 text-dark-text border-dark-text border-2 rounded-3xl bg-none animate-fade-down animate-duration-500 animate-delay-500'>
              <Typography className='text-center' fontSize={35}>Pro</Typography>

              <ul className='mt-10 p-2'>
                  <li className='my-4'><CheckIcon/> Access to our charts about your transaction</li>
                  <li className='my-4'><CheckIcon/> Access to our tables with your transactions</li>
                  <li className='my-4'><CheckIcon/> Unlimited custom categories and companies that can be used to define your transactions</li>
                  <li className='my-4'><CheckIcon/> Unlimited transactions with reliable tables and charts.</li>
              </ul>
              <div className='text-center'>
                  <Typography className="text-center py-12" fontSize={35}>99.99$</Typography>
                  <button className='bg-dark-graph-red w-2/4 h-10 rounded-2xl'><Link to={'/checkout'} state={{productID:2}}>Select</Link></button>
              </div>
            </div>

            </>:<></>}


            {userInfo.userPlan === 'PREMIUM' ? <>

            <div className='p-4 h-full w-100 text-dark-text border-dark-text border-2 rounded-3xl bg-none animate-fade-down animate-duration-500 animate-delay-500'>
              <Typography className='text-center' fontSize={35}>Premium to Pro</Typography>

              <ul className='mt-10 p-2'>
                  <li className='my-4'><CheckIcon/> Access to our charts about your transaction</li>
                  <li className='my-4'><CheckIcon/> Access to our tables with your transactions</li>
                  <li className='my-4'><CheckIcon/> Unlimited custom categories and companies that can be used to define your transactions</li>
                  <li className='my-4'><CheckIcon/> Unlimited transactions with reliable tables and charts.</li>
              </ul>
              <div className='text-center'>
                  <Typography className="text-center py-12" fontSize={35}>60.00$</Typography>
                  
                  <button className='bg-dark-graph-red w-2/4 h-10 rounded-2xl'><Link to={'/checkout'} state={{productID:3}}>Select</Link></button>
              </div>
            </div>
            
            </>:<></>}
        
        </div>
            
   
        
        
    </div>
  )
}

export default UpgradePlanPage