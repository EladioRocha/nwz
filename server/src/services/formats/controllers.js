const path = require('path'),
    mongoose = require('mongoose'),
    Format = require(path.join(__dirname, '..', '..', 'models', 'Formats')),
    handleResponse = require(path.join(__dirname, '..', '..', 'helpers', 'handleResponse'));

async function getAllFormats(req, res) {
    try {
        const format = await Format.find({}).select('name')
        return handleResponse.response(res, 200, format)
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

module.exports = {
    getAllFormats
}