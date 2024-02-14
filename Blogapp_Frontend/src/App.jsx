

import './App.css'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
import AllBlogs from './Pages/AllBlogs'
import EachBlog from './Pages/EachBlog'
import Auth from './Pages/Auth'
import Register from './Pages/Register'
import AddBlogs from './Pages/AddBlogs'
import OtherProfile from './Pages/OtherProfile'
import UserProfile from './Pages/UserProfile'
import SavedBlogs from './Pages/SavedBlogs'
import PageNotFound from './Pages/PageNotFound'
import EditBlogs from './Pages/EditBlogs'
import AllAuthors from './Pages/AllAuthors'
import BlogsByFollowing from './Pages/BlogsByFollowing'
import Followers from './Pages/Followers'
import Following from './Pages/Following'

function App() {


  return (
    <>

    {/* Defining the routes for the pages in this application */}
      <Routes>
       
       <Route path='' element={<LandingPage/>}/>
       <Route path='login' element={<Auth/>}/>
       <Route path='allblogs/:id' element={<AllBlogs/>}/>
       <Route path='eachblog/:id/:blogId' element={<EachBlog/>}/>
       <Route path='register' element={<Register/>}/>
       <Route path='addblogs/:id' element={<AddBlogs/>}/>
       <Route path='otherprofile/:id/:otherId' element={<OtherProfile/>}/>
       <Route path='userprofile/:id' element={<UserProfile/>}/>
       <Route path='savedblogs/:id' element={<SavedBlogs/>}/>
       <Route path='*' element={<PageNotFound/>}/>
       <Route path='editblogs/:id/:blogId' element={<EditBlogs/>}/>
       <Route path='authors/:id' element={<AllAuthors/>}/>
       <Route path='blogsbyfollowing/:id' element={<BlogsByFollowing/>}/>
       <Route path='followers/:id' element={<Followers/>}/>
       <Route path='following/:id' element={<Following/>}/>
        
      </Routes>
    </>
  )
}

export default App
