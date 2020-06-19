const express = require('express'),
    path = require('path')

app = express()

app.set(express.static(__dirname + '/dist/nwz'))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/nwz/index.html'))
})

app.listen(process.env.PORT || 8080)