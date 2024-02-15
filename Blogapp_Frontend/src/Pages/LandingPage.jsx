import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

function LandingPage() {

  useEffect(()=>{
    localStorage.clear()
  },[])
  return (
    <div>
        <div className=" w-full min-h-screen grid lg:grid-cols-2 bg-white">
        
          <div className='w-full min-h-screen flex items-center justify-center flex-col' >
               <h1 className='main text-9xl font-bold shadow-stone-100'>Writer</h1>
               <Link to={'/login'}>
               <button className='mt-10 w-40 h-12 font-bold bg-black text-sm py-2 px-5 rounded-3xl text-white hover:text-black
                hover:bg-white hover:outline-2 hover:outline hover:outline-black text-bold'>Getting Started</button>
               </Link>
          </div>
          <div className='w-full min-h-screen flex items-center justify-center' >
               <img  src="https://th.bing.com/th/id/R.417c47d70d8731044e774b63e1ea3a0a?rik=P522r8RA%2bGbgzw&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2fgraphic-design-transparent%2fgraphic-design-transparent-13.png&ehk=Jmb9Ds1GNbSGwZA4wI2EMtCZ6wwvLmCv1AGN%2baH6QxI%3d&risl=&pid=ImgRaw&r=0" alt="" />
          </div>
           
        </div>
    </div>
  )
}

export default LandingPage