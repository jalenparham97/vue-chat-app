const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
  // user_id: Schema.Types.ObjectId,
  from: {
    type: String
  },
  message: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  createdAt: {
    type: Number,
    default: null
  },
  roomName: String
})



const Message = mongoose.model('message', MessageSchema)

module.exports = Message