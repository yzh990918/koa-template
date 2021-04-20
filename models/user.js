const Mongoose = require('../config/Mongoose')

// userSchema
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
  avatar: {
    type: String,
    required: true,
    default: 'https://image.yangxiansheng.top/img/head.png?imglist'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = Mongoose.model('User', UserSchema)
