const express = require('express');
require('express-async-errors')
const cors = require('cors');
const db = require('./db');
const app = express();
const blogRouter = require('./controllers/blog');
const userRouter = require('./controllers/user');
const loginRouter = require('./controllers/login')

app.use(cors());
app.use(express.json());

// MIDDLEWARES
const { morgan, errorHandler, userExtractor } = require('./utils/middlewares');
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'));
app.use('/api/blogs', userExtractor, blogRouter)

// ROUTES
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter)

// USE ERRORHANDLER
app.use(errorHandler);
module.exports = app;