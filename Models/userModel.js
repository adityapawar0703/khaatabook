const mongoose = require('mongoose')




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
    porfile_picture:{
        type:String,
        trim:true,
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
        select:false,
    },

    hisaab:[{type: mongoose.Schema.Types.ObjectId, ref: "hisaab"} ]

})

module.exports = mongoose.model("user",userSchema)