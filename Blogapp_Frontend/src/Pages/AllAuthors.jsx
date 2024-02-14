import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import ProfileCard from '../Components/ProfileCard'
import { getAllUsers } from '../Services/allApi'
import { useNavigate } from 'react-router-dom'

function AllAuthors() {

    const [authors,setAuthor]=useState([])
    const navigate=useNavigate()
    const [term,setTerm]=useState('')


    const handleAuthor=async()=>{
        const response=await getAllUsers()
        if(response.status=200){
            setAuthor(response.data)
        }else{
            navigate('*')
        }
    }

    useEffect(()=>{
        handleAuthor()

   
    },[])
  return (
    <div>
        <div className='sticky top-0 w-full'>
        <Header/>
        </div>
        <div className=" sm:px-4 lg:px-96">
               <div className='mt-6'>
               <input onChange={(e)=>setTerm(e.target.value)} placeholder='Search here'  type="text" className='w-full pl-2 outline-none border-2 border-black rounded-2xl h-10'/>

               </div>
               <div className='mt-10'>
                 {
                    authors.length>0? authors.filter(item=>{
                            if(term==''){
                                return item
                            }else if(item.name.toLowerCase().includes(term.toLowerCase())){
                                return item
                            }
                    }).map((author)=>(
                        <ProfileCard author={author}/>
                    )):<h3 className='mx-auto mt-16 font-bold text-xl'>Data Not Found</h3>
                 }
               </div>
        </div>
    </div>
  )
}

export default AllAuthors