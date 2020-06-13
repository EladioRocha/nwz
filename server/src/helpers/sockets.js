const path = require('path'),
    mongoose = require('mongoose'),
    Message = require(path.join(__dirname, '..', 'models', 'Messages'))

module.exports = function (io) {
    console.log('wooorkrs')
    io.on('connection', socket => {
        console.log('woorks')
        socket.on('join:room', data => {
            console.log(data)
            socket.join(data.room)
        })
        socket.on('message', async data => {
            const message = await Message.create({
                sender_id: mongoose.Types.ObjectId(data.sender),
                chat_id: mongoose.Types.ObjectId(data.room),
                text: data.message
            })
            io.sockets.in(data.room).emit('message', message)
        })
    })
}