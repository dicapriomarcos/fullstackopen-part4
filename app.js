const express = require('express');
require('express-async-errors')
const cors = require('cors');
const db = require('./db');
const app = express();
const blogRouter = require('./controllers/blog');
const userRouter = require('./controllers/user');

app.use(cors());
app.use(express.json());

// MIDDLEWARE
const morgan = require('morgan')

morgan.token('postData', (request, response) => {
    if (request.method === 'POST') {
        return JSON.stringify(request.body);
    } else {
        return '';
    }
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'));

app.use((err, req, res, next) => {
    console.error(err); 
    res.status(400).json({ error: 'Internal Server Error' });
});

// ROUTES
app.use('/api/blogs', blogRouter);

app.use('/api/users', userRouter);

module.exports = app;