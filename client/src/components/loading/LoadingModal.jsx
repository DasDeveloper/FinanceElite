import React from 'react'
import { CircularProgress } from '@mui/material'

const LoadingModal = () => {
  return (
    <div className='bg-modal-background w-full h-full fixed z-1200'>
        <div className='grid place-items-center h-screen'><CircularProgress size={150} /></div>
    </div>
  )
}

export default LoadingModal