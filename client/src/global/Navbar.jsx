import React from 'react'
import {Box} from "@mui/material"
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { useLocation } from 'react-router-dom';import {backgroundColor} from '../theme.js';
import axios from "axios"

const Navbar = ({onMenuClick}) => {

  const colors = backgroundColor;

  const handleLogout = async () =>{


    await axios.post('/api/auth/logout', {withCredentials:true}).then(res =>{

      if(res.status ===404){
        alert('Something went wrong! Contact administrator')
      }
      if(res.data.status ===200){
        window.location.reload();
      }

    })
  }

  return (
    <>
    <Box className='flex justify-between  m-0 pt-4 bg-dark-main h-20 w-auto border-b-dark-secondary'>
      <MenuOutlinedIcon  onClick={onMenuClick} className='mt-auto mb-auto ml-1' sx={{fontSize:50, color:colors['dark-text']}}/>
      
      <button  onClick={handleLogout} className='h-10 w-28 bg-dark-graph-red text-dark-text rounded-3xl mt-auto mb-auto ml-auto mr-3'><LogoutIcon/> Logout</button>
      
    </Box>
    </>
  )
}

export default Navbar