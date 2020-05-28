const path = require('path'),
    router = require('express').Router(),
    controller = require(path.join(__dirname, 'controllers'));
    
router.get('/', controller.getAllGenres)

module.exports = router