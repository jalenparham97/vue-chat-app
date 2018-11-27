const moment = require('moment')

const Message = require('../db/models/message')

const generateAdminMessage = (from, message) => {
  return {
    from,
    message,
    createdAt: moment().valueOf()
  }
}

const generateMessage = (from, message, roomName) => {
  // const newMessage = new Message({
  //   from,
  //   message,
  //   roomName,
  //   createdAt: moment().valueOf()
  // })

  // newMessage.save().then(doc => {
  //   console.log(doc)
  // })

  return {
    from,
    message,
    createdAt: moment().valueOf()
  }
}

const generateLocationMessage = (from, latitude, longitude) => ({
  from,
  url: `https://www.google.com/maps?q=${latitude},${longitude}`,
  createdAt: moment().valueOf()
})

module.exports = { generateMessage, generateAdminMessage, generateLocationMessage }