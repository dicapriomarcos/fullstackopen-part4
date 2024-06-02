const express = require('express');
const app = express();

app.get('/api/blogs', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
  app.post('/api/blogs', (request, response) => {
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

  module.exports = routes;