import { base_url } from "./base_url"
import { commonApi } from "./commonApi"



//api call for account register
export const registerUser=async(name,email,password)=>{

    const body={
        name,email,password
    }
    
    return await commonApi("post",`${base_url}/userregister`,body)
}

//api call for account login
export const loginUser=async(email,password)=>{
    const body={
        email,password
    }

    return await commonApi("post",`${base_url}/userlogin`,body)
}

//fetching user details
export const getUser=async(id)=>{
    return await commonApi('get',`${base_url}/fetch/${id}`,'')
}

//adding the userdetails 
export const uploadBlog=async(title,category,content,userId,user,date)=>{
  
    const body={
       title,category,content,userId,user,date
    }
    console.log(body)
    return await commonApi('post',`${base_url}/addblogs`,body)
}

//get all blogs
export const allBlogs=async()=>{
    return await commonApi("get",`${base_url}/getallblogs`,'')
}

//fetch blog by Id
export const getbyid=async(blogId)=>{
    return await commonApi("get",`${base_url}/getbyid/${blogId}`,'')
}

//get blogs according to id
export const getBlogsUser=async(id)=>{
    return await commonApi("get",`${base_url}/getmyblogs/${id}`,'') 
}

//following author api call
export const followauthor=async(id,followingId)=>{
    return await commonApi("get",`${base_url}/followauthor/${id}/${followingId}`)
}

//upload images
export const imageDetails=async(id,filename)=>{
    const body={filename}
    return await commonApi('post',`${base_url}/imagedetails/${id}`,body)
}

//uploading comments
export const uploadComment=async(userId,comment,profilepic,blogId,name)=>{
    const body={userId,comment,profilepic,blogId,name}
    return await commonApi('post',`${base_url}/addcomment`,body)
}

//adding upvotes
export const addUpVotes=async(id,blogId)=>{
    const body={id,blogId}
    return await commonApi('post',`${base_url}/upvote`,body)
}

//api call by category
export const byCategory=async(category)=>{
    console.log("inside call")
    return await commonApi("get",`${base_url}/bycategory/${category}`) 
}

//save blogs
export const saveBlogs=async(id,blogId)=>{
    const body={blogId}
    return await commonApi('post',`${base_url}/saveblogs/${id}`,body)
}

//get blogs
export const getSaved=async(savedId)=>{
   
    const body={savedId}
    return await commonApi('post',`${base_url}/getsaved`,body)
}

//delete blog
export const deleteBlog=async(blogId)=>{
    return await commonApi("delete",`${base_url}/deleteblog/${blogId}`)
}

//editing blog
export const editingBlog=async(title,category,content,blogId)=>{
    const body={title,category,content}
    return await commonApi('post',`${base_url}/editblog/:${blogId}`,body)

}


//getting all the users
export const getAllUsers=async()=>{
    return await commonApi("get",`${base_url}/getallusers`)
}

//editing profile
export const editProfile=async(name,email,id)=>{
    const body={name,email,id}
    return await commonApi("post",`${base_url}/editprofile`,body)
}

//following blogs
export const getBlogsByFollowing=async(following)=>{
    const body={following}
    return await commonApi("post",`${base_url}/followingblogs`,body)
}

//get followers
export const getFollowers=async(followers)=>{
    const body={followers}
    return await commonApi("post",`${base_url}/getfollowers`,body)
}

//get following
export const getFollowing=async(followings)=>{
    const body={followings}
    return await commonApi("post",`${base_url}/getfollowing`,body)
}

//sending email
export const sendEmail=async(email)=>{
    const body={email}
    return await commonApi("post",`${base_url}/forgetpassword`,body)
}

//resetting password
export const resetPass=async(id,password)=>{
    const body={id,password}
    return await commonApi("post",`${base_url}/resetpassword`,body)
}