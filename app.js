const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config()
const userModel = require('./models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

var flash = require('connect-flash');
const expressSession = require("express-session");

const db = require('./config/mongoose-connection')

app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.use(cookieParser())

app.use(
    expressSession({
      resave: false,
      saveUninitialized: false,
      secret: "ajhsbcnjabsghjgcbjahkscbhjabkschja",
    })
  );
app.use(flash());

const indexRouter = require('./routes/indexRouter')
const hisaabRouter = require('./routes/hisaabRouter')


app.use('/',indexRouter)

app.use('/hisaab/',hisaabRouter)


app.listen(process.env.PORT||3000)