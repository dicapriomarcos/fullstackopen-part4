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

blogRouter.delete('/:id', async (request, response) => {
  
    const id = request.params.id
    await Blog.findByIdAndDelete(id)
    response.status(204).end()
  
})

blogRouter.put('/:id', async (request, response) => {

  const id = request.params.id
  const likes = request.body.likes
  const body = request.body

  

  if(!likes){
    response.status(400).end()
  }

  if( likes ){
    const updatedBlog = await Blog.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });
    response.status(200).json(updatedBlog).end()
  } 

})


module.exports = blogRouter;