const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response) => {

    const users = await User.find({})
    response.status(200).json(users).end()

})

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username: username,
    name : name,
    password: passwordHash,
  })

  console.log('XXXXXX: ',passwordHash)

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = userRouter