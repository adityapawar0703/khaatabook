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
         let user = await userModel.findOne({email: decoded.email})
         if(user){
           return res.redirect('/profile');
         }else{
            return res.redirect('/')
         }
         
      }
      catch (err) {
       return res.redirect('/')
      }
   }else{
      return next();
   }
}