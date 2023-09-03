import React from 'react'
import {Typography} from "@mui/material"
import PublicNavbar from '../global/PublicNavbar';

const Homepage = () => {

  return (
    <div className='pl-20 pr-16 flex flex-col h-100vh bg-gradient-to-t from-[#374e67] from-20% to-[#0c141c] to-70%'>
      
      <PublicNavbar/>

      <div className='text-dark-text mt-10 w-120'>
        <Typography fontSize={45}>Summarize your transactions with ease.</Typography>
          <Typography fontSize={20 } className='pt-10'>
          Welcome to FinanceElite – Your Ultimate Financial Tracking Solution!

          Take control of your finances like never before with FinanceElite.
          <br/> 
          Our platform empowers you to effortlessly record and manage your transactions, whether it's revenue or spending. 
          <br/>
         <span>Join FinanceElite today and unlock a world of financial clarity and control. 
          Your journey to financial excellence starts here.</span>
          </Typography>
      </div>
     
    </div>
  )
}






export default Homepage