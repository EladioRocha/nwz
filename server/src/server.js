const path = require('path'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cors = require('cors'),
    express = require('express'),
    app = express();

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}))

app.use('/api/v1/authentication', require(path.join(__dirname, 'services', 'authentication', 'routes')))
app.use('/api/v1/books', require(path.join(__dirname, 'services', 'books', 'routes')))
app.use('/api/v1/genres', require(path.join(__dirname, 'services', 'genres', 'routes')))
app.use('/api/v1/formats', require(path.join(__dirname, 'services', 'formats', 'routes')))
app.use('/api/v1/languages', require(path.join(__dirname, 'services', 'languages', 'routes')))
app.use('/api/v1/users', require(path.join(__dirname, 'services', 'users', 'routes')))


// TESTING XD
async function testAWS() {
    console.log('worksd')
    const AWS = require('aws-sdk')
    AWS.config.setPromisesDependency(require('bluebird'));
    const s3 = new AWS.S3({accessKeyId: 'AKIAXXZ6HFWWT6KRBH4J', secretAccessKey: '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'})
    s3.listBuckets({}, (err, data) => {
        if(err) throw err;
        console.log(data)
    })
    s3.listObjectsV2({Bucket: 'nwz-s3-files'}, (err, data) => {
        if(err) throw err
        console.log(data)
    })
    


    const userId = 1;
    const params = {
        Bucket: 'nwz-s3-files',
        Key: `images/${userId}.${type}`, // type is not required
        Body: base64Data,
        ContentEncoding: 'base64', // required
        ContentType: `image/${type}` // required. Notice the back ticks
      }
    
      let location = '';
      let key = '';
      try {
        const { Location, Key } = await s3.upload(params).promise();
        location = Location;
        key = Key;
      } catch (error) {
         console.log(error)
      }
      
    //   // Save the Location (url) to your database and Key if needs be.
    //   // As good developers, we should return the url and let other function do the saving to database etc
    //   console.log(location, key);
      
    //   return location;
      
    //   // To delete, see: https://gist.github.com/SylarRuby/b3b1430ca633bc5ffec29bbcdac2bd52
}

(async () => {
    // await testAWS()
})()



module.exports = app

