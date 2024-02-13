import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from '../Services/allApi';

function Auth() {

   const [login,setLogin]=useState({
    email:'',
    password:''
   })
     
    const navigate=useNavigate()

   
   
    //function to set values
    const setValues=(e)=>{
        
      const {name,value}=e.target
        setLogin({...login,[name]:value})
    }

    const handleLogin=async()=>{
      if(login.email==""||login.password==""){
          toast.warning("Please fill all fields !!")
      }else{
          const response=await loginUser(login.email,login.password)
          console.log(response)
          if(response.status==200){
            localStorage.setItem("blogtoken",response.data.token)
             toast.success("Login successfull",{autoClose:2000})
             setTimeout(()=>{
                navigate(`/allblogs/${response.data.response._id}`)
             },2000)
             
          }else{
            toast.error(`${response.data.response.data}`)
          }
      }
    }
    
  return (
    <div>
        <div className="h-screen  w-full flex items-center justify-center">

            <div className=' h-auto lg:w-1/3 sm:2/3 bg-bgSub flex flex-col p-5 shadow rounded-3xl'>
                <label htmlFor="" className='mt-10 font-bold text-xl'>Email</label>
                <input onChange={(e)=>setValues(e)} name='email' type="text" className='w-full mt-3 pl-2 outline-none border-2 border-black rounded-2xl h-10' />
                <label htmlFor="" className='mt-10 font-bold text-xl'>Password</label>
                <input onChange={(e)=>setValues(e)} name='password' type="password" className='w-full mt-3 pl-2 outline-none border-2 border-black rounded-2xl h-10' />
                <div className='flex items-center justify-center'>
                <button className='bg-black w-20 mt-6 text-sm py-2 px-5 rounded-2xl text-white hover:text-black
                hover:bg-white hover:outline-2 hover:outline hover:outline-black text-bold' onClick={handleLogin}>Login</button>
                </div>
                <p className='mt-8 mx-auto font-bold' >Not a member?<Link to={'/register'}> Register</Link></p>

            </div>

           
            
        </div>
        <ToastContainer position='top-center'/>
    </div>
  )
}

export default Auth