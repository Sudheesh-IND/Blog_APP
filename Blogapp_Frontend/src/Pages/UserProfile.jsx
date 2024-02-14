import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import axios from 'axios'
import { base_url } from '../Services/base_url'
import { editProfile, getBlogsUser, getUser, imageDetails } from '../Services/allApi'
import { Link, useNavigate, useParams } from 'react-router-dom'
import UserBlogCard from '../Components/UserBlogCard'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Fragment} from 'react'
import { Dialog,Popover, Transition } from '@headlessui/react'


function UserProfile() {

    const {id}=useParams()
    const [load,setLoad]=useState(false)
    const [pic,setPic]=useState('')
    const [user,setUser]=useState({})
    const [follow,setFollow]=useState('')
    const [blogs,setBlogs]=useState([])
    const [deleted,setDeleted]=useState(false)
    const[name,setName]=useState('')
    const [email,setEmail]=useState('')
    const navigate=useNavigate()
    const [following,setFollowing]=useState('')
    const [picSetted,isPicSetted]=useState(false)


    //setting the profilepic
    const handleImage=async(e)=>{
        const JWT=localStorage.getItem("blogtoken")
        const file=e.target.files[0]
        console.log(file)
        const formData=new FormData
        formData.append("file",file)

        const response=await axios.post(`${base_url}/uploadimages`,formData,{
            headers:{
                Authorization:JWT,
                "Content-Type":'multipart/form-data'
            }
        })

        if(response.status==200){
            console.log(response)
            const data=await imageDetails(id,response.data.filename)

            if(data.status==200){
                isPicSetted(true)
            }else{
                toast.error("An error happend",{autoClose:2000,closeButton:false,pauseOnHover:false}) 
            }
        }else{
            toast.error("Failed",{autoClose:2000,closeButton:false,pauseOnHover:false})
        }
    }

    //getting details
    const handleDetails=async()=>{
        const {data}=await getUser(id)
        
        if(data){
            setPic(data.profilePic)
        setUser(data)
        setFollow(data.followers.length)
        setFollowing(data.following.length)
        setName(data.name)
        setEmail(data.email)
        }else{
            navigate('*')
        }
       
    }

    //handleMyBlogs
    const handleBlogs=async()=>{
        const response=await getBlogsUser(id)
        if(response.status==200){
            setBlogs(response.data)
        }else{
            navigate('*')
        }
    }

    //handling the edit
    const handleEdit=async()=>{
        const response=await editProfile(name,email,id)

        if(response.status==200){
            toast.success("Edited successfully",{autoClose:2000,closeButton:false,pauseOnHover:false})
        }else{
            toast.error("Unexpected error",{autoClose:2000,closeButton:false,pauseOnHover:false}) 
        }
    }

    //logging out
    const logOut=()=>{
        localStorage.clear()
        toast.success("Logging you out",{autoClose:2000,closeButton:false,pauseOnHover:false})
        setTimeout(()=>{
            navigate('/')
        },2000)
    }

    useEffect(()=>{
        handleDetails()
        handleBlogs()
    },[deleted,picSetted])
  return (
    <div>
        <div>
            <Header />
        </div>
        <div className='lg:px-80 w-full sm:p-3 mt-6'>
             <div className='w-full flex items-center justify-center'>
                 <div className="w-28 relative h-28 cursor-pointer rounded-full bg-black flex text-center justify-center overflow-hidden hover:shadow-xl">
                   {
                    pic?(
                        <img className='w-28 h-28 rounded-full' src={`${base_url}/images/${pic}`} alt="" />
                    ):<img className='w-28 h-28 rounded-full' src="" alt="" />
                   }
                      <input onChange={(e)=>handleImage(e)} type="file" className='h-full absolute opacity-0 cursor-pointer'/>
                 </div>
             </div>
        </div>
        <div className='w-full flex items-center justify-center'>
              <h3 className='font-bold'>{user.name}</h3>
        </div>
        <div className='grid grid-cols-2 gap-3 mt-4'>
        <div className='w-full flex items-center justify-end'>
              <h3 className='font-bold'>{follow} Followers</h3>
        </div>
        <div className='w-full flex items-center justify-start'>
              <h3 className='font-bold'>{following} Following</h3>
        </div>
        </div>
        <div className='grid grid-cols-2 gap-2 mt-3'>
            <div className='flex items-center justify-end'>
            <Popover className="relative">
          <Popover.Button className='bg-black mt-4 text-sm py-2 px-5 rounded-2xl text-white hover:text-black
                hover:bg-white hover:outline-2 hover:outline hover:outline-black text-bold'>
            Edit Profile
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 lg:w-96 sm:w-72 overflow-hidden rounded-3xl bg-bgSub shadow-lg ring-1 ring-gray-900/5 p-4">
                <div>
                <input value={name} onChange={(e)=>setName(e.target.value)} type="text" className='w-full pl-2 outline-none border-2 border-black rounded-2xl h-10'/>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Search here'  type="text" className='w-full mt-6 pl-2 outline-none border-2 border-black rounded-2xl h-10'/>
               <div className='flex items-center justify-center'>
               <Popover.Button onClick={handleEdit} className='bg-black mt-4 text-sm py-2 px-5 rounded-2xl text-white hover:text-black
                hover:bg-white hover:outline-2 hover:outline hover:outline-black text-bold'>
            Submit
          </Popover.Button>
               </div>
  
                </div>
            </Popover.Panel>
          </Transition>
        </Popover>
            </div>
            <div className='flex items-center justify-start'>
            <button onClick={logOut} className='bg-black mt-4 text-sm py-2 px-5 rounded-2xl text-white hover:text-black
                hover:bg-white hover:outline-2 hover:outline hover:outline-black text-bold'>Log Out</button>
            </div>
        </div>
        <div className="lg:px-80 sm:px-3">
            {
                blogs? blogs.map((blog)=>(
                      <UserBlogCard blog={blog} deleted={deleted}/>
                )):''
            }

          
        </div>
        <ToastContainer position='top-center'/>
    </div>
  )
}

export default UserProfile