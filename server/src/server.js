const path = require('path'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    express = require('express'),
    app = express();

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

module.exports = app

