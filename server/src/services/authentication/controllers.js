const path = require('path'),
    User = require(path.join(__dirname, '..', '..', 'models', 'Users')),
    binary = require('base64-arraybuffer'),
    AWS = require('aws-sdk'),
    handleResponse = require(path.join(__dirname, '..', '..', 'helpers', 'handleResponse'));

async function register(req, res) {
    try {
        await User.create(res.locals.data)
        return handleResponse.response(res, 200, null, 'Usuario registrado con exito.')
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

async function login(req, res) {
    try {
        const {_id, token} = res.locals.data
        await User.updateOne(
            {_id},
            {token}
        )

        res.locals.response.picture = `${process.env.API_URL_USER_PICTURES_BASE}/${res.locals.response.filename}.png`

        return handleResponse.response(res, 200, res.locals.response, 'Inicio de sesión exitoso.')
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

async function getData(req, res) {
    try {
        return handleResponse.response(res, 200, res.locals.data, 'Inicio de sesión exitoso.')
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

// async function getImage(filename, res) {
//     try {
//         return `data:image/png;base64,${arrayBufferToBase64(await getImageFromAWS(filename))}`
//     } catch (error) {
//         console.log(error)
//         return handleResponse.response(res, 500, null)
//     }
// }

// function getImageFromAWS(filename) {
//     return new Promise((resolve, reject) => {
//         try {
//             const s3 = new AWS.S3({accessKeyId: process.env.ACCESS_KEY_ID, secretAccessKey: process.env.SECRET_ACCESS_KEY})
//             s3.getObject({
//                 Bucket: process.env.BUCKET_NAME,
//                 Key: `images/pictures/${filename}`         
//             }, (err, data) => {
//                 if(err) {
//                     console.log(err)
//                     reject(true)
//                 }
//                 try {
//                     resolve(data.Body)
//                 } catch (error) {
//                     console.log(error)
//                     reject(true)
//                 }
//             })
//         } catch (error) {
//             console.log(error)
//             reject(true)
//         }
//     })
// }

// function arrayBufferToBase64(arrBuff) {
//     return binary.encode(arrBuff)
// }

module.exports = {
    register,
    login,
    getData
}