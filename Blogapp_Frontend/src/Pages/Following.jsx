import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ProfileCard from '../Components/ProfileCard'
import { getFollowing, getUser } from '../Services/allApi'


function Following() {

    const {id}=useParams()
    const [data,setData]=useState([])
    const navigate=useNavigate()

    //handle followes
    const handleFollowing=async()=>{
        const response=await getUser(id)

        if(response.status==200){
             const result=await getFollowing(response.data.following)
              
             if(result.status==200){
                setData(result.data)
                console.log(result)
             }else{
                navigate('*')
             }
        }else{
            navigate('*')
        }
    }

    useEffect(()=>{
        handleFollowing()
    },[])
  return (
    <div>
        <div className='sticky top-0 w-full'>
            
            <Header/>
        </div>
        <div className='sm:px-10 lg:px-80 '>
           {
            data.length>0? data.map((author)=>(
                <ProfileCard author={author}/>
            )):<div className='w-full mt-16 flex items-center justify-center flex-col'>
                  <h2 className='font-bold text-xl'>Not following anyone !</h2>
                  <span class="material-symbols-outlined mt-5">
          sentiment_dissatisfied
          </span>
          <Link to={`/authors/${id}`}>
                       <button className='bg-black mt-6 text-sm py-2 px-5 rounded-2xl text-white hover:text-black
                hover:bg-white hover:outline-2 hover:outline hover:outline-black text-bold'>Follow Authors</button>
                       </Link>
            
            </div>
           }
        </div>
    </div>
  )
}

export default Following