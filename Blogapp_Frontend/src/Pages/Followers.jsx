import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getFollowers, getUser } from '../Services/allApi'
import ProfileCard from '../Components/ProfileCard'
import Header from '../Components/Header'

function Followers() {

    const {id}=useParams()
    const [data,setData]=useState([])
    const navigate=useNavigate()

    //handle followes
    const handleFollowers=async()=>{
        const response=await getUser(id)

        if(response.status==200){
             const result=await getFollowers(response.data.followers)

             if(result.status==200){
                setData(result.data)
             }else{
                navigate('*')
             }
        }else{
            navigate('*')
        }
    }

    useEffect(()=>{
        handleFollowers()
    },[])
  return (
    <div>
        <div className='sticky top-0 w-full'>
            <Header/>
        </div>
        <div className='lg:px-80'>
           {
            data.length>0? data.map((author)=>(
                <ProfileCard author={author}/>
            )):<div className='w-full mt-16 flex items-center justify-center flex-col'>
                  <h2 className='font-bold text-xl'>Not followed by anyone !</h2>
                  <span class="material-symbols-outlined mt-5">
          sentiment_dissatisfied
          </span>
          <Link to={`/userprofile/${id}`}>
                       <button className='bg-black mt-6 text-sm py-2 px-5 rounded-2xl text-white hover:text-black
                hover:bg-white hover:outline-2 hover:outline hover:outline-black text-bold'>Go Back</button>
                       </Link>
            
            </div>
           }
        </div>
    </div>
  )
}

export default Followers