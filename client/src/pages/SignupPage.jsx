import React from 'react'
import { useState } from 'react';
import {useFormik} from "formik"
import { Typography } from '@mui/material';
import {Link} from "react-router-dom"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import Loading from "../components/loading/Loading"
import { signupSchema } from '../validations/signupValidation';
import Swal from 'sweetalert2'
import { backgroundColor } from '../theme';

const SignupPage = () => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const colors = backgroundColor;

    const onSubmit = async (values, actions) =>{

        setLoading(true)
        

        const newUser = {
            firstname:values.firstname,
            lastname:values.lastname,
            email:values.email,
            password:values.password
        }
        await axios.post("/api/users/newUser", newUser).then(res =>{

            setLoading(false);

            if(res.data.status === 422){
                alert("Some fields are missing")
            }

            if(res.data.status === 200){
                // alert("Successfully created an account.")
                actions.resetForm()
                navigate("/login")
                return;
            }
            if(res.data.status === 409){
                alert("Email is already used")
                return;
            }

        }).catch(err =>{
            setLoading(false)
            if(err.response.status===429){

                Swal.fire({
                    title:"Too many sign up requests.",
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
            // console.log(err)
        }); 
        
    }

    const {values, handleBlur, touched, errors, handleChange, handleSubmit} = useFormik({

        initialValues:{
            firstname: "",
            lastname: "",
            email: "",
            password: ""
        },
        validationSchema: signupSchema,
        onSubmit
    })

    if(loading){
        return <Loading/>
    }

  return (
    <>
    <div className='h-100vh bg-dark-main'>

        <div className='flex flex-col justify-center bg-dark-secondary pr-10 text-dark-text border-2 border-dark-secondary h-90% w-2/5 rounded-3xl m-auto mt-20'>

            <Typography className="text-center p-3" fontSize={40}>Sign Up</Typography>

            <div className='flex flex-col ml-12 h-full'>

                <form onSubmit={handleSubmit}>
                    {/* <Typography className="py-5" fontSize={25}>First Name</Typography> */}
                    <input id="firstname" name="firstname" value={values.firstname} onChange={handleChange} onBlur={handleBlur} className={ (errors.firstname && touched.firstname) ? "text-dark-main mb-2 mt-12 pl-2 py-3 h-12 w-full rounded-xl border-2 border-red":"text-dark-main mb-2 mt-12 pl-2 py-3 h-12 w-full rounded-xl"} type='text' placeholder=' First Name'/>
                    {errors.firstname && touched.firstname ? <p className='text-red'>{errors.firstname}</p>:<></>}

                    {/* <Typography className="py-5" fontSize={25}>Last Name</Typography> */}
                    <input id="lastname" name="lastname" value={values.lastname} onChange={handleChange} onBlur={handleBlur} className={ (errors.lastname && touched.lastname) ? "text-dark-main mb-2 mt-12 pl-2 py-3 h-12 w-full rounded-xl border-2 border-red":"text-dark-main mb-2 mt-12 pl-2 py-3 h-12 w-full rounded-xl"} type='text' placeholder=' Last Name' />
                    {errors.lastname &&touched.lastname ? <p className='text-red'>{errors.lastname}</p>:<></>}

                    {/* <Typography className="py-5" fontSize={25}>Email</Typography> */}
                    <input id="email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} className={ (errors.email && touched.email) ? "text-dark-main mb-2 mt-12 pl-2 py-3 h-12 w-full rounded-xl border-2 border-red":"text-dark-main mb-2 mt-12 pl-2 py-3 h-12 w-full rounded-xl"} type='text' placeholder=' Email' />
                    {errors.email && touched.email ? <p className='text-red'>{errors.email}</p>:<></>}

                    {/* <Typography className="py-5" fontSize={25}>Password</Typography> */}
                    <input id="password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} className={ (errors.password && touched.password) ? "text-dark-main mb-2 mt-12 pl-2 py-3 h-12 w-full rounded-xl border-2 border-red":"text-dark-main mb-2 mt-12 pl-2 py-3 h-12 w-full rounded-xl"} type='password' placeholder=' Password'/>
                    {errors.password && touched.password ? <p className='text-red'>{errors.password}</p>:<></>}



                    <Typography className="pt-4 text-center" fontSize={25}>Already have an account? <Link className="underline" to="/login">Sign In</Link> </Typography>
                    
                    <button type="submit" disabled={(errors.firstname || errors.lastname || errors.email || errors.password) ? true : false} className='bg-dark-graph-red my-10  text-dark-text h-14 w-full m-auto text-center rounded-xl' onClick={() =>{}}>Sign Up</button>
                </form> 
            </div>
        </div>
    </div>
    </>
  )
}

export default SignupPage