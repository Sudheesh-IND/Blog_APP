import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getBlogsByFollowing, getUser } from '../Services/allApi'
import Header from '../Components/Header'
import BlogCard from '../Components/BlogCard'


function BlogsByFollowing() {

    const [following,setFollowing]=useState([])
    const [blogs,setBlogs]=useState([])
    const {id}=useParams()
    const navigate=useNavigate()

    //getting user details
    const handleData=async()=>{
       
        const response=await getUser(id)

        if(response.status==200){
            setFollowing(response.data.following)
        }else{
            navigate('*')
        }
    }

    //handleBlogs
    const handleBlogs=async()=>{
       const response=await getBlogsByFollowing(following)

       if(response.status==200){
            setBlogs(response.data)
       }else{
        navigate('*')
       }
    }

    useEffect(()=>{
        handleData()
        handleBlogs()
    })
  return (
    <div>
        <div className='sticky top-0 w-full'>
            <Header/>
        </div>
        <div className="lg:px-44 sm:px-3">
            {
                blogs.length>0? blogs.sort((a,b)=>{
                   a.date-b.date
                }).map((blog)=>(
                    <BlogCard blog={blog}/>
                )):''
            }
        </div>
    </div>
  )
}

export default BlogsByFollowing