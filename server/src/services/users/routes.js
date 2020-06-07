const path = require('path'),
    router = require('express').Router(),
    controller = require(path.join(__dirname, 'controllers')),
    middlewareAuth = require(path.join(__dirname, '..', 'authentication', 'middlewares')),
    middleware = require(path.join(__dirname, 'middlewares'));
    
router.post('/record', [middlewareAuth.validToken, middleware.validBook, middleware.isValidDays, middleware.borrowedBook], controller.createRecord)
router.post('/report', [middlewareAuth.validToken, middleware.validBook, middleware.validReport], controller.createReport)
router.post('/chat', [middlewareAuth.validToken, middleware.validBook, middleware.isDifferentUser], controller.beginChat)

router.put('/record', [middlewareAuth.validToken, middleware.validBook, middleware.isFree], controller.breakFreeBook)

module.exports = router