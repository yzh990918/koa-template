const Mongoose = require('../config/Mongoose')

// 新建Schema
const Schema = Mongoose.Schema
const UserSchema = new Schema({
  username: {
    type: String,
    unique: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = Mongoose.model('User', UserSchema)
