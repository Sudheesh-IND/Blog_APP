
//importing mongoose
const mongoose=require('mongoose')

//creating a schema
const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    image:{
        type:Object,
        
    },
    content:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    user:{
        type:Object,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    comments:{
        type:Array
    },
    upvotes:{
        type:Array
    }
})

//converting the schema into a model
const Blog=mongoose.model("Blog",blogSchema)
//exporting the model
module.exports=Blog
