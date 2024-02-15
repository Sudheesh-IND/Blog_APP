const express=require('express')

//taking router from express
const router=express.Router()

//importing controllers
const userController=require('../Controller/userController')
const blogController=require('../Controller/blogsController')

//route for user register
router.post('/userregister',userController.userRegister)

//user login
router.post('/userlogin',userController.userLogin)


//adding blogs
router.post('/addblogs',userController.verification,blogController.addBlogs)

//save blogs
router.post('/saveblogs/:id',userController.verification,userController.saveBlogs)

//delete blogs
router.delete('/deleteblog/:blogId',userController.verification,blogController.deleteBlog)

//fetching user details
router.get('/fetch/:id', userController.verification,userController.fetchUserDetails)

//get all blogs
router.get('/getallblogs',blogController.getAllBlogs)

//get details with respect to user id
router.get('/getbyid/:blogId',userController.verification,blogController.fetchBlogById)

//get blogs of a certain user
router.get('/getmyblogs/:id',userController.verification,blogController.myBlogs)

//follow user
router.get('/followauthor/:id/:followingId',userController.verification,userController.followAuthors)

//images uploading
router.post('/uploadimages',userController.verification,userController.upload.single("file"),userController.uploadFiles)

//adding profile pic
router.post('/imagedetails/:id',userController.verification,userController.profilePic)

//adding comment
router.post('/addcomment',userController.verification,blogController.addComment)

//adding upvotes
router.post('/upvote',userController.verification,blogController.addVotes)

//getting according to category
router.get('/bycategory/:category',userController.verification,blogController.getByCategory)

//getting the saved blogs
router.post('/getsaved',userController.verification,userController.verification,userController.getSaved)

//editing the blog
router.post('/editblog/:id',userController.verification,blogController.editBlog)

//getting all the users
router.get('/getallusers',userController.verification,userController.getAllUsers)

//editing the profilwe
router.post('/editprofile',userController.verification,userController.editProfile)

//getting blogs by following
router.post('/followingblogs',userController.verification,blogController.blogsByFollowing)

//getting followers
router.post('/getfollowing',userController.verification,userController.getFollowing)

//getting followers
router.post('/getfollowers',userController.verification,userController.getFollowers)

//sending email
router.post('/forgetpassword',userController.sendEmail)

//resetting password
router.post('/resetpassword',userController.resetPassword)

//exporting router
module.exports=router