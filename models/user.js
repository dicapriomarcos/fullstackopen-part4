const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String
  },
  password: String,
  name: {
    type: String
  }
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const User = mongoose.model('User', userSchema);

module.exports = User;