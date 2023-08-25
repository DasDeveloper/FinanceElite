import React, { useState, useContext, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { backgroundColor } from '../../theme';
import { Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from "axios"
import {SessionAPIContext} from "../../contexts/SessionAPIContext"
import LoadingModal from '../loading/LoadingModal';
import Autocomplete from '@mui/material/Autocomplete';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const NewTransactionModal = ({isNewTransactionModalOpen, onClose}) => {

    const userInfo = useContext(SessionAPIContext);
    const colors = backgroundColor;
    const [loading, setLoading] = useState(false)

    const [showSpending, setShowSpending] = useState(false);
    const [showRevenue, setShowRevenue] = useState(false);

    //Choice
    const [companyData, setCompanyData] = useState([]);
    const [categoryData, setCategoryData] = useState([])
    const [paymentTypeData, setPaymentTypeData] = useState(['Cash', 'Debit', 'Credit'])
    const [typeData, setTypeData] = useState(['Spending', 'Revenue'])

    //Submission
    const [company, setCompany] = useState()
    const [category, setCategory] = useState()
    const [paymentType, setPaymentType] = useState()
    const [type, setType] = useState()
    const [amount, setAmount] = useState()
    const [date, setDate] = useState();



    useEffect(()=>{

        getAllCompanies();
        getAllCategories();
        setCompany(null);
        setCategory(null);
        setPaymentType(null);
        setAmount(null);
        setType(null);
        setDate(null)

    }, [isNewTransactionModalOpen])

    const getAllCompanies = async () =>{

        await axios.post('/api/company/getAllCompany',{
            userID: userInfo.userID
        }).then(res =>{

            if(res.data.status===400){
                alert("User ID not found!")
            }
            const cleanedData = [];
            res.data.map(object =>{
                cleanedData.push(object.company)
            })
            setCompanyData(cleanedData)
            
        })
    }

    const getAllCategories = async () =>{

        await axios.post('/api/category/getAllCategory',{
            userID: userInfo.userID
        }).then(res =>{
            if(res.data.status===400){
                alert('User ID not found!')
            }
            const cleanedData = [];
            res.data.map(object =>{
                cleanedData.push(object.category)
            })
            setCategoryData(cleanedData)
            
        })

    }

    const handleNewTransactionSubmit = async () =>{

      setLoading(true)

      await axios.post('/api/transaction/addNewTransaction', {
        userID: userInfo.userID,
        category: category,
        company: company,
        type: type,
        paymentType: paymentType,
        amount: amount,
        date: date

      }).then(res =>{
        setLoading(false);

        if(res.data.status===422){
          alert('Fields missing')
        }
        if(res.data.status ===400){
          alert('User ID not valid. Contact administrator')
        }

        onClose();

      })
    }

  if(!isNewTransactionModalOpen){
        return null;
  }

  if(loading){
    return <LoadingModal/>
  }

  const onPressX = () =>{
    setCompany(null);
    setCategory(null);
    setPaymentType(null);
    setAmount(null);
    setType(null);
    setDate(null)
    setShowRevenue(false)
    setShowSpending(false)
    onClose()
  }

  return (
    <div className='bg-modal-background w-full h-full fixed z-1000'>

    <div className='flex flex-col bg-dark-secondary w-3/5 h-120 translate-x-20% translate-y-20%'>
        <div className='flex flex-row-reverse'>
          <button onClick={onPressX} className='text-dark-text m-4 text-3xl'>x</button>
        </div>

        <div className='m-auto text-dark-text'>
          <Typography fontSize={20} >Choose a transaction type:  </Typography>
          <FormControl>
            <RadioGroup>
              <FormControlLabel onClick={()=>{setShowSpending(true); setShowRevenue(false); setType("Spending")}} value="Spending" control={<Radio />} label="Spending" />
              <FormControlLabel onClick={()=>{setShowRevenue(true); setShowSpending(false); setType("Revenue")}}value="Revenue" control={<Radio />} label="Revenue" />
            </RadioGroup>
          </FormControl>
        </div>
        <div className='flex flex-col items-center text-dark-text m-auto mb-10 w-3/4 h-full'>

      {showSpending ? (<>
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={companyData}
            onChange={(event, newValue) => {
              setCompany(newValue);
            }}
            sx={{ 
                margin:'10px',
                width:'300px',
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
                "& .css-1ff8729-MuiInputBase-root-MuiFilledInput-root:before":{
                  borderBottom: '2px solid ' + colors['dark-text'],
                },
              }}
            renderInput={(params) => <TextField {...params} label="Company" />}
            />

        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={categoryData}
            onChange={(event, newValue) => {
              setCategory(newValue);
            }}
            sx={{ 
                margin:'10px',
                width:'300px',
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
                "& .css-1ff8729-MuiInputBase-root-MuiFilledInput-root:before":{
                  borderBottom: '2px solid ' + colors['dark-text'],
                },
              }}
            renderInput={(params) => <TextField {...params} label="Category" />}
            />

            <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={paymentTypeData}
            onChange={(event, newValue) => {
              setPaymentType(newValue);
            }}
            sx={{ 
                margin:'10px',
                width:'300px',
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
                "& .css-1ff8729-MuiInputBase-root-MuiFilledInput-root:before":{
                  borderBottom: '2px solid ' + colors['dark-text'],
                },
              }}
            renderInput={(params) => <TextField {...params} label="Payment Type" />}
            />
            </>):(<></>)}
{/* 
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={typeData}
            onChange={(event, newValue) => {
              setType(newValue);
            }}
            sx={{ 
                margin:'10px',
                width:'300px',
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
                "& .css-1ff8729-MuiInputBase-root-MuiFilledInput-root:before":{
                  borderBottom: '2px solid ' + colors['dark-text'],
                },
              }}
            renderInput={(params) => <TextField  required {...params} label="Type" />}
            /> */}

{showSpending || showRevenue ? (<>
        <TextField sx={
          
          { 
            margin:'10px',
            width:'300px',
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
            "& .css-1ff8729-MuiInputBase-root-MuiFilledInput-root:before":{
              borderBottom: '2px solid ' + colors['dark-text'],
            },
          }
        } id="filled-basic" onChange={e => setAmount(e.target.value)} required label="Amount" variant="filled" />

        {console.log(date)}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        
        <DatePicker  
        label="Pick a date*"
        format="DD/MM/YYYY"
        onChange={(event, newValue) => {
          console.log(event['$d'].toString())
          setDate(event['$d'].toString());
        }}
        required 
        sx={{ 
            margin:'10px',
            width:'300px',
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
            "& .css-1ff8729-MuiInputBase-root-MuiFilledInput-root:before":{
              borderBottom: '2px solid ' + colors['dark-text'],
            },
          }}/>
      </LocalizationProvider>
      </>):(<></>)}
      
      {showRevenue || showSpending ?
        <button  onClick={handleNewTransactionSubmit} disabled={(!type || !amount || !date) ? true: false} className='bg-dark-graph-red text-center w-80 h-10 rounded-2xl text-dark-text mt-12'>Confirm</button>:<></>
      }        

        </div>
       

    </div>

</div>
  )
}

export default NewTransactionModal