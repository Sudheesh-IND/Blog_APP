import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Category from '../Components/Category'
import BlogCard from '../Components/BlogCard'
import { allBlogs, byCategory } from '../Services/allApi'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function AllBlogs() {

  const [blogs,setBlogs]=useState([])
  const [category,setCategory]=useState("All")
  const navigate=useNavigate()
  const [term,setTerm]=useState('')

  //handling the blogs
  const handleBlogs=async()=>{
    const response=await allBlogs()
    
    if(response.status==200){
      setBlogs(response.data.reverse())
      
    }else{
      toast.error("Unexpected error please login Again",{autoClose:2000,closeOnClick:false,closeButton:false})
      localStorage.clear()
      setTimeout(()=>{
        navigate('/login')
      },2000)
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
       <div className='sticky top-0 w-full'>
       <Header/>
       </div>
       
       <div className="px-6">
        <div className="grid lg:grid-cols-[400px_auto]">
          <div className='w-full h-auto p-3 '>
             <div className="w-full shadow-md p-5 mt-10 rounded-2xl bg-bgSub ">
              <Category category={handleCategory}/>
             </div>
          </div>
          <div className='p-3'>
            <div>
            <div className='mt-4'>
       <input onChange={(e)=>setTerm(e.target.value)} placeholder='Search blogs here'  type="text" className='w-full pl-2 outline-none border-2 border-black rounded-2xl h-10'/>

       </div>
            </div>
           {
            blogs.length>0? blogs.filter(item=>{
              if(term==''){
                return item
              }else if(item.title.toLowerCase().includes(term.toLowerCase())){
                 return item
              }
            }).map((blog)=>(
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
       <ToastContainer position='top-center'/>
    </div>
  )
}

export default AllBlogs