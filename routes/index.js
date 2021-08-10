var express = require('express');
var router = express.Router();

const apiController = require('../controllers/apiController');
const indexController = require('../controllers/indexController');


/* GET home page. */
router.get('/',indexController.home);
router.post('/api/form', apiController.apiForm)

module.exports = router;
