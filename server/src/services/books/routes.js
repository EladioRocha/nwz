const path = require('path'),
    router = require('express').Router(),
    controller = require(path.join(__dirname, 'controllers')),
    middleware = require(path.join(__dirname, 'middlewares'));

router.post('/', [middleware.validToken, middleware.validDataBook], controller.saveBook)
// router.post('/', middleware.login, controller.login)

module.exports = router