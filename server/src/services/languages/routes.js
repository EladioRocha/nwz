const path = require('path'),
    router = require('express').Router(),
    controller = require(path.join(__dirname, 'controllers'));
    
router.get('/', controller.getAllLanguages)

module.exports = router