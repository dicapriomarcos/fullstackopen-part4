const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

// Blog schema

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

// Connect to MongoDB
require('dotenv').config()
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD

const mongoUrl = `mongodb+srv://${user}:${password}@cluster0.hustame.mongodb.net/blogslist?retryWrites=true&w=majority`
mongoose.connect(mongoUrl)

console.log(mongoUrl)

app.use(cors())
app.use(express.json())


// ROUTES

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})