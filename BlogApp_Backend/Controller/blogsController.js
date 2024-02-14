
const Blog = require("../Model/blogsModel")



//adding blogs to the databse
exports.addBlogs=async(req,res)=>{
   //inside try catch block
   console.log(req.body)
   try {
    
    const {title,category,content,userId,user,date}=req.body

    const body={title,category,content,userId,user,date}

    //inserting data into the database
    const response=await Blog.insertMany(body)

    if(response){
        res.status(200).json("Successfully uploaded")
    }
    
   } catch (error) {
        res.status(401).json(error)
   }
}

//edit blog
exports.editBlog=async(req,res)=>{
    try {
      
        const {blogId}=req.params
        const {title,content,category}=req.body

        const response=await Blog.findOne({_id:blogId})

        if(response){
            response.title=title
            response.category=category
            response.content=content
            response.save()
        }

        res.status(200).json(response)
        
    } catch (error) {
        res.status(200).json(error)
    }
}


//delete blogs
exports.deleteBlog=async(req,res)=>{
    //inside try catch block
    try {

        const {blogId}=req.params

        const response=await Blog.deleteOne({_id:blogId})
        if(response){
            res.status(200).json("Deleted successfully")
        }
        
    } catch (error) {
        res.status(401).json(error)
    }
}

//my blogs
exports.myBlogs=async(req,res)=>{
    //inside try catch block
    try {

        const {id}=req.params
        //finding blogs based on this id
        const response=await Blog.find({userId:id})
        if(response){
            res.status(200).json(response)
        }
        
    } catch (error) {
        res.status(400).json(error)
    }
}

//get all blogs
exports.getAllBlogs=async(req,res)=>{
    try {

        const response=await Blog.find()
        res.status(200).json(response)
        
    } catch (error) {
        res.status(400).json(error)
    }
}

//fetching blog by Id
exports.fetchBlogById=async(req,res)=>{
    try {
          const {blogId}=req.params
        const response=await Blog.findOne({_id:blogId})
        res.status(200).json(response)
        
    } catch (error) {
        res.status(400).json(error)
    }
}

//adding comments
exports.addComment=async(req,res)=>{
    try {

        const {userId,comment,profilepic,blogId,name}=req.body

        const body={userId,comment,profilepic,blogId,name}

        const response=await Blog.findOne({_id:blogId})

        if(response){
            response.comments.push(body)
            response.save()
            res.status(200).json(response)
        }
        
    } catch (error) {
        res.status(400).json(error)
    }
}

//adding votes
exports.addVotes=async(req,res)=>{
    try {

        const {id,blogId}=req.body

        const response=await Blog.findOne({_id:blogId})
         
        if(response.upvotes.indexOf(id)!==-1){
            let index=response.upvotes.indexOf(id)
            response.upvotes.splice(index,1)
            response.save()

            res.status(200).json(response)
        }else{
            response.upvotes.push(id)
            response.save()

            res.status(200).json("voted")
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

//getting blogs by category
exports.getByCategory=async(req,res)=>{
    try {

        const {category}=req.params

        const response=await Blog.find({category:category})

        if(response){
            res.status(200).json(response)
        }
        
    } catch (error) {
        res.status(400).json(error)
    }
}

//getting blogs by following
exports.blogsByFollowing=async(req,res)=>{
    try {
        const {following}=req.body
        const blogs=[]
        for(var i=0;i<following.length;i++){
            const response=await Blog.findOne({userId:following[i]})

            if(response){
                 blogs.push(response)
            }
        }

        res.status(200).json(blogs)
    } catch (error) {
        res.status(400).json(error)
    }
}