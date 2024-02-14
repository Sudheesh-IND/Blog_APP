import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Category from '../Components/Category'
import BlogCard from '../Components/BlogCard'
import { allBlogs, byCategory } from '../Services/allApi'
import { useNavigate } from 'react-router-dom'


function AllBlogs() {

  const [blogs,setBlogs]=useState([])
  const [category,setCategory]=useState("All")
  const navigate=useNavigate()

  //handling the blogs
  const handleBlogs=async()=>{
    const {data}=await allBlogs()
    if(data){
      setBlogs(data)
    }else{
      navigate('*')
    }
  }

  //getting blogs with respect to category
  const handleCategory=(cata)=>{
          setCategory(cata)
          console.log(category)
          
  }

  //getting blogs by category
  const getBlogsByCategory=async()=>{
    const response=await byCategory(category)
    console.log(response)

    if(response.status==200){
      setBlogs([])
      setBlogs(response.data)
    }else{
      navigate('*')
    }
  }


  useEffect(()=>{

    if(category=="All"){
      handleBlogs()
    }else if(category==" "){
      handleBlogs()
    }else{
      getBlogsByCategory()
    }

    
   
  },[category])
  return (
    <div>
       <div className='sticky'>
       <Header/>
       </div>
       <div className="px-6">
        <div className="grid lg:grid-cols-[400px_auto]">
          <div className='w-full h-auto p-3'>
             <div className="w-full shadow-md p-5 mt-10 rounded-2xl bg-bgSub  relative">
              <Category category={handleCategory}/>
             </div>
          </div>
          <div className='p-3'>
           {
            blogs.length>0? blogs.map((blog)=>(
              <BlogCard blog={blog}/>
            )):<div className='w-full mt-12 flex items-center justify-center'>

              <div >
                  <img  src="https://auctoresonline.org/beta/frontend-assets/img/nothing_found.png" alt="" />
              </div>

            </div>
           }
          </div>

        </div>
       </div>
    </div>
  )
}

export default AllBlogs