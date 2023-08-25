import React from 'react'
import { Typography } from '@mui/material'
import SpendingPerCompanyChart from '../components/SpendingPerCompanyChart'
import SpendingVsRevenueChart from '../components/SpendingVsRevenueChart'
import SpendingPerCategory from '../components/SpendingPerCategory'



const Dashboard = ({isSidebarOpen}) => {


 

  return (
    <>
    <div className='flex flex-col h-full bg-dark-main text-dark-secondary'>


      <Typography fontSize={35} className='p-4 text-dark-icon'>Dashboard</Typography>

      <Typography fontSize={25} className='text-dark-icon p-4 underline'>Spending (Last 14 days)</Typography>
      <div className='h-80 bg-dark-secondary m-4 pl-5'>
      
        <SpendingVsRevenueChart />

      </div>

      
        <Typography fontSize={25} className='text-dark-icon p-4 underline'>Spending Per Company and Category (Last 14 days)</Typography>
        <div className='flex flex-row h-70'>

          <div className='h-full w-2/4 bg-dark-secondary m-4'>

            <SpendingPerCompanyChart/>

          </div>
          <div className='h-full w-2/4 bg-dark-secondary m-4'>
          
            <SpendingPerCategory/>
            
          </div>

        </div>

    </div>
    </>
  )
}

export default Dashboard