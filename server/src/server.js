const path = require('path'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    express = require('express'),
    app = express();

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/api/v1/authentication', require(path.join(__dirname, 'services', 'authentication', 'routes')))
app.use('/api/v1/books', require(path.join(__dirname, 'services', 'books', 'routes')))
app.use('/api/v1/genres', require(path.join(__dirname, 'services', 'genres', 'routes')))

module.exports = app

