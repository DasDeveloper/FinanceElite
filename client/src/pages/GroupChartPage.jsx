import React, {useState} from 'react'
import {Typography} from "@mui/material"
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { backgroundColor } from '../theme';
import CompanyChart from '../components/CompanyChart';
import CategoryChart from '../components/CategoryChart';

const GroupChartPage = () => {
    const colors = backgroundColor;

    const [numberCompany, setNumberCompany] = useState(14);
    const [numberCategory, setNumberCategory] = useState(14);
  
    const handleChangeDaysNumberCompany = (event)=>{
  
      setNumberCompany(event.target.value)
  
    }
    const handleChangeDaysNumberCategory = (event) =>{
        setNumberCategory(event.target.value)
    }

    return (
      <div className='flex flex-col h-full bg-dark-main text-dark-secondary'>
  
      <div className='flex flex-row justify-between items-center mr-10'>
  
        <Typography fontSize={35} className='p-4 text-dark-icon'>Company Chart</Typography>
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
              name: 'Days',
              id: 'uncontrolled-native',
            }}
            onChange={handleChangeDaysNumberCompany}
          >
            <option value={5}>5</option>
            <option value={7}>7</option>
            <option value={14}>14</option>
            <option value={21}>21</option>
            <option value={28}>28</option>
            <option value={30}>30</option>
            <option value={60}>60</option>
          </NativeSelect>
        </FormControl>
        
      </div>
        
      <div className='h-80 bg-dark-secondary m-4 pl-5'>
        <CompanyChart daysNumber={numberCompany}/>
      </div>
        

      <div className='flex flex-row justify-between items-center mr-10'>
  
        <Typography fontSize={35} className='p-4 text-dark-icon'>Category Chart</Typography>
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
            onChange={handleChangeDaysNumberCategory}
          >
            <option value={5}>5</option>
            <option value={7}>7</option>
            <option value={14}>14</option>
            <option value={21}>21</option>
            <option value={28}>28</option>
            <option value={30}>30</option>
            <option value={60}>60</option>
          </NativeSelect>
        </FormControl>
        
      </div>

      <div className='h-80 bg-dark-secondary m-4 pl-5'>
        <CategoryChart daysNumber={numberCategory}/>
      </div>

      
  
      </div>
    )
}

export default GroupChartPage