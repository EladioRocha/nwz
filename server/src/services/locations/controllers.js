const path = require('path'),
    mongoose = require('mongoose'),
    Country = require(path.join(__dirname, '..', '..', 'models', 'Countries')),
    State = require(path.join(__dirname, '..', '..', 'models', 'States')),
    City = require(path.join(__dirname, '..', '..', 'models', 'Cities')),
    handleResponse = require(path.join(__dirname, '..', '..', 'helpers', 'handleResponse'));

async function getCountries(req, res) {
    try {
        const countries = await Country.find({_id: {
            $ne: mongoose.Types.ObjectId(res.locals.current_id)
        }}).select('name')
        return handleResponse.response(res, 200, countries)
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

async function getStates(req, res) {
    try {
        const country_id = mongoose.Types.ObjectId(res.locals.country_id)
        const states = await State.find({
            _id: {$ne: mongoose.Types.ObjectId(res.locals.current_id)},
            country_id
        }).select('name')
        return handleResponse.response(res, 200, states)
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

async function getCities(req, res) {
    try {
        const state_id = mongoose.Types.ObjectId(res.locals.state_id)
        const cities = await City.find({
            _id: {$ne: mongoose.Types.ObjectId(res.locals.current_id)},
            state_id
        }).select('name')
        return handleResponse.response(res, 200, cities)
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

module.exports = {
    getCountries,
    getStates,
    getCities
}