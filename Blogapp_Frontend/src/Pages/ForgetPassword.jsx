import React, { useState } from 'react'
import {useFormik} from 'formik'
import * as yup from 'yup'
import { sendEmail } from '../Services/allApi'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';


function ForgetPassword() {

    const [otp,setOtp]=useState('')
    const [isOtp,seIsOtp]=useState(true)
    const [otpEnter,yourOtp]=useState('')
    const navigate=useNavigate()
    const [id,setId]=useState('')


    const onSubmit=async(values)=>{

      
          
      const response=await sendEmail(values.email)
      console.log(values.email)
      console.log(response)
    //   console.log()
      if(response.status==200){
          seIsOtp(false)
          setOtp(response.data.otp)
          setId(response.data.response._id)
          toast.success("OTP sent successfully",{
            autoClose:2000,
            closeButton:false,
            closeOnClick:false,
            pauseOnHover:false})
      }else{
        toast.error("User not found",{
            autoClose:2000,
            closeButton:false,
            closeOnClick:false,
            pauseOnHover:false})
        
            setTimeout(()=>{
                navigate('/')
            },2000)
      }

    }

    //submitotp
    const handleOtp=async()=>{
        if(otpEnter==''){
            toast.warning("Please enter otp",{
                autoClose:2000,
                closeButton:false,
                closeOnClick:false,
                pauseOnHover:false})
        }else{
            if(otp==otpEnter){
               
                navigate(`/resetpassword/${id}`)
            }
        }
    }


    const forgetSchema=yup.object().shape({
        email:yup.string().email("Please enter a valid email").required("Email is required")
    })

    const {values,errors,touched,handleSubmit,handleChange}=useFormik({
        initialValues:{
            email:''
        },
        validationSchema:forgetSchema,
        onSubmit
    })
  return (
    <div>
       

   {
    isOtp?(
        <form action="" >
        <div className="h-screen  w-full flex items-center justify-center">
        <div className=' h-auto lg:w-1/3 sm:2/3 bg-bgSub flex flex-col p-5 shadow rounded-3xl'>
             <label htmlFor="" className='mt-4 font-bold text-xl'>Email</label>
             <input value={values.email} onChange={handleChange}  name='email' type="text" className={`w-full mt-3 pl-2 outline-none border-2 ${errors.email && touched.email ? 'border-red-600':'border-black '} rounded-2xl h-10`} />
              {
               errors.email && touched.email ?(
                <div className='h-2'>
                  <p className='mt-2 text-sm text-red-600'>*{errors.email}</p>
                </div>
               ):''
             } 
           
            
             <div className='flex items-center justify-center'>
             <button className='bg-black w-30 mt-6 text-sm py-2 px-5 rounded-2xl text-white hover:text-black
             hover:bg-white hover:outline-2 hover:outline hover:outline-black text-bold' type='button' onClick={handleSubmit} >Request Otp</button>
             </div>
    
         </div>
         </div>
        </form>
    ): <form action="" >
    <div className="h-screen  w-full flex items-center justify-center">
    <div className=' h-auto lg:w-1/3 sm:2/3 bg-bgSub flex flex-col p-5 shadow rounded-3xl'>
         <label htmlFor="" className='mt-4 font-bold text-xl'>OTP</label>
         <input onChange={(e)=>{yourOtp(e.target.value)}}  name='email' type="number" className={`w-full mt-3 pl-2 outline-none border-2 border-black  rounded-2xl h-10`} />
       
        
         <div className='flex items-center justify-center'>
         <button className='bg-black w-30 mt-6 text-sm py-2 px-5 rounded-2xl text-white hover:text-black
         hover:bg-white hover:outline-2 hover:outline hover:outline-black text-bold' type='button' onClick={handleOtp} >Enter Otp</button>
         </div>

     </div>
     </div>
    </form>
   }

    
     

 <ToastContainer position='top-center'/>
</div>
  )
}

export default ForgetPassword