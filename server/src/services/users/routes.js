const path = require('path'),
    router = require('express').Router(),
    controller = require(path.join(__dirname, 'controllers')),
    middlewareAuth = require(path.join(__dirname, '..', 'authentication', 'middlewares')),
    middleware = require(path.join(__dirname, 'middlewares'));
    
// router.get('/', controller.getAllGenres)

router.post('/record', [middlewareAuth.validToken, middleware.validBook, middleware.borrowedBook], controller.createRecord)

router.put('/record', [middlewareAuth.validToken, middleware.validBook, middleware.isFree], controller.breakFreeBook)

module.exports = router