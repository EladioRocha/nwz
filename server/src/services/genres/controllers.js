const path = require('path'),
    mongoose = require('mongoose'),
    Genre = require(path.join(__dirname, '..', '..', 'models', 'Genres')),
    handleResponse = require(path.join(__dirname, '..', '..', 'helpers', 'handleResponse'));

async function getAllGenres(req, res) {
    try {
        const genres = await Genre.find({}).select('name')
        return handleResponse.response(res, 200, genres)
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

module.exports = {
    getAllGenres
}