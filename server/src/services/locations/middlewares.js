const path = require('path'),
    validator = require('validator'),
    mongoose = require('mongoose'),
    Country = require(path.join(__dirname, '..', '..', 'models', 'Countries')),
    State = require(path.join(__dirname, '..', '..', 'models', 'States')),
    handleResponse = require(path.join(__dirname, '..', '..', 'helpers', 'handleResponse'));

function isValidCurrentValue(req, res, next) {
    let current = req.query.current
    if(current) {
        if(!validator.isMongoId(current)) {
            return handleResponse.response(res, 400, null, 'El ID actual de tu localidad es invalido.')
        }
        res.locals.current_id = current
    }

    next()
}

async function isValidCountry(req, res, next) {
    try {
        const countryId = req.query.country

        if(!validator.isMongoId(countryId)) {
            return handleResponse.response(res, 400, null, 'El país seleccionado es invalido.')
        }
        const country = await Country.findOne({_id: mongoose.Types.ObjectId(countryId)})
        if(!country) {
            return handleResponse.response(res, 400, null, 'El país seleccionado es invalido.')
        }

        res.locals.country_id = countryId

        next()
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

async function isValidState(req, res, next) {
    try {
        console.log(req.query.state)
        const stateId = req.query.state

        if(!validator.isMongoId(stateId)) {
            return handleResponse.response(res, 400, null, 'El estado seleccionado es invalido.')
        }
        const state = await State.findOne({_id: mongoose.Types.ObjectId(stateId)})
        if(!state) {
            return handleResponse.response(res, 400, null, 'El estado seleccionado es invalido.')
        }

        res.locals.state_id = stateId

        next()
    } catch (error) {
        console.log(error)
        return handleResponse.response(res, 500, null)
    }
}

module.exports = {
    isValidCountry,
    isValidState,
    isValidCurrentValue
}