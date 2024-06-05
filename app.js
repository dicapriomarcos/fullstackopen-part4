const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const blogRouter = require('./controllers/blog');

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

// ROUTES
app.use('/api/blogs', blogRouter);

module.exports = app;