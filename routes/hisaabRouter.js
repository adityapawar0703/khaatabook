const express = require('express');
const { hisaabPageController, NewhisaabController, ViewHisaabController, DeleteHisaabController, EditHisaabController, PasscodeVerifyController, UpdateHisaabController } = require('../controllers/hisaabController');
const { IsloggedIn } = require('../middlewares/auth-middleware');
const router = express.Router()

router.get('/create',hisaabPageController)
router.post('/create',IsloggedIn,NewhisaabController)

router.get('/view/:id',IsloggedIn,ViewHisaabController)
router.post('/verify/:id',IsloggedIn,PasscodeVerifyController)


router.get('/delete/:id',IsloggedIn,DeleteHisaabController)
router.get('/edit/:id',IsloggedIn,EditHisaabController)
router.post('/updated',IsloggedIn,UpdateHisaabController)

module.exports = router;