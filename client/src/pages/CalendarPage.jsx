import React from 'react'
import Calendar from '../components/Calendar'
import { Typography } from '@mui/material'

const CalendarPage = () => {
  return (
    <div className='bg-dark-main  text-dark-secondary h-full'>

        <Typography fontSize={35} className='p-2'>Calendar</Typography>

        <Calendar className='p-2'/>

    </div>
  )
}

export default CalendarPage