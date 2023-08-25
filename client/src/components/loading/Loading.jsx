import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
  return (
    <div className='grid place-items-center h-screen'><CircularProgress size={150} /></div>
  )
}

export default Loading