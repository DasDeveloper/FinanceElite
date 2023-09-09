import { Typography } from '@mui/material'
import React, { useState } from 'react'
import {Link, useNavigate}from "react-router-dom"
import axios from "axios"
import Loading from '../components/loading/Loading';
import { useFormik } from 'formik';
import {loginSchema} from "../validations/loginValidation"
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';
import Swal from 'sweetalert2'
import { backgroundColor } from '../theme'


const LoginPage = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false)
  const [isWrongCredential, setIsWrongCredential] = useState(false);
  const colors = backgroundColor;
  const vertical ='top';
  const horizontal='right';

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsWrongCredential(false);
  };
  


  const onSubmit = async (values, actions) =>{

      setLoading(true)

    await axios.post("/api/auth", {
      email:values.email,
      password:values.password
    }, {withCredentials:true}).then(res =>{

      setLoading(false)

      if(res.data.status === 200){
        actions.resetForm()
        
        navigate('/dashboard')
      }
      if(res.data.status === 401){

        setIsWrongCredential(true)
        
      }
    }).catch((err) =>{

      if(err.response.status ===429){
        Swal.fire({
          title:"Too many requests",
          text:`Too many requests are being sent in a short amount of time. Please try again later.`,
          icon:'warning',
          showConfirmButton: true,
          confirmButtonColor: colors['dark-graph-red'],
          background:colors['dark-main'],
          color:colors['dark-text'], 
      }).then(()=>{
        navigate('/')
          })

      }
      
    })
    
    return;
}

const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({

  initialValues:{
    email: "",
    password: ""
  },
  validationSchema: loginSchema,
  onSubmit

})

if(loading){
  return <Loading/>
}

  return (
    <div className='h-100vh bg-dark-main'>

        <div className='flex flex-col bg-dark-secondary text-dark-text border-none h-5/6 w-2/5 rounded-3xl m-auto mt-16'>

            <Typography className="text-center p-4" fontSize={40}>Login</Typography>

            <div className='flex flex-col mx-8 mt-8 h-full'>

            <form onSubmit={handleSubmit}>
                    
                    {/* <Typography className="py-5" fontSize={25}>Email</Typography> */}
                    <input id="email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} className={ (errors.email && touched.email) ? "text-dark-main mb-2 mt-12 pl-2 py-3 h-12 w-full rounded-xl border-2 border-red":"text-dark-main mb-2 mt-12 pl-2 py-3 h-12 w-full rounded-xl"} type='text' placeholder=' Email' />
                    {errors.email && touched.email ? <p className='text-red'>{errors.email}</p>:<></>}

                    {/* <Typography className="py-5" fontSize={25}>Password</Typography> */}
                    <input id="password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} className={ (errors.password && touched.password) ? "text-dark-main mb-2 mt-12 pl-2 py-3 h-12 w-full rounded-xl border-2 border-red":"text-dark-main mb-2 mt-12 pl-2 py-3 h-12 w-full rounded-xl"} type='password' placeholder=' Password'/>
                    {errors.password && touched.password ? <p className='text-red'>{errors.password}</p>:<></>}



                    <Typography className="pt-4 text-center" fontSize={25}>Don't have an account? <Link className="underline" to="/signup">Sign Up</Link> </Typography>
                    
                    <button type="submit" disabled={(errors.email || errors.password) ? true : false} className='bg-dark-graph-red my-10  text-dark-text h-14 w-full m-auto text-center rounded-xl'>Sign In</button>
                </form> 

            </div>
        </div>
        <Snackbar open={isWrongCredential} autoHideDuration={6000} anchorOrigin={{vertical, horizontal}} onClose={handleClose}>

        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          <AlertTitle>Incorrect credentials</AlertTitle>
              Please use the right credentials!
          </Alert>
        </Snackbar>
        
    </div>
  )
}

export default LoginPage