const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    //required: true
  },
  author: String,
  url: {
    type: String,
    //required: true
  },
  likes: {
    type: Number,
    default: 0
  }
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

/*
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3
  },
  number: {
    type: String,
    required: [true, 'User phone number required'],
    validate: {
      validator: function(v) {
        return /^\d{2}-\d{7}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
})

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
*/


const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;