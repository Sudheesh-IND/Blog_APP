import React from 'react'
import { useNavigate } from 'react-router-dom'

function PageNotFound() {

  const navigate=useNavigate()

  const goBack=()=>{
    
    localStorage.clear()
    navigate('')
    
  }
  return (
    <div>
      <div className="w-full min-h-screen flex items-center justify-center flex-col">
         <div className='w-full  flex items-center justify-center'>
             <img className='h-96' src="https://itsnuqtah.com/images/404-error.png" alt="" />
         </div>
         <div className='w-full flex items-center justify-center'>
         <button onClick={goBack} className='bg-black mt-6 text-sm py-2 px-5 rounded-2xl text-white hover:text-black
                hover:bg-white hover:outline-2 hover:outline hover:outline-black text-bold'>Go Back</button>
         </div>
      </div>
    </div>
  )
}

export default PageNotFound