const blogRouter = require('express').Router();
const Blog = require('../models/Blog');


blogRouter.get('/', async (request, response) => {

    const blogs = await Blog.find({})
    response.status(200).json(blogs).end()
    
})

blogRouter.post('/', async (request, response) => {

  const blog = new Blog(request.body)

  const newBlog = await blog.save()
  response.status(201).json(newBlog)

})

module.exports = blogRouter;