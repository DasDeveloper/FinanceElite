import React from 'react'
import { Typography } from '@mui/material'
import SpendingPerCompanyChart from '../components/SpendingPerCompanyChart'
import SpendingVsRevenueChart from '../components/SpendingVsRevenueChart'
import SpendingPerCategory from '../components/SpendingPerCategory'



const Dashboard = ({isSidebarOpen}) => {


 

  return (
    <>
    <div className='flex flex-col w-full bg-dark-main text-dark-text'>


      <Typography fontSize={35} className='p-4 '>Dashboard</Typography>

      <Typography fontSize={25} className=' p-4 underline'>Spending (Last 14 days)</Typography>
      <div className='h-80 bg-dark-secondary m-4 pl-5'>
      
        <SpendingVsRevenueChart />

      </div>

      
        <Typography fontSize={25} className=' p-4 underline'>Spending Per Company and Category (Last 14 days)</Typography>
        <div className='flex flex-row max-w-full h-70'>

          <div className='h-4/5 w-5/12 text-dark-icon bg-dark-secondary m-4'>

            <SpendingPerCompanyChart/>

          </div>
          <div className='h-4/5 w-5/12 text-dark-icon bg-dark-secondary m-4'>
          
            <SpendingPerCategory/>
            
          </div>

        </div>

    </div>
    </>
  )
}

export default Dashboard