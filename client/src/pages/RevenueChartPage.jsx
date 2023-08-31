import React, {useState} from 'react'
import SpendingChart from '../components/SpendingChart'
import {Typography} from "@mui/material"
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { backgroundColor } from '../theme';
import RevenueChart from '../components/RevenueChart';

const RevenueChartPage = () => {
  const colors = backgroundColor;

  const [number, setNumber] = useState(14);

  const handleChangeDaysNumber = (event)=>{

    setNumber(event.target.value)

  }
  return (
    <div className='flex flex-col h-full bg-dark-main text-dark-text'>

    <div className='flex flex-row justify-between items-center mr-10'>

      <Typography fontSize={35} className='p-4'>Revenue Chart</Typography>
      <FormControl
        sx={{
          width: '250px',
          "& .MuiFormLabel-root":{
            color:colors['dark-text']
          },
          "& .MuiInputBase-root ":{
            color:colors['dark-text'],
          },
          "& .MuiNativeSelect-select":{
            color:colors['dark-text'],
            borderBottom: "2px solid " + colors['dark-text']
            
          },
          "& .MuiSvgIcon-root":{
            color:colors['dark-text']
          },
          "& .css-v4u5dn-MuiInputBase-root-MuiInput-root:after":{
            borderBottom: "2px solid " + colors['dark-text']
          }
        }}
      >
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Days
        </InputLabel>
        <NativeSelect
          defaultValue={14}
          inputProps={{
            name: 'age',
            id: 'uncontrolled-native',
          }}
          onChange={handleChangeDaysNumber}
        >
          <option value={5}>5</option>
          <option value={7}>7</option>
          <option value={14}>14</option>
          <option value={21}>21</option>
          <option value={28}>28</option>
          <option value={30}>30</option>
        </NativeSelect>
      </FormControl>
      
    </div>
      

    <div className='h-120 text-dark-icon  bg-dark-secondary m-4 pl-5'>
      <RevenueChart daysNumber={number}/>
    </div>
      

    </div>
  )
}

export default RevenueChartPage