import React, { useState } from 'react'


function Category({category}) {
    const categories=["Politics","Sports","Entertainment",'Lifestyle','Technology','Business','Education','Travel','Space','History']

    const [cataSample,setCataSample]=useState('')
    const handleCategory=(cata)=>{
           category(cata)
          setCataSample(cata)
         
         
    }

  return (
    <div>
       <div className="w-full h-full bg-bgSub ">
       <button onClick={()=>handleCategory("All")} className={`m-2 w-auto p-3 rounded-2xl font-semibold text-sm ${cataSample=="All"? 'bg-white text-blackoutline-2 outline-black outline' :'bg-black text-white '} `}>All</button>
           {
            categories.map((item)=>(
                <button onClick={(e)=>handleCategory(e.target.value)} value={item} className={`m-2 w-auto p-3 rounded-2xl font-semibold text-sm ${cataSample==item? 'bg-white text-black outline-2 outline-black outline' :'bg-black text-white '} `}>{item}</button>

            ))
           }



       </div>
    </div>
  )
}

export default Category