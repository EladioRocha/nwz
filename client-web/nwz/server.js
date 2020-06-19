const express = require('express'),
    path = require('path')

app = express()

// Replace the '/dist/<to_your_project_name>'
app.use(express.static(__dirname + '/dist/'));
app.use(express.static(__dirname + '/dist/nwz'));

app.get('*', function(req,res) {
  // Replace the '/dist/<to_your_project_name>/index.html'
  res.sendFile(path.join(__dirname + '/dist/nwz/index.html'));
})

app.listen(process.env.PORT || 8080)