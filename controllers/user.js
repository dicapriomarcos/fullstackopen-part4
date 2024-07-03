const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

userRouter.get('/', async (request, response) => {

    const users = await User.find({})
    response.status(200).json(users).end()

})

// create user route
userRouter.post('/', async (request, response, next) => {

  const { username = '', name, password = '' } = request.body

  const user = new User({
    username: username,
    name : name,
    password : password
  })

  if(!password || password.length < 3){
    return response.status(400).json({ error: 'Username is required and must be at least 3 characters long' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  user.password = passwordHash
  
  const blog = await Blog.findOne({})
  user.blogs.push(blog)

  console.log(user)

  const savedUser = await user.save()
  response.status(201).json(savedUser)

  
  
})




module.exports = userRouter