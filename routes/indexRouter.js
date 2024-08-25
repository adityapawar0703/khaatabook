const express = require('express');

const { LandingPageController, LoginController, RegisterController, LogoutController, PostRegisterController, ProfileController } = require('../controllers/indexController');
const { IsloggedIn, redirectIfloggedIn } = require('../middlewares/auth-middleware');
const router = express.Router()

router.get('/',redirectIfloggedIn,LandingPageController)
router.post('/login',LoginController)

router.get('/register',RegisterController)
router.post('/register',PostRegisterController)

router.get('/logout',LogoutController)

router.get('/profile',IsloggedIn,ProfileController)


module.exports = router;