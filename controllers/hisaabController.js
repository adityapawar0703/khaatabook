const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const userModel = require('../models/userModel')
const hisaabModel = require('../models/hisaabModel')
const jwt = require('jsonwebtoken')
const { setDriver } = require('mongoose')


module.exports.hisaabPageController = function(req,res){
  res.render("create")
}

module.exports.NewhisaabController =async function(req,res){
    let {title , description,encrypted, shareable,editeable,passcode} = req.body;
  encrypted = encrypted ==="on" ? true : false
  shareable= shareable ==="on" ? true : false
   editeable = editeable ==="on" ? true : false

 try{
    let hisaab = await  hisaabModel.create({
        title,
        description,
        editeable,
        shareable,
        encrypted,
        passcode,
        user:req.user._id,
    })
    
    let user = await userModel.findOne({email: req.user.email})
    user.hisaab.push(hisaab._id)
    await user.save()
    res.redirect('/profile');
 }
 catch(err){
   return res.send(err.message)
 }

}

module.exports.ViewHisaabController = async function(req,res){
try{
  let id = req.params.id;
  let user = req.user;
 let hisaab =await hisaabModel.findOne({_id:id})
 if(hisaab.encrypted){
  res.render("passcode",{id})
 }else{
  res.render("hisaab",{hisaab})
 }
}
catch(err){
  res.send(err.message)
}
 
}


module.exports.PasscodeVerifyController =async function(req,res){
try {
  let id = req.params.id;
  let password = req.body.passcode;
  var  user= req.user;
 var check =  user.hisaab.indexOf(id)
 if(check !== -1){
  let hisaab =await hisaabModel.findOne({_id:id})
  if(hisaab.passcode === password){
    res.render('hisaab',{hisaab})
  }else{
    res.send("wrong passcode")
  }
 }else{
res.send("not found ")
 }
} catch (error) {
  res.send(error.message)
}
}


module.exports.DeleteHisaabController =async function(req,res){
  let id = req.params.id;
  let user = req.user;
 let check = user.hisaab.indexOf(id)
 if(check !== -1){
  let hisaab = await hisaabModel.deleteOne({_id:req.params.id})
  res.redirect('/profile')
 }else{
  res.redirect('/profile')
 }

}

module.exports.EditHisaabController =async function(req,res){
  let hisaab = await hisaabModel.findOne({_id:req.params.id})
 res.render("edit-hisaab",{hisaab})
 }

 module.exports. UpdateHisaabController = async function(req,res){
 const id = req.params.id;

 const hisaab = await hisaabModel.findOne({_id:id})
   if(!hisaab){
    return res.redirect('/profile')
   }


  let {title , description,encrypted, shareable,editeable,passcode} = req.body;
  encrypted = encrypted ==="on" ? true : false
  shareable= shareable ==="on" ? true : false
   editeable = editeable ==="on" ? true : false
    
   hisaab.title = title,
   hisaab.description = description,
   hisaab.editeable = editeable,
   hisaab.shareable = shareable,
   hisaab.encrypted = encrypted,
   hisaab.passcode = passcode,
   await hisaab.save()
  
   res.redirect('/profile')
   
 }