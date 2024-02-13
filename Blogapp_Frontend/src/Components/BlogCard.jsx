import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { base_url } from '../Services/base_url'

function BlogCard({blog}) {

    const {id}=useParams()
    const [proPic,setPropic]=useState(blog.user.profilePic)
  return (
    
<div class="w-full px-10 py-6 bg-bgSub  rounded-2xl shadow-md lg:mt-10 sm:mt-5">
        <div class="flex justify-between items-center">
            <span class="font-light text-gray-600">{blog.date}</span>
            <h4 className='font-bold italic'>{blog.category}</h4>
        </div>
        <div class="mt-2">
            <a class="text-3xl text-black font-bold " href="#">{blog.title}</a>
            <p class="mt-2 text-gray-600">{blog.content.substring(0,200)+"......."}</p>
        </div>
        <div class="flex justify-between items-center mt-4">
            <div>
                <Link to={`/eachblog/${id}/${blog._id}`}><button className='bg-black text-sm p-2 rounded-2xl text-white hover:text-black
                hover:bg-white hover:border-2 hover:border-black text-semibold'>Read more</button></Link>
            </div>
            <div>
                <Link class="flex items-center" to={`/otherprofile/${id}/${blog.userId}`}>
                    {
                        proPic?(
                            <img class="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block" src={`${base_url}/images/${proPic}`} alt="avatar"/>

                        ):
                        <img class="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block" src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=373&q=80" alt="avatar"/>

                    }
                    <h1 class="text-gray-700 font-bold">{blog.user.name}</h1>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default BlogCard