const blogRouter = require('express').Router();
const Blog = require('../models/Blog');

blogRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })

  blogRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    console.log(blog)
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
      .catch(error => {
        response.status(400).send 
      })
  })

module.exports = blogRouter;