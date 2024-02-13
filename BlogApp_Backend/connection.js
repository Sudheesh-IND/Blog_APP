
//importing mongoose
const mongoose=require("mongoose")

//getting connection string from .env file
const DB=process.env.DATABASE

//connecting nodejs with mongoDb
mongoose.connect(DB,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("Databse started")
}).catch((err)=>{
    console.log(err)
})