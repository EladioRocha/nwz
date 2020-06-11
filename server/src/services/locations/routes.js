const path = require('path'),
    router = require('express').Router(),
    middlewareAuth = require(path.join(__dirname, '..', 'authentication', 'middlewares')),
    middleware = require(path.join(__dirname, 'middlewares')),
    controller = require(path.join(__dirname, 'controllers'));
    
router.get('/countries', [middlewareAuth.validToken, middleware.isValidCurrentValue], controller.getCountries)
router.get('/states', [middlewareAuth.validToken, middleware.isValidCountry, middleware.isValidCurrentValue], controller.getStates)
router.get('/cities', [middlewareAuth.validToken, middleware.isValidState, middleware.isValidCurrentValue], controller.getCities)

module.exports = router