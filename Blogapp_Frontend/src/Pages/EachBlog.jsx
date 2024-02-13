import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { useNavigate, useParams } from 'react-router-dom'
import { addUpVotes, getUser, getbyid, saveBlogs, uploadComment } from '../Services/allApi'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommentCard from '../Components/CommentCard';

function EachBlog() {

  const {id,blogId}=useParams()
  const [data,setData]=useState({})
  const [name,setName]=useState('')
  const [comment,setComment]=useState('')
  const [commentList,setCommentList]=useState([])
  const [upvotes,setUpvotes]=useState([])
  const [isVoted,setIsVoted]=useState(false)
  const navigate=useNavigate()
  const [isSvaed,setIsSaved]=useState(Boolean)
  const [sameUser,setSameUser]=useState(false)

  const handleData=async()=>{
    const {data}=await getbyid(blogId)
    if(data){
      setData(data)
      setName(data.user.name)
      setCommentList(data.comments)
      setUpvotes(data.upvotes)

      if(data.upvotes.indexOf(id)!==-1){
        setIsVoted(true)
      }else{
        setIsVoted(false)
      }

      if(id==data.userId){
        setSameUser(true)
      }else{
        setSameUser(false)
      }
    }
  }

  //handleusertData
  const handleUser=async()=>{
    const {data}=await getUser(id)

    if(data){
      if(data.saved.indexOf(blogId)!==-1){
        setIsSaved(true)
      }else{
        setIsSaved(false)
       
      }
    }

  }

  //adding comment
  const handleComment=async()=>{
    if(comment==''){
        toast.warning("Please type a comment !",{autoClose:2000})
    }else{
      const response=await uploadComment(id,comment,data.user.profilePic,blogId,name)

      if(response.status==200){
        toast.success("Comment posted",{autoClose:2000})
        setComment("")
      }else{
        toast.error("Something went wrong",{autoClose:2000})
        setComment("")
      }
    }
  }

  //handling upvotes
  const handleUpvotes=async()=>{
    const response=await addUpVotes(id,blogId)
    console.log(response)

    if(response.status==200){
      if(response.data=='voted'){
        setIsVoted(true)
      }else{
        setIsVoted(false)
      }
    }else{
       navigate('**')
    }
  }

  //handling Save
  const handleSave=async()=>{
    const response=await saveBlogs(id,blogId)
    console.log(response)
    if(response.status==200){
      if (response.data=="Blog saved"){
        setIsSaved(true)
      }else{
        setIsSaved(false)
      }

    }
  }

  //goingback
  const goingBack=()=>{
    navigate(`/allblogs/${id}`)
  }

  

  useEffect(()=>{
    handleData()
    handleUser()

   
  },[isVoted])

  return (
    <div>
      <div>
        <Header/>
      </div>
      <div>
        <div className="lg:px-60">
          <div className='pl-12'>
          <i onClick={goingBack} className="fa-solid fa-arrow-left mt-10 text-2xl cursor-pointer"></i>
          </div>
           
        <h1 className=' font-bold mt-6 text-5xl pl-12'>{data.title}</h1>
        <div className="grid grid-cols-2 mt-6 pl-12">
          <div>
             <h2 className='font-bold text-slate-500'>By {name}</h2>
          </div>
          <div className='ms-auto pr-12'>
          <button className={`mr-2  text-sm py-1 px-5 rounded-2xl 
                outline-2 text-bold sm:mb-5 ${isVoted ? "text-white bg-black" :"text-black bg-white  outline outline-black"}`} onClick={handleUpvotes}><i class="fa-solid fa-angle-up mr-1"></i>{upvotes.length} Upvotes</button>
                <a href="#comment"> <button className='  text-sm py-1 px-5 rounded-2xl text-black 
                bg-white outline-2 outline outline-black text-bold sm:mt-2'><i class="fa-regular fa-comment mr-1"></i>{commentList.length} comments</button></a>
          </div>
        </div>
        <div>
        <p  className='mt-6 px-12 text-justify font-semibold text-xl  rounded-xl'>{data.content}</p>
        </div>
        <div className='pl-12 mt-12 font-bold text-xl grid grid-cols-2'>
          <div>
          <h1>Comments</h1>
          </div>
          <div className='pr-12'>
          {
            sameUser?(
              ''
            ):
            <button onClick={handleSave} className='bg-black float-right  text-sm py-2 px-5 rounded-2xl text-white hover:text-black
            hover:bg-white hover:outline-2 hover:outline hover:outline-black text-bold'>
             {
              isSvaed?(
                <span>Unsave</span>
              ): <span>Save</span>
             }
            </button>
          }
          </div>
        </div>
        <div className='px-12'>
        <div className='mt-6 rounded-xl bg-bgSub shadow p-5 grid grid-cols-[auto_150px]'>
           <div>
           <input placeholder='Type your comment here' value={comment} onChange={(e)=>setComment(e.target.value)} type="text" className='w-full pl-2 outline-none border-2 border-black rounded-2xl h-10'/>
           </div>
           <div className='flex items-center justify-center'>
           <button onClick={handleComment} className='bg-black text-sm py-2 px-5 rounded-2xl text-white hover:text-black
                hover:bg-white hover:outline-2 hover:outline hover:outline-black text-bold'>Comment</button>
           </div>
        </div>
        </div>
        <div className='px-12 w-full mt-12 mb-10' id='comment'>
          {
            commentList.length>0? commentList.map((comments)=>(
              <CommentCard comment={comments}/>
            )):<div className='w-full flex items-center justify-center flex-col mt-5'>
     <span className="material-symbols-outlined text-2xl" >
comments_disabled
</span>
      <h3 className='mt-3 font-bold'>No comments yet</h3>
            </div>
          }
        </div>
        </div>

      </div>
      <ToastContainer position='top-center'/>
    </div>
  )
}

export default EachBlog