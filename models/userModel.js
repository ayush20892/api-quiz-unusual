const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "This username already exists"],
    },
    score: {
      type: Number,
    }
  }
)



const User = mongoose.model('user',UserSchema)
UserSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });

module.exports = { User }

