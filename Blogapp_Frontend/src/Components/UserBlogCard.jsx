import React, { useState } from 'react'
import { deleteBlog } from '../Services/allApi'
import { Link, useNavigate, useParams } from 'react-router-dom'



function UserBlogCard({blog,deleted}) {

    const {id}=useParams()
    const navigate=useNavigate()
    
    const handleDelete=async(blogId)=>{
          const response=await deleteBlog(blogId)

          if(response.status==200){
            deleted(true)
          }else{
            navigate('*')
          }
    }

    
  return (
    <div>
        <div className="w-full p-5 mt-6 bg-bgSub rounded-xl shadow">
            <div>
                <div className="grid grid-cols-[auto_50px]">
                     <div>
                     <h1 className='font-bold text-2xl'>{blog.title}</h1>
                     </div>
                     <div className='flex items-center justify-center'>
                     <i onClick={()=>handleDelete(blog._id)} className="fa-solid fa-trash cursor-pointer text-red-600"></i>
                     </div>
                </div>
                <h4 className='font-bold text-xl italic mt-5'>{blog.category}</h4>

               <Link to={`/eachblog/${id}/${blog._id}`} > <button className='bg-black mt-4 text-sm py-2 px-5 rounded-2xl text-white hover:text-black
                hover:bg-white hover:outline-2 hover:outline hover:outline-black text-bold'>Read</button></Link>

                <Link to={`/editblogs/${id}/${blog._id}`}>
                <button className='bg-black ml-2 mt-4 text-sm py-2 px-5 rounded-2xl text-white hover:text-black
                hover:bg-white hover:outline-2 hover:outline hover:outline-black text-bold'>Edit Blog</button>
                </Link>
                  
                  
              
                <div>
                    
                </div>
            </div>

        </div>
    </div>
  )
}

export default UserBlogCard