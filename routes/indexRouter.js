const express = require('express');
const { LoginController, Auth } = require('../controllers/indexController');
const { createController } = require('../controllers/indexController');

const router = express.Router()


router.get('/',LoginController)
router.post('/login',Auth)


router.get('/createnew', createController)



module.exports = router