
//importing mongoose
const mongoose=require('mongoose')

//creating a schema
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
   
    profilePic:{
        type:String,
       
    },
    following:{
        type:Array
    },
    followers:{
        type:Array
    },
    saved:{
        type:Array
    }
})

//converting schema into a model
const User=mongoose.model("User",userSchema)
//exporting usermodel
module.exports=User