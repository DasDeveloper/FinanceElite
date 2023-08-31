import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import {DataGrid, GridToolbar} from "@mui/x-data-grid"
import axios from "axios"
import { backgroundColor } from '../theme'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NewCategoryModal from '../components/modals/NewCategoryModal';
import { useContext } from 'react'
import {SessionAPIContext} from "../contexts/SessionAPIContext"
import Swal from 'sweetalert2'
import LoadingModal from '../components/loading/LoadingModal'

const CategoryPage = () => {

    const user = useContext(SessionAPIContext)

    const colors =  backgroundColor;
    const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
    const [rows, setRows] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=>{

        getAllCategories()
    },[isNewCategoryModalOpen, loading])

    const getAllCategories = async () =>{

        await axios.post('/api/category/getAllCategory', {
            userID: user.userID
        }).then((res) =>{
            
           setRows(res.data);

        }).catch(err=>{
            console.log(err)
        });
    }

    const handleEditRow = (params) =>{
        Swal.fire({
            title:"Edit Category",
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

    const handleDeleteRow = (params) => {

        const deleteRow = async (id) =>{
            axios.post('/api/category/delete',{categoryID: id})
            .then(res =>{
                
                if(res.data.status ===422){
                    alert("Something went wrong. Contact administrator.")
                }
                setLoading(false);
            })
         }

        Swal.fire({
            title:"Delete Category",
            text:`Are you using you want to delete Category: ${params.row.category}?`,
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

    const columns = [
        {field: 'id', headerName: 'id', },
        // {field: 'company', headerName: 'Company', flex:1},
        {field: 'category', headerName: 'Category', flex:1},
        {field: 'actions', headerName: 'Actions', flex:1, sortable: false, renderCell: (params) =>(
            <div className='flex flex-row items-center justify-between'>
                {/* <button><EditIcon onClick={() => handleEditRow(params)}/></button> */}
                <button><DeleteIcon onClick={() => handleDeleteRow(params)}/></button>
            </div>
        )}
        
    ]


  return (
    <>
    {loading ? <LoadingModal/> : <></>}
    <NewCategoryModal isNewCategoryModalOpen={isNewCategoryModalOpen} onClose={() =>  setIsNewCategoryModalOpen(false)}/>
    <div className='h-full w-full bg-dark-main text-dark-text'>
        <div className='ml-10 mt-10'>

            <div className='flex flex-row justify-between items-center mb-10'>
                <Typography className="text-dark-text" fontSize={35}>Category</Typography>
                <button className='w-40 h-10 mr-20 bg-dark-graph-red rounded-3xl' onClick={() => setIsNewCategoryModalOpen(!isNewCategoryModalOpen)}>New Category</button>
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
                        csvOptions: { disableToolbarButton: true },
                        printOptions: { disableToolbarButton: true },
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

export default CategoryPage