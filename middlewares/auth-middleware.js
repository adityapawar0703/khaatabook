const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')




module.exports.IsloggedIn = async function (req, res, next) {
   if (req.cookies.token) {
      try {
         let decoded = await jwt.verify(req.cookies.token, process.env.JWT_KEY)
         let user = await userModel.findOne({email:decoded.email})
         req.user = user;
        
         next();
      }
      catch (err) {
         res.redirect('/')
      }


   } else {
      res.redirect('/')
   }


}


module.exports.redirectIfloggedIn = async function (req, res, next) {
   if (req.cookies.token) {
      try {
         let decoded = await jwt.verify(req.cookies.token, process.env.JWT_KEY)
         res.redirect('/profile'); 
      }
      catch (err) {
       return next();
      }
   }else{
      return next();
   }
}