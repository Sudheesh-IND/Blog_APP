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
                 {
                  author.profilePic!==''?(
                    <img className='h-14 w-14 rounded-full' src={`${base_url}/images/${author.profilePic}`} alt="" /> 

                  ):<img className='h-14 w-14 rounded-full' src="https://th.bing.com/th/id/R.19fa7497013a87bd77f7adb96beaf768?rik=144XvMigWWj2bw&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fUser-Profile-PNG-High-Quality-Image.png&ehk=%2bat%2brmqQuJrWL609bAlrUPYgzj%2b%2f7L1ErXRTN6ZyxR0%3d&risl=&pid=ImgRaw&r=0" alt="" />

                 }
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