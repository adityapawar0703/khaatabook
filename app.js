const express = require('express')
const app = express()
const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const userModel = require('./Models/userModel')
const db = require('./config/mongoose-connection')

app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.use(cookieParser())

const indexRouter = require('./routes/indexRouter')

app.use('/',indexRouter)

// app.get('/test',(req,res)=>{
//     res.send("hello")
// })

// app.get('/testing',(req,res)=>{
//   bcrypt.genSalt(10, function(err,salt){
//     if(err) return res.send(err)
//         bcrypt.hash("123456789",salt, function(err,hash){
//             userModel.create({
//                 username:"aditya",
//                 name:"aditya",
//                 email:"abc@gmail.com",
//                password: hash,
//             }).then(function(){
//                 res.send("created")
//             })
//         })
//   }) 

// })

app.get('/test',(req,res)=>{
    res.render("create")
})

app.listen(process.env.PORT || 3000)