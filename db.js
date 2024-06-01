const mongoose = require('mongoose');
require('dotenv').config();

const user = process.env.DB_USER
const password = process.env.DB_PASSWORD

const mongoUrl = `mongodb+srv://${user}:${password}@cluster0.hustame.mongodb.net/blogslist?retryWrites=true&w=majority`

mongoose.connect(mongoUrl)
.then(result => {
  console.log('connected to MongoDB')
})
.catch(error => {
  console.log('error connecting to MongoDB:', error.message)
})

