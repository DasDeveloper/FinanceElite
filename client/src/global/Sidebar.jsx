import React, { useContext } from 'react'
import Box from '@mui/material/Box'
import { backgroundColor } from '../theme';
import { Typography } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import PaidIcon from '@mui/icons-material/Paid';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import { CSidebar, CSidebarBrand, CSidebarNav, CNavItem } from '@coreui/react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CategoryIcon from '@mui/icons-material/Category';
import StoreIcon from '@mui/icons-material/Store';
import {SessionAPIContext} from "../contexts/SessionAPIContext"
import {useNavigate} from "react-router-dom"
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import UpgradeIcon from '@mui/icons-material/Upgrade';


const Sidebar = ({isOpen}) => {

  const colors = backgroundColor;
  const userInfo = useContext(SessionAPIContext)
  const navigate = useNavigate();

  const redirectToHomepage = () =>{
    navigate('/')
  }


  if(isOpen){

  return (

    <>

    <Box className='w-72 bg-dark-main text-dark-text border-dark-secondary border-r-dark-secondary border-r-4'>

      <CSidebar>
        <CSidebarBrand><div onClick={redirectToHomepage} className='flex flex-row m-auto max-w-min justify-center mt-4 p-2'><PublicIcon sx={{fontSize:35, color:colors['dark-text']}}/> <Typography className=''fontSize={25}>FinanceElite</Typography> </div></CSidebarBrand>
          <CSidebarNav className='m-auto mt-10 '>
          <Typography className='pb-20 text-center' fontSize={25}>Hello, {userInfo.firstname} {userInfo.lastname}</Typography>

          <Typography className='p-2 text-2xl'> Main</Typography>
            
            <CNavItem className='flex flex-row p-2 hover:bg-dark-secondary w-full' href="/dashboard">
              <DashboardIcon className='mr-2'/>
              <Typography>Dashboard</Typography>
            </CNavItem>


            <Typography className=' p-2 text-2xl'> Data</Typography>

            <CNavItem className='flex flex-row p-2 hover:bg-dark-secondary w-full' href="/transaction">
              <ReceiptIcon className='mr-2'/>
              <Typography>Transactions</Typography>
            </CNavItem>

            <CNavItem className='flex flex-row p-2 hover:bg-dark-secondary w-full' href="/category">
              <CategoryIcon className='mr-2'/>
              <Typography>Category</Typography>
            </CNavItem>

            <CNavItem className='flex flex-row p-2 hover:bg-dark-secondary w-full' href="/company">
              <StoreIcon className='mr-2'/>
              <Typography>Company</Typography>
            </CNavItem>

            <Typography className=' p-2 text-2xl'> Charts</Typography>

            <CNavItem className='flex flex-row p-2 hover:bg-dark-secondary w-full' href="/charts/spending">
              <CreditCardIcon className='mr-2'/>
              <Typography>Spending Chart</Typography>
            </CNavItem>

            <CNavItem className='flex flex-row p-2 hover:bg-dark-secondary w-full' href="/charts/revenue">
              <PaidIcon className='mr-2'/>
              <Typography>Revenue Chart</Typography>
            </CNavItem>

            <CNavItem className='flex flex-row p-2 hover:bg-dark-secondary w-full' href="/charts/group">
              <WorkspacesIcon className='mr-2'/>
              <Typography>Group Chart</Typography>
            </CNavItem>

            <Typography className=' p-2 text-2xl'> Plans </Typography>

            <CNavItem className='flex flex-row p-2 hover:bg-dark-secondary w-full' href="/plans">
              <CardMembershipIcon className='mr-2'/>
              <Typography>View Plans</Typography>
            </CNavItem> 

            <CNavItem className='flex flex-row p-2 hover:bg-dark-secondary w-full' href="/upgrade">
              <UpgradeIcon className='mr-2'/>
              <Typography>Upgrade Plan</Typography>
            </CNavItem>

          </CSidebarNav>

      </CSidebar>

    </Box>
    
</>
  )
          }
}

export default Sidebar;