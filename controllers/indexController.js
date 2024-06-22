const userModel = require("../Models/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

module.exports.LoginController = function(req,res){
    res.render("loginpage")
}

module.exports.Auth =async function(req,res){
    let {email, password} = req.body;
   let user = await userModel.findOne({email})
   if(!user) return res.send("wrong email")

    bcrypt.compare(password, user.password, function(err,result){
        if(err) return res.send("error in line 13")
            if(!result) return res.send("wrong password")
               
                jwt.sign({id:user._id, email},"secretkey", function(err,token){
                    if(err)  return res.send("error in line 20")
                        res.cookie("token",token)
                       res.send("loggedin token generated")
                })
                
     })
}



module.exports.createController = function(req,res){
    res.render("create")
}
