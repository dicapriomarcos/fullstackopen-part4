const mongoose = require('mongoose');
require('dotenv').config();

const user = process.env.DB_USER
const password = process.env.DB_PASSWORD

console.log(process.env.NODE_ENV)

console.log('connecting to', process.env.NODE_ENV.trim() ,'mode')  

const databaseName = process.env.NODE_ENV.trim() === 'test' 
  ? process.env.TEST_DATABASE_NAME
  : process.env.PROD_DATABASE_NAME

const mongoUrl = `mongodb+srv://${user}:${password}@cluster0.hustame.mongodb.net/${databaseName}?retryWrites=true&w=majority`
console.log(mongoUrl)
mongoose.connect(mongoUrl)
.then(result => {
  console.log('connected to MongoDB')
})
.catch(error => {
  console.log('error connecting to MongoDB:', error.message)
})

