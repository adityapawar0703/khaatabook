const mongoose = require('mongoose')
const { type } = require('os')

mongoose.connect("mongodb://127.0.0.1:27017/khatabook")

const userSchema = mongoose.Schema({
    username:String,
    name:String,
    email:String,
    password:String,
    hisaabs:{
        type:Array,
        default: []
    }
})

module.exports = mongoose.model("user",userSchema)