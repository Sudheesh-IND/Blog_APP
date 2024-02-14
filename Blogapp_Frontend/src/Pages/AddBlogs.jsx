import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getUser, uploadBlog } from '../Services/allApi'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from '../Components/Header';

function AddBlogs() {

    const categories=["Politics","Sports","Entertainment",'Lifestyle','Technology','Business','Education','Travel','Space','History']

    const {id}=useParams()
    const navigate=useNavigate()
    
    const [blogDetails,setBlogDetails]=useState({
        title:'',
        category:'',
        content:'',
    })
    const [user,setUser]=useState({
        name:'',
        profilePic:''
    })

    const userDetails=async()=>{
        const {data}=await getUser(id)
        if(data){
            setUser({...user,name:data.name,profilePic:data.profilePic})  
        }else{
            navigate('*')
        } 
     }

    //setting the values
    const setValues=(e)=>{
        const {name,value}=e.target
        setBlogDetails({...blogDetails,[name]:value})

    }

    //adding blogs
    const handleBlogs=async()=>{
       if(blogDetails.title==''||blogDetails.content==''||blogDetails.category==''){
        toast.warning("please fill all fields")
       }else{
        const date=new Date()
        const response=await uploadBlog(blogDetails.title,blogDetails.category,blogDetails.content,id,user,date)
         console.log(response)
        if(response.status==200){
           toast.success("Successful",{autoClose:2000,pauseOnHover:false,closeButton:false,closeOnClick:false})
           setTimeout(()=>{
            navigate(`/allblogs/${id}`)
           },2000)
        }else if(response.data=="please login"){
            toast.error("Please login",{autoClose:2000,pauseOnHover:false,closeButton:false,closeOnClick:false})
            setTimeout(()=>{
                navigate('/login')
            },2000)
        }else{

        }
       }
    }

    useEffect(()=>{

    userDetails()

    const token=localStorage.getItem('blogtoken')
    if(!token){
      navigate('/login')
    }
       
    },[])
  return (
   <div>
    <div className='sticky top-0 w-full' >
        <Header/>
    </div>
    <div className='min-h-screen'>
        <div className='w-full lg:min-screen sm:min-h-screen shadow-inner  p-5'>
            <div className='grid grid-cols-2'>
                <div className='flex items-start justify-center'>

                </div>
                <div >
                    <Link to={`/allblogs/${id}`} >
                    <button className='bg-black float-right text-sm py-2 px-5 rounded-2xl text-white hover:text-black
                hover:bg-white hover:outline-2 hover:outline hover:outline-black text-bold'>Go Back</button>

                    </Link>
                </div>
            
            </div>
            <div className=' mt-4'>
            <textarea onChange={(e)=>setValues(e)} name='content' placeholder='There has been a lot of....' className='w-full p-3 border-black text-black border-2 rounded-3xl outline-none shadow-inner'  id="" cols="30" rows="20"></textarea>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2">
                <div>
                    <input onChange={(e)=>setValues(e)} name='title' placeholder='Type your title' type="text" className='w-full border-black text-black shadow-inner h-10 outline-none pl-4   rounded-3xl border-2' />
                  
                </div>
                <div>
                
                <div className="flex items-center justify-center w-full">
                <select onChange={(e)=>setValues(e)} placeholder="" name="category" id="" className='w-full h-10 border-black text-black outline-none rounded-3xl pl-4 shadow-inner border-2'>
                <option>Select your category</option>
                    {
                        categories.map((item)=>(
                            <>
                       
                            <option value={item}>{item}</option></>
                         
                        ))

                    }
                </select>
      
      </div> 
                </div>

            </div>
            <div className='flex items-center justify-center mt-6'>
            <button className='w-44 h-10 font-bold text-white bg-black rounded-2xl hover:bg-white hover:text-black
            hover:border-2 hover:border-black transition' onClick={handleBlogs}>Upload</button>

        </div>
       
        </div>
      
        
     
    </div>
    <ToastContainer position='top-center'/>
   </div>
  )
}

export default AddBlogs