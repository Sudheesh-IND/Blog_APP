import React from 'react'

function PageNotFound() {
  return (
    <div>
      <div className="w-full min-h-screen">
         <div>
             <img src="https://cdni.iconscout.com/illustration/premium/thumb/search-result-not-found-2130355-1800920.png" alt="" />
         </div>
         <div className='w-full'>
         <button className='bg-black mt-6 text-sm py-2 px-5 rounded-2xl text-white hover:text-black
                hover:bg-white hover:outline-2 hover:outline hover:outline-black text-bold'>Go Back</button>
         </div>
      </div>
    </div>
  )
}

export default PageNotFound