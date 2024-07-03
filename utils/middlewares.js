
const jwt = require('jsonwebtoken');

// Exporta el middleware de morgan para loggear las peticiones HTTP

const morgan = require('morgan')

morgan.token('postData', (request, response) => {
    if (request.method === 'POST') {
        return JSON.stringify(request.body);
    } else {
        return '';
    }
});


// ERROR HANDLING
const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
      return response.status(400).json({ error: 'expected `username` to be unique' })
    }else if (error.name ===  'JsonWebTokenError') {
      return response.status(401).json({ error: 'token invalid' })
    } else if (error.name === 'TokenExpiredError') {
      return response.status(401).json({
        error: 'token expired'
      })
    }
  
    next(error)
  }

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

const userExtractor = (request, response, next) => {
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    request.user = decodedToken
    next()
  }

module.exports = {
    morgan,
    errorHandler,
    userExtractor
}
