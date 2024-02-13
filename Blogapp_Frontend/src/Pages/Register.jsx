import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUser } from '../Services/allApi';

function Register() {

  const navigate=useNavigate()
  const [register,setRegister]=useState({
    name:'',
    email:'',
    password:'',
    confirmPass:''
  })

  //function to set values
  const setValues=(e)=>{

     const {name,value}=e.target
     setRegister({...register,[name]:value})

  }

  //handling the api call
  const handleRegister=async()=>{
    console.log(register)
    if(register.name==""||register.email==""||register.password==""||register.confirmPass==""){

      toast.error("Please fill all fields !!")

    }else{
      if(register.password==register.confirmPass){
        const response=await registerUser(register.name,register.email,register.password)
        console.log(response)

        if(response.status==200){
          toast.success("User registration successful",{autoClose:2000})
           setTimeout(()=>{
            navigate('/login')
           },2000)

        }else{
          toast.error(`${response.response.data}`)
        }
      }else{
        toast.warning("Passwords does not match")
      }
    }
  }
  return (
    <div>
       
     
        <div className="h-screen  w-full flex items-center justify-center">
     

            <div className=' h-auto lg:w-1/3 sm:2/3 bg-bgSub flex flex-col p-5 shadow rounded-3xl'>
                <label htmlFor="" className='mt-10 font-bold text-xl'>Name</label>
                <input onChange={(e)=>setValues(e)} name='name' type="text" className='w-full mt-3 pl-2 outline-none border-2 border-black rounded-2xl h-10' />
                <label htmlFor="" className='mt-10 font-bold text-xl'>Email</label>
                <input onChange={(e)=>setValues(e)} name='email' type="text" className='w-full mt-3 pl-2 outline-none border-2 border-black rounded-2xl h-10' />
                <label htmlFor="" className='mt-10 font-bold text-xl'>Password</label>
                <input onChange={(e)=>setValues(e)} name='password' type="text" className='w-full mt-3 pl-2 outline-none border-2 border-black rounded-2xl h-10' />
                <label htmlFor="" className='mt-10 font-bold text-xl'>Confirm Password</label>
                <input onChange={(e)=>setValues(e)} name='confirmPass' type="password" className='w-full mt-3 pl-2 outline-none border-2 border-black rounded-2xl h-10' />
                <div className='flex items-center justify-center'>
                <button className='bg-black w-28 mt-6 text-sm py-2 px-5 rounded-2xl text-white hover:text-black
                hover:bg-white hover:outline-2 hover:outline hover:outline-black text-bold' onClick={handleRegister}>Register</button>
                </div>
                <p className='mt-8 mx-auto font-bold' >Already a member?<Link className="underline">Login</Link></p>
              
            </div>
          
           
            
        </div>
        <ToastContainer position='top-center'/>
    </div>
  )
}

export default Register