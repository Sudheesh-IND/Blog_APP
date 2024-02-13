import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getUser, uploadBlog } from '../Services/allApi'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        setUser({...user,name:data.name,profilePic:"drsgsdfhdx"})   
     }

     //appending the file to formdata
    // const setImage=(e)=>{
        
    //     setFilename(e.target.files[0].name)
    //     const file=e.target.files[0]
    //     formData.append("file",file)
    // }

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
           toast.success("Successful",{autoClose:2000})
           setTimeout(()=>{
            navigate(`/allblogs/${id}`)
           },2000)
        }else if(response.data=="please login"){
            toast.error("Please login",{autoClose:2000})
            setTimeout(()=>{
                navigate('/login')
            },2000)
        }else{

        }
       }
    }

    useEffect(()=>{

        userDetails()
       
    },[])
  return (
   <div>
    <div className='min-h-screen'>
        <div className='w-full lg:min-screen sm:min-h-screen shadow-inner  p-5'>
            <div className='grid grid-cols-2'>
                <div className='flex items-start justify-center'>
                <h1 className='font-bold me-auto lg:text-3xl md:text-3xl sm:text-2xl text-black text-pretty'>Write from your mind.....</h1>

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
            hover:border-2 hover:border-black transition' onClick={handleBlogs}>Upload</button>

        </div>
       
        </div>
      
        
     
    </div>
    <ToastContainer position='top-center'/>
   </div>
  )
}

export default AddBlogs