const express = require('express');
const { LoginController, Auth, create_newuser, LogoutController } = require('../controllers/indexController');
const { createpageController } = require('../controllers/indexController');

const router = express.Router()


router.get('/',LoginController)
router.post('/login',Auth)


router.get('/createnew', createpageController)
router.post('/created',create_newuser)

router.get('/logout',LogoutController)

module.exports = router