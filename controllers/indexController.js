const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const userModel = require('../models/userModel')
const hisaabModel = require('../models/hisaabModel')
const jwt = require('jsonwebtoken')

const { setDriver } = require('mongoose')
// const { options } = require('../routes/indexRouter')

module.exports.LandingPageController = function(req,res){
    res.render("index",{loggedin:false});
}


module.exports.LoginController =async function(req,res){
    let {email, password} = req.body;
   let user = await  userModel.findOne({email}).select("+password");
   if(!user) return res.send('no such email')
  
  try{
    let result = await bcrypt.compare(password, user.password)

    if(!result) {
      // return res.send("wrong password")
      req.flash('error','wrong password')

      return res.send("wrong password")
    } 
   
     let token = await jwt.sign({id:user._id, email:user.email},process.env.JWT_KEY)
     res.cookie("token",token)
     req.flash('error','Loggedin Successfully')
     return res.redirect('/profile')
    //  res.redirect('/profile')
  }
  catch(err){
    res.send(err.message)
  }
    
}

module.exports.RegisterController =function(req,res){
    res.render("register",{loggedin:false})
}


module.exports.PostRegisterController =async function(req,res){
   let {username, email, name, password} = req.body;

  try{
    let user = await userModel.findOne({email})
  if(user) return res.send("already have an account pls login")

    let salt =await bcrypt.genSalt(10);
    let hashed =await bcrypt.hash(password, salt);
  user = await userModel.create({
        username,
        email,
        name,
        password:hashed,

    })

   let token = await jwt.sign({id: user._id, email:user.email},process.env.JWT_KEY)
   res.cookie("token",token)
   res.render("profile",{user})
  }
  catch(err){
    res.send(err.message);
  }

}


module.exports.LogoutController = function(req,res){
    res.cookie("token","")
    res.redirect('/');
}


module.exports.ProfileController =async function(req,res){
  let byDate = Number(req.query.byDate)
let {startDate , endDate} = req.query;
    byDate = byDate ? byDate : -1;
    startDate = startDate ? startDate : new Date("2004-03-07");
    endDate = endDate ? endDate : new Date();

 let user = await userModel.findOne({email:req.user.email}).populate({
  path:"hisaab",
  match:{createdAt :{$gte:startDate,$lte:endDate}},
  options: {sort: {createdAt: byDate }},
 })
 
  res.render("profile",{user})
}