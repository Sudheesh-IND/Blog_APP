
import axios from 'axios'

//taking token
const blogtoken=localStorage.getItem("blogtoken")

//common api for all calls
export const commonApi=async(httpMethod,url,reqBody)=>{

    const reqConfig={
        method:httpMethod,
        url,
        data:reqBody,
        headers:{
             Authorization: blogtoken, 
             Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }

    return await axios(reqConfig).then((response)=>{
        return response
    }).catch((err)=>{
        return err
    })
}