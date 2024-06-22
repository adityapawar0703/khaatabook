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



module.exports.createpageController = function(req,res){
    res.render("create")
}

module.exports.create_newuser = async function(req,res){
    let {name,email, username,password} = req.body;
   let user = await userModel.findOne({username,email});
   if(user) return res.send("user already exist");

    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(password, salt , function(err, hash){
        user =  userModel.create({
                name,
                email,
                username,
                password:hash,
              })
        })
    })

    jwt.sign({username,email},"secretkey",function(err,token){
        if(err) return res.send("internal server error")
            res.cookie("token",token)
        res.send("created and loggedin")
    })
}

module.exports.LogoutController = function(req,res){
    res.cookie("token","")
    res.send("logout successfull")
}