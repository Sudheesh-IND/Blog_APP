import React, { useEffect } from 'react'
import {  useState } from 'react'
import { Dialog,  Popover } from '@headlessui/react'
import {
 
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

import { Link, useNavigate, useParams } from 'react-router-dom'
import { base_url } from '../Services/base_url'
import { getUser } from '../Services/allApi'


function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [token,setToken]=useState('')
 const navigate=useNavigate()
 const [details,setDetails]=useState('')
 const [data,setData]=useState('')

  const {id}=useParams()

  const handleUser=async()=>{
    const {data}=await getUser(id)
    if(data){
      setDetails(data.profilePic)
      setData(data.name)
    }else{
      // navigate('*')
    }
    
  }

  useEffect(()=>{
     setToken(localStorage.getItem('blogtoken'))

     const token=localStorage.getItem('blogtoken')
     if(!token){
       navigate('/login')
     }
   
     handleUser()
  },[])
  
  return (
    <div >
      <header className="bg-bgSub  shadow-md">
    <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-2" aria-label="Global">
      <div className="flex lg:flex-1">
        <a href="" className="-m-1.5 p-1.5">
         
          <img className="h-8 w-auto" src="https://www.freeiconspng.com/uploads/blogger-logo-icon-png-12.png" alt="" />
        </a>
      </div>
      <div className="flex lg:hidden">
        <button
          type="button"
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <Popover.Group className="hidden lg:flex lg:gap-x-12">
        <Popover className="relative">

          
        </Popover>
        <Link to={`/allblogs/${id}`} className="text-sm hover:text-black  font-semibold leading-6 text-gray-900">
           Blogs
        </Link>

        <Link to={`/addblogs/${id}`} className="text-sm  hover:text-black  font-semibold leading-6 text-gray-900">
          Add Blogs
        </Link>
        <Link to={`/savedblogs/${id}`} className="text-sm  hover:text-black  font-semibold leading-6 text-gray-900">
          Saved Blogs
        </Link>
        <Link to={`/authors/${id}`}  className="text-sm  hover:text-black  font-semibold leading-6 text-gray-900">
          Find Authors
        </Link>
        <Link to={`/blogsbyfollowing/${id}`}  className="text-sm  hover:text-black  font-semibold leading-6 text-gray-900">
          By Your Authors
        </Link>
      </Popover.Group>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        {
          token? (
            <Link to={`/userprofile/${id}`}>
            <div className="h-10 w-10 rounded-full cursor-pointer bg-black">
               {
                details!==''?(
                  <div className='grid grid-cols-[50px_auto]'>
                  <div>
                  <img className='h-10 w-10 rounded-full' src={`${base_url}/images/${details}`}/>
                  </div>
                  <div className='w-full flex items-center'>
                      <h3 className='font-bold'>{data.substring(0,6)}</h3>
                  </div>
                 </div>
                ):<div className='h-10 w-10 rounded-full'>
                     <img src="https://th.bing.com/th/id/R.19fa7497013a87bd77f7adb96beaf768?rik=144XvMigWWj2bw&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fUser-Profile-PNG-High-Quality-Image.png&ehk=%2bat%2brmqQuJrWL609bAlrUPYgzj%2b%2f7L1ErXRTN6ZyxR0%3d&risl=&pid=ImgRaw&r=0" alt="" />
                </div>
               }
            </div>
            </Link>
          ): <button className='bg-black text-sm py-2 px-5 rounded-2xl text-white hover:text-black
          hover:bg-white hover:outline-2 hover:outline hover:outline-black text-bold'>Sign in</button>
        }
      </div>
    </nav>
    <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
      <div className="fixed inset-0 z-10" />
      <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <a href="#" className="-m-1.5 p-1.5">
            
            <img
              className="h-8 w-auto"
              src="https://www.freeiconspng.com/uploads/blogger-logo-icon-png-12.png"
              alt=""
            />
          </a>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              <Link
                to={`/allblogs/${id}`}
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                Blogs
              </Link>
              <Link
                to={`/addblogs/${id}`}
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                Add Blogs
              </Link>
              <Link
                to={`/savedblogs/${id}`}
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                Saved Blogs
              </Link>
              <Link
                 to={`/authors/${id}`}
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                Find Authors
              </Link>
              <Link
                 to={`/blogsbyfollowing/${id}`}
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                By Your Authors
              </Link>
            </div>
           
            <div className="py-6">
        {
          token? (
            <Link to={`/userprofile/${id}`}>
            <div className="h-10 w-10 rounded-full cursor-pointer bg-black">
               {
                details!==''?(
                     <div className='grid grid-cols-[50px_auto]'>
                      <div>
                      <img className='h-10 w-10 rounded-full' src={`${base_url}/images/${details}`}/>
                      </div>
                      <div className='w-full flex items-center'>
                          <h3 className='font-bold'>{data.substring(0,6)}</h3>
                      </div>
                     </div>
                ):''
               }
            </div>
            </Link>
          ): <button className='bg-black text-sm py-2 px-5 rounded-2xl text-white hover:text-black
          hover:bg-white hover:outline-2 hover:outline hover:outline-black text-bold'>Sign in</button>
        }
      </div>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  </header>
    </div>
  )
}

export default Header