const User = require("../Model/userModel")
const bcrypt = require('bcrypt');
const JWT=require('jsonwebtoken')
const multer=require('multer');
const Blog = require("../Model/blogsModel");
const nodemailer=require("nodemailer")

exports.userRegister=async(req,res)=>{

    try {
        console.log("inside api call")
        //destructuring
        const {name,email,password}=req.body

        //finding if user present or not
        const response=await User.findOne({email})
        console.log(response)
        if(response){
            res.status(400).json("User already present")
        }else{
             
            //encrypting the password
            const hashedPass=await bcrypt.hash(password,10)
            console.log(hashedPass)

            const body={name,email,password:hashedPass}

            const response=await User.insertMany(body)

            if(response){
                res.status(200).json(response)
            }
        }

        
    } catch (error) {
        res.status(401).json(error)
    }
}

//user login
exports.userLogin=async(req,res)=>{
    //inside try catch
    try {

        const {email,password}=req.body

        //finding the user
        const response=await User.findOne({email})

        if(response){
            //comparing password
            const checking=await bcrypt.compare(password,response.password)

            if(checking){
                const token=JWT.sign({key:response.email},process.env.SECRET_KEY)
                const data={response,token}
                res.status(200).json(data)
            }else{
                res.status(400).json("Password does not match")
            }
        }else{
            res.status(400).json("User not found")
        }
        
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.verification=(req,res,next)=>{
    try {

        const token_header=req.headers['authorization']
      
        if(!token_header){
            res.status(400).json("Please login")
        }else{
            const isLoginned=JWT.verify(token_header,process.env.SECRET_KEY)
           console.log(isLoginned)
            if(isLoginned){
                next()
            }else{
                res.status(400).json("Please login")
            }
        }
        
    } catch (error) {
        res.status(400).json(error)
    }
}

//editing the profle
exports.editProfile=async(req,res)=>{
    try {

        const {name,email,id}=req.body

        const response=await User.findOne({_id:id})
        if(response){
            response.name=name
            response.email=email
            response.save()
        }

        res.status(200).json(response)

    } catch (error) {
        res.status(400).json(error)
    }
}

//getting all the users
exports.getAllUsers=async(req,res)=>{
    try {

        const response=await User.find()
        res.status(200).json(response)
        
    } catch (error) {
        res.status(200).json(error)
    }
}



//following someone
exports.followAuthors=async(req,res)=>{
    //inside try catch block
    try {

        const {followingId}=req.params
        const{id}=req.params
         
        //finding the user
        const response=await User.findOne({_id:id})
        const result=await User.findOne({_id:followingId})
        if(response && result){
            if(response.following.indexOf(followingId)!==-1 || result.followers.indexOf(id)!==-1){
                console.log("inside")
                //for loggined user
                let index=response.following.indexOf(followingId)
            
                 console.log(index)
                 response.following.splice(index,1)
             
                

                 //for the other user
                 let index2=result.followers.indexOf(id)
               
                 console.log(index2)
                 result.followers.splice(index2,1)
             
                 

                 response.save()
                 result.save()

                 res.status(200).json("Following removed")
            }else{
                //for logined user
                response.following.push(followingId)
                response.save()

                //for other user
                result.followers.push(id)
                result.save()
                res.status(200).json("Followed")
            }
        }else{
            res.status(400).json("User not found")
        }
        
    } catch (error) {
        res.status(401).json(error)
    }
}


//save blogs
exports.saveBlogs=async(req,res)=>{
    //inside try catch block
    try {
        //destructuring
        const {blogId}=req.body
        const {id}=req.params

        //finding user
        const response=await User.findOne({_id:id})

        if(response){
            if(response.saved.indexOf(blogId)!==-1){
                //removing if blog present
                let index=response.saved.indexOf(blogId)
                response.saved.splice(index,1)
                response.save()
                res.status(200).json("Removed from saved")
            }else{
                //pushing the blogid into saved array
                response.saved.push(blogId)
                response.save()
                res.status(200).json("Blog saved")
            }
        }
        
    } catch (error) {
        res.status(400).json(error)
    }
}

//getting the saved items
exports.getSaved=async(req,res)=>{
     try {
        
        const savedBlogs=[]
        const {savedId}=req.body
       
         for(var i=0;i<savedId.length;i++){
            const response=await Blog.findOne({_id:savedId[i]})
            if(response){
                savedBlogs.push(response)
                
            }else{
               continue 
            }
         }

         res.status(200).json(savedBlogs)
        
     } catch (error) {
        res.status(400).json(error)
     }
}


//fetching user details
exports.fetchUserDetails=async(req,res)=>{
    try {
        
        const {id}=req.params
        const response=await User.findOne({_id:id})
        if(response){
            res.status(200).json(response)
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

//configuring multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + file.originalname
      cb(null, uniqueSuffix)
    }
  })
  
exports.upload = multer({ storage: storage })


exports.uploadFiles=(req,res)=>{
    try {

        if(req.file){
            res.status(200).json(req.file)
        }
        
    } catch (error) {
        res.status(400).json(error)
    }
}

//adding the data to the mongoDb profile
exports.profilePic=async(req,res)=>{
    try {

        const {filename}=req.body
        const {id}=req.params
         const response=await User.findOne({_id:id})
         response.profilePic=filename
         response.save()
         res.status(200).json(response)
        
    } catch (error) {
         res.status(400).json(error)
    }
}

//get followers
exports.getFollowers=async(req,res)=>{
    try {

        const {followers}=req.body

        const follower=[]
        for(var i=0;i<followers.length;i++){
            const response=await User.findOne({_id:followers[i]})
            follower.push(response)
        }
        res.status(200).json(follower)
        
    } catch (error) {
        res.status(400).json(error)
    }
}

//get following
exports.getFollowing=async(req,res)=>{
    try {

        const {followings}=req.body

        const following=[]
        for(var i=0;i<followings.length;i++){
            const response=await User.findOne({_id:followings[i]})
            following.push(response)
        }
        res.status(200).json(following)
        
    } catch (error) {
        res.status(400).json(error)
    }
}

//sending otp

const transporter=nodemailer.createTransport({
    port:465,
    secure:true,
    service:'gmail',
    auth:{
       user:process.env.EMAIL,
       pass:process.env.PASS
    }
})

exports.sendEmail=async(req,res)=>{
    try {

        const {email}=req.body
        const response=await User.findOne({email:email})
        if(response){
            const otp=Math.floor(Math.random()*9999)
            const info=await transporter.sendMail({
            from:process.env.EMAIL,
            to:email,
            subject:'Password reset request',
            text:'otp for the resetting of password',
            html:`<p>otp for resetting password is ${otp}</p>`
        })
        
        res.status(200).json({otp,info,response})
        }else{
          res.status(400).json("User not found")
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

//resetpassword
exports.resetPassword=async(req,res)=>{
    try {

        const {id,password}=req.body

        const response=await User.findOne({_id:id})

        if(response){
            const hashed=await bcrypt.hash(password,10)
            response.password=hashed
            response.save()
            res.status(200).json('Password resetted successfully')
        }
        
    } catch (error) {
        res.status(400).json(error)
    }
}