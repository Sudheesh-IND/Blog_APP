import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { editingBlog, getbyid } from '../Services/allApi'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from '../Components/Header';

function EditBlogs() {

    const [title,setTitle]=useState('')
    const [content,setContent]=useState('')
    const [category,setCategory]=useState('')
    const categories=["Politics","Sports","Entertainment",'Lifestyle','Technology','Business','Education','Travel','Space','History']
    const navigate=useNavigate()

    const {id,blogId}=useParams()

    const handleBlog=async()=>{
        const response=await getbyid(blogId)
        if(response.status==200){
            setTitle(response.data.title)
            setCategory(response.data.category)
            setContent(response.data.content)
        }
    }

    //handling the edit
    const handleEdit=async()=>{
        if(title==''||content==''||category==''){
            toast.warning("Please fill all fields")
        }else{
           const response=await editingBlog(title,categories,content,blogId)

           if(response.status==200){
             toast.success("Edited successfully",{autoClose:2000})
             setTitle('')
             setContent('')
             setCategory('')

             setTimeout(()=>{
                navigate(`/userprofile/${id}`)
             },2000)
           }else{
             toast.error("Something turned wrong",{autoClose:2000})
             setTitle('')
             setContent('')
             setCategory('')
           }
        }
    }

    useEffect(()=>{
        handleBlog()
    },[])
  return (
    <div>
        <div className='sticky top-0 w-full'>
            <Header/>
        </div>
        <div className='min-h-screen'>
        <div className='w-full lg:min-screen sm:min-h-screen shadow-inner  p-5'>
            <div className='grid grid-cols-2'>
                <div className='flex items-start justify-center'>
                <h1 className='font-bold me-auto lg:text-3xl md:text-3xl sm:text-2xl text-black text-pretty'>Edit your blog</h1>

                </div>
                <div >
                <button className='bg-black text-white float-right rounded-3xl px-4 h-10 font-bold m-auto'>Go Back</button>
                </div>
            
            </div>
            <div className=' mt-4'>
            <textarea value={content} onChange={(e)=>setContent(e.target.value)} name='content' placeholder='There has been a lot of....' className='w-full p-3 border-black text-black border-2 rounded-3xl outline-none shadow-inner'  id="" cols="30" rows="20"></textarea>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2">
                <div>
                    <input value={title} onChange={(e)=>setTitle(e.target.value)} name='title' placeholder='Type your title' type="text" className='w-full border-black text-black shadow-inner h-10 outline-none pl-4  rounded-3xl border-2' />
                  
                </div>
                <div>
                
                <div className="flex items-center justify-center w-full">
                <select value={category} onChange={(e)=>setCategory(e.target.value)} placeholder="" name="category" id="" className='w-full h-10 text-black outline-none rounded-3xl pl-4 border-black shadow-inner border-2'>
                <option>Select your category</option>
                    {
                        categories.map((item)=>(
                            <>
                       
                            <option value={item}>{item}</option></>
                         
                        ))

                    }
                </select>
       {/* <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-28 rounded-2xl cursor-pointer bg-bgSub shadow-inner border-2">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            {
                filename==""? (
              <>
                    <p className="mb-2 text-sm text-black"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-black">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </>
                ):<p  className="mb-2 text-sm text-black font-bold">{filename}</p>
            }
        </div>
        <input id="dropzone-file" type="file" className="hidden" onChange={(e)=>setImage(e)} />
        </label> */}
      </div> 
                </div>

            </div>
            <div className='flex items-center justify-center mt-6'>
            <button className='w-44 h-10 font-bold text-white bg-black rounded-2xl hover:bg-white hover:text-black
            hover:border-2 hover:border-black transition' onClick={handleEdit}>Upload</button>

        </div>
       
        </div>
      
        
     
    </div>
    <ToastContainer position='top-center'/>
    </div>
  )
}

export default EditBlogs