const blogRouter = require('express').Router();
const Blog = require('../models/Blog');


blogRouter.get('/', async (request, response) => {

    const blogs = await Blog.find({})
    response.status(200).json(blogs).end()
    
})

blogRouter.post('/', async (request, response) => {

  const body = request.body

  if( !body.title || !body.url ){

    response.status(400).end()

  }else{

    const blog = new Blog(body)
    const newBlog = await blog.save()
    response.status(201).json(newBlog) 

  }



})

module.exports = blogRouter;