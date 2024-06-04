const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const Blog = require('./models/Blog');

app.use(cors());
app.use(express.json());
const morgan = require('morgan')

morgan.token('postData', (request, response) => {
    if (request.method === 'POST') {
        return JSON.stringify(request.body);
    } else {
        return '';
    }
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'));

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

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});