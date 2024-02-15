import React, { useState } from 'react'
import Header from '../Components/Header'
import { followauthor, getBlogsUser, getUser, getbyid } from '../Services/allApi'
import { Link, useNavigate, useParams } from 'react-router-dom'
import BlogCard from '../Components/BlogCard'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { base_url } from '../Services/base_url'


function OtherProfile() {

    const {id,otherId}=useParams()
    const [data,setData]=useState({})
    const [blogs,setBlogs]=useState([])
    const navigate=useNavigate()
    const [pic,setPic]=useState('')
    const [isFollowing,setFollowing]=useState(false)
    const [sameUser,setSameUser]=useState(true)


    // getting the profile user
    const handleData=async()=>{
        const {data}=await getUser(otherId)
        if(data){
        setData(data)
        setPic(data.profilePic)
        if(data.followers.indexOf(id)!==-1){
            setFollowing(true)
        }else{
            setFollowing(false)
        }

        }else{
            navigate('*')
        }
    }

    //getting blogs by id
    const handleBlogs=async()=>{
        const {data}=await getBlogsUser(otherId)
        if(data){
            setBlogs(data)
        }else{
            navigate('*')
        }
    }

    //following author
    const handleFollow=async()=>{
        const token=localStorage.getItem('token')
        if(token==''){
            toast.warning("Please login",{autoClose:2000})
            setTimeout(()=>{
                navigate('/login')
            })
        }else{
        const response=await followauthor(id,otherId)
        console.log(response)
        if(response.status==200){

            if(response.data=='Followed'){
                setFollowing(true)
            }else{
                setFollowing(false)
            }
            
        }else{
            navigate('*')
        }
    }
    }

    useState(()=>{
        handleData()
        handleBlogs()

        if(id==otherId){
        setSameUser(false)
        }
    },[])

  return (
    <div>
        <div className='sticky top-0 w-full'>
            <Header/>
        </div>
        <div className="lg:px-44 mt-8">
            <div className="w-28 h-28 rounded-full mx-auto">
                {
                    pic?(
                        <img className='rounded-full w-28 h-28' src={`${base_url}/images/${pic}`} alt="" />

                    ):
                    <img className='rounded-full w-28 h-28' src="https://th.bing.com/th/id/R.19fa7497013a87bd77f7adb96beaf768?rik=144XvMigWWj2bw&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fUser-Profile-PNG-High-Quality-Image.png&ehk=%2bat%2brmqQuJrWL609bAlrUPYgzj%2b%2f7L1ErXRTN6ZyxR0%3d&risl=&pid=ImgRaw&r=0" alt="" />

                }
            </div>
           
            <div className='w-full flex flex-col items-center justify-center mt-4'>
                <h1 className='font-bold text-2xl'>{data.name}</h1>
            {
                sameUser?(
                    <button className='bg-black mt-4 text-sm py-2 px-5 rounded-2xl text-white hover:text-black
                    hover:bg-white hover:outline-2 hover:outline hover:outline-black text-bold' onClick={handleFollow}>
                        {
                            isFollowing? (
                                <span>Unfollow</span>
                            ):
                            <span>Follow</span>
                        }
                    </button>
                ):<h4 className='mt-4 font-bold italic'>You</h4>
            }
            </div>

            <div className='sm:mt-6 px-3'>
                {
                    blogs.length>0? blogs.map((blog)=>(
                        <BlogCard blog={blog}/>
                    )):<div className='w-full mt-16 flex items-center justify-center flex-col'>
                    <h2 className='font-bold text-xl'>No blogs fount</h2>
                    <span class="material-symbols-outlined mt-5">
            sentiment_dissatisfied
            </span>
            <Link to={`/allblogs/${id}`}>
                         <button className='bg-black mt-6 text-sm py-2 px-5 rounded-2xl text-white hover:text-black
                  hover:bg-white hover:outline-2 hover:outline hover:outline-black text-bold'>Go Back</button>
                         </Link>
              
              </div>
                }
                

            </div>
            

        </div>
    </div>
  )
}

export default OtherProfile