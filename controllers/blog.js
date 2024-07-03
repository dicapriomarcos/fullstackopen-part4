const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { userExtractor } = require('../utils/middlewares');

blogRouter.get('/', async (request, response) => {

    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.status(200).json(blogs).end()
    
})

blogRouter.get('/:id', async (request, response) => {

  const id = request.params.id
  const blogs = await Blog.findById(id).populate('user', {username: 1, name: 1})
  response.status(200).json(blogs).end()
  
})

blogRouter.post('/', userExtractor, async (request, response) => {

  const body = request.body

 // Obtaining the user from the token
 const user = await User.findById(request.user.id)

  const blog = new Blog(body)
  blog.user = user

  user.blogs = user.blogs.concat(blog)
  await user.save()

  const newBlog = await blog.save()
  response.status(201).json(newBlog)

})

blogRouter.delete('/:id',userExtractor, async (request, response) => {
  
    const id = request.params.id
    
    // Obtaining the user from the token
    const user = await User.findById(request.user.id)
   
    const blog = await Blog.findById(id)

    console.log(user.id)
    console.log(blog.user.toString())
    
    if( user === null || user.id !== blog.user.toString() ){
      return response.status(401).json({ error: 'token invalid' })
    }else{
      await Blog.findByIdAndDelete(id)
      return response.status(204).end()
    }   
  
})

blogRouter.put('/:id', async (request, response) => {

  const id = request.params.id
  const likes = request.body.likes
  const body = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });
  response.status(200).json(updatedBlog).end()
  
})


module.exports = blogRouter;