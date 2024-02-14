import React from 'react'
import { base_url } from '../Services/base_url'

function CommentCard({comment}) {
    console.log(comment)
  return (
       <div className='shadow rounded-2xl  bg-bgSub mt-4'>
        <div className="grid grid-cols-[70px_auto]  p-4">
               <div className='flex items-center justify-center'>
                   <div className='h-16 w-16 rounded-full'>
                       <img className='h-16 w-16 rounded-full' src={`${base_url}/images/${comment.profilepic}`} alt="" />
                   </div>
               </div>
               <div className='flex items-center'>
                  <h2 className='font-bold text-xl pl-4'>{comment.name}</h2>
                  
               </div>
        </div>
        <div>
            <h6 className='pl-8 pb-4 font-semibold'>{comment.comment}</h6>
        </div>
       </div>
  )
}

export default CommentCard