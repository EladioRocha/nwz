const path = require('path'),
    router = require('express').Router(),
    controller = require(path.join(__dirname, 'controllers')),
    middleware = require(path.join(__dirname, 'middlewares'));

router.get('/', middleware.validToken, controller.getData)

router.post('/register', [middleware.existUser, middleware.register], controller.register)
router.post('/login', middleware.login, controller.login)

module.exports = router