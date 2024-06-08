const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response) => {

    const users = await User.find({})
    response.status(200).json(users).end()

})

// create user route
userRouter.post('/', async (request, response, next) => {

  const { username, name, password } = request.body

  const user = new User({
    username: username,
    name : name,
    password : ''
  })

  // Password
  if( password && password.length >= 3 ){
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(password, saltRounds)
      user.password = passwordHash
  }

  const savedUser = await user.save()
  response.status(201).json(savedUser)
  
})




module.exports = userRouter