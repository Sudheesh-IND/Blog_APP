import React from 'react'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div>
        <div className=" w-full min-h-screen grid lg:grid-cols-2 bg-bgSub">
        
          <div className='w-full min-h-screen flex items-center justify-center flex-col' >
               <h1 className='lg:text-9xl sm:text-6xl font-bold shadow-stone-100'>Writer</h1>
               <Link to={'/login'}>
               <button className='mt-10 w-40 h-12 font-bold bg-black text-sm py-2 px-5 rounded-3xl text-white hover:text-black
                hover:bg-white hover:outline-2 hover:outline hover:outline-black text-bold'>Getting Started</button>
               </Link>
          </div>
          <div className='w-full min-h-screen' >
               <img className="animate-pulse" src="https://www.freeiconspng.com/uploads/blogger-logo-icon-png-12.png" alt="" />
          </div>
           
        </div>
    </div>
  )
}

export default LandingPage