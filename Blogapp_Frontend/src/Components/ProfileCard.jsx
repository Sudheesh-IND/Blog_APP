import React from 'react'
import { base_url } from '../Services/base_url'
import { useNavigate, useParams } from 'react-router-dom'

function ProfileCard({author}) {

    const {id}=useParams()
    const navigate=useNavigate()

    const goToProfile=(otherId)=>{

        navigate(`/otherprofile/${id}/${otherId}`)

    }

  return (
    <div className='mt-4'>
        <div onClick={()=>goToProfile(author._id)} className="w-full grid cursor-pointer grid-cols-[50px_auto] shadow p-5 bg-bgSub rounded-lg hover:shadow-xl">
            <div>
               <div className='h-14 w-14 rounded-full bg-black'>
                     <img className='h-14 w-14 rounded-full' src={`${base_url}/images/${author.profilePic}`} alt="" /> 
               </div>
            </div>
            <div className='flex items-center'>
              
                    <h1 className='pl-4 font-semibold text-xl '>{author.name}</h1>
              

            </div>

        </div>
    </div>
  )
}

export default ProfileCard