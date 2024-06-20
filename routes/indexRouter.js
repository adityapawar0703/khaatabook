const express = require('express');
const { LoginController } = require('../controllers/indexController');
const { createController } = require('../controllers/indexController');

const router = express.Router()


router.get('/login',LoginController)
router.get('/createnew', createController)



module.exports = router