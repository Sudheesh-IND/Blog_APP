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

//adding interested topics
router.post('/addinterest/:id',userController.verification,userController.addInterests)

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
router.get('/getbyid/:blogId',blogController.fetchBlogById)

//get blogs of a certain user
router.get('/getmyblogs/:id',blogController.myBlogs)

//follow user
router.get('/followauthor/:id/:followingId',userController.followAuthors)

//images uploading
router.post('/uploadimages',userController.verification,userController.upload.single("file"),userController.uploadFiles)

//adding profile pic
router.post('/imagedetails/:id',userController.verification,userController.profilePic)

//adding comment
router.post('/addcomment',userController.verification,blogController.addComment)

//adding upvotes
router.post('/upvote',userController.verification,blogController.addVotes)

//getting according to category
router.get('/bycategory/:category',blogController.getByCategory)

//getting the saved blogs
router.post('/getsaved',userController.verification,userController.verification,userController.getSaved)

//editing the blog
router.post('/editblog/:id',userController.verification,blogController.editBlog)

//getting all the users
router.get('/getallusers',userController.verification,userController.getAllUsers)

//editing the profilwe
router.post('/editprofile',userController.verification,userController.editProfile)

//exporting router
module.exports=router