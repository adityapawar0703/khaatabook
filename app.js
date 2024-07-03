const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config()
const userModel = require('./models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')


const db = require('./config/mongoose-connection')

app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.use(cookieParser())

const indexRouter = require('./routes/indexRouter')

app.use('/',indexRouter)






app.listen(3000)