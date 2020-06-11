const AWS = require('aws-sdk')

function uploadFile(params) {
    return new Promise((resolve, reject) => {
        const s3 = new AWS.S3({ accessKeyId: process.env.ACCESS_KEY_ID, secretAccessKey: process.env.SECRET_ACCESS_KEY })
        s3.upload(params, function (err, data) {
            if (err) {
                console.log(err)
                reject(true)
            }
            resolve(data)
        });
    })
}

module.exports = uploadFile