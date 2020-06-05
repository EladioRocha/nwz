const path = require('path'),
    mongoose = require('mongoose'),
    Language = require(path.join(__dirname, '..', '..', 'models', 'Languages')),
    handleResponse = require(path.join(__dirname, '..', '..', 'helpers', 'handleResponse'));

async function getAllLanguages(req, res) {
    try {
        const language = await Language.find({}).select('name')
        return handleResponse.response(res, 200, language)
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

module.exports = {
    getAllLanguages
}