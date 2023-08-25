import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import {DataGrid, GridToolbar} from "@mui/x-data-grid"
import axios from "axios"
import { backgroundColor } from '../theme'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext } from 'react'
import {SessionAPIContext} from "../contexts/SessionAPIContext"
import Swal from 'sweetalert2'
import LoadingModal from '../components/loading/LoadingModal'
import NewTransactionModal from '../components/modals/NewTransactionModal'

const TransactionPage = () => {

  const colors = backgroundColor;

  const userInfo = useContext(SessionAPIContext);

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false)
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  useEffect(()=>{

    getAllTransactions()
},[isNewTransactionModalOpen, loading])

const getAllTransactions = async () =>{


    await axios.post('/api/transaction/getAllTransactions', {
        userID: userInfo.userID
    }).then((res) =>{
        
        // console.log(res.data)
       setRows(res.data);

    }).catch(err=>{
        console.log(err)
    });
}

  
  const columns = [
    {field: 'id', headerName: 'id', flex:1},
    {field: 'company', headerName:'Company', flex:1},
    {field: 'category', headerName: 'Category', flex:1},
    {field: 'amount', headerName: 'Amount', flex:1, renderCell: (params)=>(
        <div>{(params.row.type === 'Spending' ? <Typography className='text-red'>${params.row.amount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Typography>: <Typography className='text-green'>${params.row.amount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Typography>)}</div>
    )},
    {field: 'paymentType', headerName:'Payment Type', flex:1},
    {field: 'date', headerName:'Date', flex:1, sortable:true, renderCell: (params)=>(
        <Typography className='text-dark-text'>{params.row.date.substring(0,10)}</Typography>
    )},
    {field: 'type', headerName: 'Type', flex:1},
    {field: 'actions', headerName: 'Actions', flex:1, sortable: false, renderCell: (params) =>(
            <div className='flex flex-row items-center justify-between'>
                <button><EditIcon onClick={() => handleEditRow(params)}/></button>
                <button><DeleteIcon onClick={() => handleDeleteRow(params)}/></button>
            </div>
        )}
  ]

  const handleEditRow = (params) =>{
    Swal.fire({
        title:"Edit Transaction",
        text:`This feature is currently disabled.`,
        icon:'warning',
        // showCancelButton:true,
        // cancelButtonText:'Dismiss',
        // cancelButtonColor:colors['dark-secondary'],
        // confirmButtonText:'Cancel',
        // confirmButtonColor:colors['dark-graph-red'],
        background:colors['dark-main'],
        color:colors['dark-text'], 
    })
  }

  const handleDeleteRow = (params) =>{


    const deleteRow = async (id) =>{
        axios.post('/api/transaction/delete',{transactionID: id})
        .then(res =>{
            
            if(res.data.status === 422){
                alert("Something went wrong. Contact administrator.")
            }
            if(res.data.status === 404){
                alert( "System error or transaction id not found in database")
            }
            setLoading(false);
        })
     }

    Swal.fire({
        title:"Delete Transaction",
        text:`Are you using you want to delete the following transaction:  ${params.row.category} ${params.row.company} ${params.row.type} ${params.row.paymentType} ${params.row.date.toString()}?`,
        icon:'warning',
        showCancelButton:true,
        cancelButtonText:'Cancel',
        cancelButtonColor:colors['dark-secondary'],
        confirmButtonText:'Delete',
        confirmButtonColor:colors['dark-graph-red'],
        background:colors['dark-main'],
        color:colors['dark-text'], 
    }).then(res =>{
            if(res.isConfirmed){
                setLoading(true);
                deleteRow(params.row.id)
                
            }
        }
    )

  }

  return (
    <>
    {loading ? <LoadingModal/> : <></>}
    <NewTransactionModal isNewTransactionModalOpen={isNewTransactionModalOpen} onClose={() =>  setIsNewTransactionModalOpen(false)}/>
      <div className='h-full w-full bg-dark-main text-dark-text'>

        <div className='ml-10 mt-10'>

            <div className='flex flex-row justify-between items-center mb-10'>

                <Typography className="text-dark-text" fontSize={35}>Transaction</Typography>
                <button className='w-40 h-10 mr-20 bg-dark-graph-red rounded-3xl' onClick={() => setIsNewTransactionModalOpen(true)}> New Transaction </button>
            </div>

            <Box 
            className="w-95%"
            sx={
                {
                    height:'700px',
                    "& .MuiDataGrid-root":{
                        border:'none'
                    },
                    "& .MuiDataGrid-cell":{
                            borderBottom: 'none',
                    },
                    "& .name-column-cell":{
                        color: colors['dark-text']
                    },
                    "& .MuiDataGrid-columnHeaders":{
                        backgroundColor: colors['dark-secondary'],
                        borderBottom: 'none'
                    },
                    "& .MuiDataGrid-columnHeaderTitleContainerContent":{
                        color: colors['dark-text']
                    },
                    "& .MuiDataGrid-cellContent":{
                        color: colors['dark-text']
                    },
                    "& .MuiButtonBase-root":{
                        color: colors['dark-text']
                    },
                    "& .MuiInputBase-root":{
                        color: colors['dark-text']
                    },
                    "& .MuiDataGrid-footerContainer":{
                        color: colors['dark-text']
                    },
                    "& .MuiTablePagination-root":{
                        color: colors['dark-text']
                    },
                    "& .MuiSvgIcon-root":{
                        color: colors['dark-text']
                    },
                    
                }
            }>
                <DataGrid
                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                    
                    columnVisibilityModel={{ id:false }}
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                      toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                      },
                    }}
                    columns={columns}
                    rows={rows}
                />
            </Box>


        </div>

      </div>
    </>
  )
}

export default TransactionPage