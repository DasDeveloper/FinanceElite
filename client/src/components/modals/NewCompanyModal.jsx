import React, { useState, useContext } from 'react'
import TextField from '@mui/material/TextField';
import { backgroundColor } from '../../theme';
import { Typography } from '@mui/material';
import axios from "axios"
import {SessionAPIContext} from "../../contexts/SessionAPIContext"
import LoadingModal from '../loading/LoadingModal';
import Swal from 'sweetalert2'

const NewCompanyModal = ({isNewCompanyModalOpen, onClose}) => {

    const userInfo = useContext(SessionAPIContext);
    const colors = backgroundColor;
    
    const [loading, setLoading] = useState(false)

    const [company, setCompany] = useState("")


    const handleNewCompanySubmit = async () =>{

      setLoading(true)
      await axios.post('/api/company/addNewCompany',{
        userID: userInfo.userID,
        company:company
      }).then(res =>{
        setCompany("")

        if(res.data.status===422){
          Swal.fire({
            title:"Missing field",
            confirmButtonColor:colors['dark-graph-red'],
            icon:'warning',
            background:colors['dark-main'],
            color:colors['dark-text'], 
        })
        }
        if(res.data.status === 400){
          alert("User id not valid. Please contact administrator.")
        }

        if(res.data.status===409){
          Swal.fire({
            title:"Company already in your records.",
            confirmButtonColor:colors['dark-graph-red'],
            icon:'warning',
            background:colors['dark-main'],
            color:colors['dark-text'], 
        })
        }

        setLoading(false);

        onClose();
      })

    }


if(!isNewCompanyModalOpen){
      return null;
  }

  if(loading){
    return <LoadingModal/>
  }
  const onPressX = () =>{
    setCompany("")
    onClose()
  }
  return (
    <div className='bg-modal-background w-full h-full fixed z-1000'>

    <div className='flex flex-col bg-dark-secondary w-120 h-64 translate-x-65% translate-y-50%'>
        <div className='flex flex-row-reverse'>
          <button onClick={onPressX} className='text-dark-text m-4 text-3xl'>x</button>
        </div>
        <div className='flex flex-col text-center mx-auto h-full'>

        <TextField sx={
          { 
            "& .MuiInputBase-input":{
              backgroundColor: colors['dark-main'],
              color: colors['dark-text']
            },
            "& .MuiFormLabel-root":{
              color: colors['dark-text'],
            },
            "& .css-1ff8729-MuiInputBase-root-MuiFilledInput-root:after":{
              color: colors['dark-text'], 
              borderBottom: '2px solid ' + colors['dark-text'],
            },
          }
        } id="filled-basic" onChange={e => setCompany(e.target.value)} required label="Company" variant="filled" />

        <button  onClick={handleNewCompanySubmit} disabled={(company.length===0) ? true: false} className='bg-dark-graph-red text-center w-80 h-10 rounded-2xl text-dark-text mt-12'>Confirm</button>

        </div>

    </div>

</div>
  )
}

export default NewCompanyModal