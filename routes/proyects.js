var express = require('express');
var router = express.Router();
const {fileUpload} = require('../controllers/apiController')

const {listProyects,newProyects} = require('../controllers/apiController')
/* GET users listing. */
router.get('/proyects', listProyects);
router.post('/proyects', newProyects);

module.exports = router;
