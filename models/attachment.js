const Mongoose = require('mongoose')
const Schema =  Mongoose.Schema
const AttachmentSchema = new Schema({
  fileName: String,
  extraName: String,
  path: String,
  creatorId: String,
  createdAt: { type: Date, default: Date.now }
})

module.exports = Mongoose.model('Attachment',AttachmentSchema)

