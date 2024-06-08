const express = require('express');
require('express-async-errors')
const cors = require('cors');
const db = require('./db');
const app = express();
const blogRouter = require('./controllers/blog');
const userRouter = require('./controllers/user');

app.use(cors());
app.use(express.json());

// MIDDLEWARES
const { morgan, errorHandler } = require('./utils/middlewares');
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'));

// ROUTES
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);

// USE ERRORHANDLER
app.use(errorHandler);
module.exports = app;