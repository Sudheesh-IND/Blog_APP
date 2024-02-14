import React from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik';
import { resetPass } from '../Services/allApi';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function ResetPassword() {

    const {id}=useParams()
    const navigate=useNavigate()

    const onSubmit=async(values,actions)=>{
        const response=await resetPass(id,values.password)

        if(response.status==200){
            toast.success("Password reset successful",{
                autoClose:2000,
                closeButton:false,
                closeOnClick:false,
                pauseOnHover:false})
                actions.resetForm()

                setTimeout(()=>{
                    navigate('/login')
                },2000)
        }else{
            toast.error("Failed try again",{
                autoClose:2000,
                closeButton:false,
                closeOnClick:false,
                pauseOnHover:false})
                actions.resetForm()

                setTimeout(()=>{
                    navigate('/')
                },2000)
        }
    }

    //schema for register apssword
  const passwordRule=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/
    
  //form validation pattern
  const registerSchema=yup.object().shape({
    password:yup.string().min(8).matches(passwordRule,{message:"Password is not strong"}).required("Please provide a password"),
    confirmPass:yup.string().oneOf([yup.ref("password"),null],"Passwords must match").required("Please confirm your password")
  })

  //validation
  const {values,touched,errors,handleChange,handleSubmit}=useFormik({
    initialValues:{
      
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
      hover:bg-white hover:outline-2 hover:outline hover:outline-black text-bold' type='button' onClick={handleSubmit}>Submit</button>
      </div>
      
    
  </div>

 
  
</div>
    </form>
     <ToastContainer position='top-center'/>
 </div>
  )
}

export default ResetPassword