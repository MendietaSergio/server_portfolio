var express = require('express');
var router = express.Router();

const {listProyects} = require('../controllers/apiController')
/* GET users listing. */
router.get('/proyects', listProyects);

module.exports = router;
