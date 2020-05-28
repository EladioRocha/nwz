const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI_DEV);
require(require('path').join(__dirname, 'server')).listen(process.env.PORT || process.env.PORT_DEV, () => console.log('SERVER WORKS', process.env.PORT || process.env.PORT_DEV))