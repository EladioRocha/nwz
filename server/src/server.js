const path = require('path'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cors = require('cors'),
    express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server);

require(path.join(__dirname, 'helpers', 'sockets'))(io)
require(path.join(__dirname, 'helpers', 'updateDate'))

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}))

app.use('/api/v1/authentication', require(path.join(__dirname, 'services', 'authentication', 'routes')))
app.use('/api/v1/books', require(path.join(__dirname, 'services', 'books', 'routes')))
app.use('/api/v1/genres', require(path.join(__dirname, 'services', 'genres', 'routes')))
app.use('/api/v1/formats', require(path.join(__dirname, 'services', 'formats', 'routes')))
app.use('/api/v1/languages', require(path.join(__dirname, 'services', 'languages', 'routes')))
app.use('/api/v1/locations', require(path.join(__dirname, 'services', 'locations', 'routes')))
app.use('/api/v1/users', require(path.join(__dirname, 'services', 'users', 'routes')))



module.exports = server