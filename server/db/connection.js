const mongoose = require('mongoose')

const credentials = require('../config/config.json')

// Connection
mongoose.Promise = global.Promise
mongoose.connect(credentials.mongodb.dbURI, { useNewUrlParser: true, useCreateIndex: true }, () => {
  console.log('connected to mongodb')
})

module.exports = { mongoose }