import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getSaved, getUser } from '../Services/allApi'
import BlogCard from '../Components/BlogCard'

function SavedBlogs() {

    const [blogs,setBlogs]=useState([])
    const [savedId,setSavedId]=useState([])
    const {id}=useParams()
    const navigate=useNavigate()

    //getting user details
    const handleUser=async()=>{
        const response=await getUser(id)

        if(response.status==200){
            const result=await getSaved(response.data.saved)
            
            setBlogs(result.data)
          
        }else{
            navigate('**')
        }
    }

   

    useEffect(()=>{
        handleUser()
        
    },[])
  return (
    <div>
        <div>
            <div>
                <Header/>
            </div>
            <div className="px-44">
               {
                blogs.length>0? blogs.map((blog)=>(
                    <BlogCard blog={blog}/>
                )):<div>
                    <div className="px-44 flex items-center justify-center flex-col min-h-screen w-full">
                        <h3 className='font-bold text-2xl'>Nothing saved yet ?</h3>
                       <Link to={`/allblogs`}>
                       <button className='bg-black mt-6 text-sm py-2 px-5 rounded-2xl text-white hover:text-black
                hover:bg-white hover:outline-2 hover:outline hover:outline-black text-bold'>Read</button>
                       </Link>
                    </div>
                </div>
               }
            </div>
        </div>
    </div>
  )
}

export default SavedBlogs