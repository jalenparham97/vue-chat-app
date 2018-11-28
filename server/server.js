const express = require('express')
const http = require('http')
const path = require('path')
const socket = require('socket.io')

const { generateMessage, generateAdminMessage, generateLocationMessage } = require('./services/MessageService')
const { Users } = require('./services/UserService')

const app = express()
const server = http.createServer(app)
const public = path.join(__dirname, '/public')
app.use(express.static(public))

app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))

const port = process.env.PORT || 5000

server.listen(port, () => console.log('Listening on port', port))

const io = socket(server)
const users = new Users()

io.on('connection', socket => {
  console.log('Connected')

  socket.on('disconnect', () => {
    console.log('Disconnected')

    const user = users.removeUser(socket.id)

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room))
      io.to(user.room).emit('newMessage', generateAdminMessage(`${user.name} has left.`))
    }
  })

  socket.on('join', (payload, callback) => {
    socket.join(payload.roomName)
    users.removeUser(socket.id)
    users.addUser(socket.id, payload.displayName, payload.roomName)

    io.to(payload.roomName).emit('updateUserList', users.getUserList(payload.roomName))
    socket.emit('newMessage', generateAdminMessage('Welcome to the chat app'))
    socket.broadcast.to(payload.roomName).emit('newMessage', generateAdminMessage(`${payload.displayName} has joined`))
    callback()
  })

  socket.on('sendMessage', message => {
    io.to(message.room).emit('newMessage', generateMessage(message.from, message.message, message.room))
  })

  socket.on('typing', user => {
    socket.broadcast.to(user.roomName).emit('typing', user.displayName)
  })
})