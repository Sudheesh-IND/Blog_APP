import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from '../Services/allApi';
import {useFormik} from 'formik'
import * as yup from 'yup'

function Auth() {

 
     
    const navigate=useNavigate()
    
    //rule for password
    const passwordRule=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/


    //function after submitting

    const onSubmit=async(values,actions)=>{
     
      console.log(values.email)

      const response=await loginUser(values.email,values.password)
            console.log(response)
            if(response.status==200){
              actions.resetForm()
              
               toast.success("Login successfull",{
                autoClose:2000,
                closeButton:false,
                closeOnClick:false,
                pauseOnHover:false})
               
               setTimeout(()=>{
                localStorage.setItem("blogtoken",response.data.token)
                localStorage.setItem("blogUser",response.data.response._id)
                  navigate(`/allblogs/${response.data.response._id}`)
               },2000)
               
            }else{
              toast.error(`${response.response.data}`,{
                autoClose:2000,
                closeButton:false,
                closeOnClick:false,
                pauseOnHover:false})
            }
    }

    //validation schema
    const loginSchema=yup.object().shape({
      email:yup.string().email("Please enter a valid email").required("Email required"),
      password:yup.string().min(8).matches(passwordRule,{message:"Please provide a valid password"}).required("Password required")
    })
   
    //validation
    const {values,errors,touched,handleChange,handleSubmit,isSubmitting}=useFormik({
      
       initialValues:{
        email:'',
        password:''
       },
       validationSchema:loginSchema,
       onSubmit
    })

  useEffect(()=>{
    const token=localStorage.getItem('blogtoken')
    const id=localStorage.getItem('blogUser')
    if(token){
      navigate(`/allblogs/${id}`)
    }
  })
    
  return (
    <div>
       

           <form action="" >
           <div className="h-screen w-full flex items-center justify-center">
           <div className=' h-auto   sm:w-2/4 lg:w-1/3 bg-bgSub flex flex-col p-5 shadow rounded-3xl'>
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
                <input value={values.password} onChange={handleChange} name='password' type="password" className={`w-full mt-3 pl-2 outline-none border-2 ${errors.password && touched.password ? 'border-red-600':'border-black '} rounded-2xl h-10`}  />
                {
                  errors.password && touched.password ?(
                    <div className='h-2'>
                     <p className='mt-2 text-sm text-red-600'>*{errors.password}</p>
                   </div>
                  ):''
                } 
                <div className='flex items-center justify-center'>
                <button className='bg-black w-20 mt-6 text-sm py-2 px-5 rounded-2xl text-white hover:text-black
                hover:bg-white hover:outline-2 hover:outline hover:outline-black text-bold' type='button' onClick={handleSubmit} >Login</button>
                </div>
                <Link to={'/forgetpassword'} className='mt-3 mx-auto font-bold '>Forget password</Link>
                <p className='mt-4 mx-auto font-bold' >Not a member?<Link to={'/register'}> Register</Link></p>

            </div>
            </div>
           </form>

           
            
       
        <ToastContainer position='top-center'/>
    </div>
  )
}

export default Auth