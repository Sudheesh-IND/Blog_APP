
//configuring dotenv
require('dotenv').config()
//importing express
const express=require('express')
//importing cors
const cors=require('cors')
//requiring the connection file
require('./connection')

//importing router
const router=require('./routers/router')



//making the server
const server=express()

//using middlewares
server.use(cors())
server.use(express.json())
server.use(router)
//making the image folder static
server.use("/images",express.static("images"))

//starting the server
server.listen(5000,()=>{
    console.log("Server started at port 5000")
})