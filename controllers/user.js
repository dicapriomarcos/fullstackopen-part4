const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response) => {

    const users = await User.find({})
    response.status(200).json(users).end()

})

// create user route
{}
userRouter.post('/', async (request, response) => {

  const { username, name, password } = request.body

  // Validation
  const errorMessage = [];

  if( !username ){
    errorMessage.push('username is required')
  }

  if( !password){
    errorMessage.push('password is required')
  }

  if( username && username.length < 3 ){
    errorMessage.push('username must be at least 3 letters')
  }

  if( password && password.length < 3 ){
    errorMessage.push('password must be at least 3 letters')
  }

  if( errorMessage && errorMessage.length > 0 ){
    response.status(400).json({error: errorMessage.join(',')})
  }

  // Password
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username: username,
    name : name,
    password: passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
  
})

module.exports = userRouter