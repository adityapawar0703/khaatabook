const mongoose = require('mongoose')
const { type } = require('os')

// mongoose.connect("mongodb://127.0.0.1:27017/khatabook")

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        minlenght: 3,
        maxlength: 20,
        unique: true,
        trim: true,
        
    },
    name:{
        type: String,
        required: true,
        trim :true,
    },
    email:{
        type:String,
        unique:true,
        trim: true,
        lowercase: true,

    },
    password:{
        type: String,
        minlenght: 6,
        trim: true,
        required: true,
    },
    hisaabs:{
        type:Array,
        default: []
    }
})

module.exports = mongoose.model("user",userSchema)