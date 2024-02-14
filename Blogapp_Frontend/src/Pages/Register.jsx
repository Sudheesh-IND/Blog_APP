import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUser } from '../Services/allApi';
import * as yup from 'yup'
import { useFormik } from 'formik';

function Register() {

  const navigate=useNavigate()
  

  //schema for register apssword
  const passwordRule=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/

  const onSubmit=async(values)=>{
    const response=await registerUser(values.name,values.email,values.password)
    console.log(response)

    if(response.status==200){
      toast.success("User registration successful",{autoClose:2000})
       setTimeout(()=>{
        navigate('/login')
       },2000)

    }else{
      toast.error(`${response.response.data}`)
    }
  }

  //form validation pattern
  const registerSchema=yup.object().shape({
    name:yup.string().required("Please provide your name"),
    email:yup.string().email("Please enter a valid email").required("Please provide your email"),
    password:yup.string().min(8).matches(passwordRule,{message:"Password is not strong"}).required("Please provide a password"),
    confirmPass:yup.string().oneOf([yup.ref("password"),null],"Passwords must match").required("Please confirm your password")
  })

  //validation
  const {values,touched,errors,handleChange,handleSubmit}=useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      confirmPass:''
    },
    validationSchema:registerSchema,
    onSubmit
  })

  
  return (
    <div>
       
     
       <form action="">
       <div className="h-screen  w-full flex items-center justify-center">
     

     <div className=' h-auto lg:w-1/3 sm:2/3 bg-bgSub flex flex-col p-5 shadow rounded-3xl'>
         <label htmlFor="" className='mt-10 font-bold text-xl'>Name</label>
         <input value={values.name} onChange={handleChange} name='name' type="text" className={`w-full mt-3 pl-2 outline-none border-2 ${errors.name && touched.name ? 'border-red-600':'border-black '} rounded-2xl h-10`} />
                 {
                  errors.name && touched.name ?(
                   <div className='h-2'>
                     <p className='mt-2 text-sm text-red-600'>*{errors.name}</p>
                   </div>
                  ):''
                } 
         <label htmlFor="" className='mt-10 font-bold text-xl'>Email</label>
         <input value={values.email} onChange={handleChange}  name='email' type="text" className={`w-full mt-3 pl-2 outline-none border-2 ${errors.email && touched.email ? 'border-red-600':'border-black '} rounded-2xl h-10`} />
         {
                  errors.email && touched.email ?(
                   <div className='h-2'>
                     <p className='mt-2 text-sm text-red-600'>*{errors.email}</p>
                   </div>
                  ):''
                } 
         <label htmlFor="" className='mt-10 font-bold text-xl'>Password</label>
         <input value={values.password} onChange={handleChange}  name='password' type="password" className={`w-full mt-3 pl-2 outline-none border-2 ${errors.password && touched.password ? 'border-red-600':'border-black '} rounded-2xl h-10`} />
         {
                  errors.password && touched.password ?(
                   <div className='h-2'>
                     <p className='mt-2 text-sm text-red-600'>*{errors.password}</p>
                   </div>
                  ):''
                } 
         <label htmlFor="" className='mt-10 font-bold text-xl'>Confirm Password</label>
         <input value={values.confirmPass} onChange={handleChange}  name='confirmPass' type="password" className={`w-full mt-3 pl-2 outline-none border-2 ${errors.confirmPass && touched.confirmPass ? 'border-red-600':'border-black '} rounded-2xl h-10`} />
         {
                  errors.confirmPass && touched.confirmPass ?(
                   <div className='h-2'>
                     <p className='mt-2 text-sm text-red-600'>*{errors.confirmPass}</p>
                   </div>
                  ):''
                } 
         <div className='flex items-center justify-center'>
         <button className='bg-black w-28 mt-6 text-sm py-2 px-5 rounded-2xl text-white hover:text-black
         hover:bg-white hover:outline-2 hover:outline hover:outline-black text-bold' type='button' onClick={handleSubmit}>Register</button>
         </div>
         <p className='mt-8 mx-auto font-bold' >Already a member?<Link className="underline">Login</Link></p>
       
     </div>
   
    
     
 </div>
       </form>
        <ToastContainer position='top-center'/>
    </div>
  )
}

export default Register