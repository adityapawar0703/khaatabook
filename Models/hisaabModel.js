const mongoose = require('mongoose')

const hisaabSchema = mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:true,
        minlength:3,
        maxlength:100,
    },
    description:{
        type:String,
        trim:true,
        required:true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
    },
    editeable: {
        type:Boolean,
        default:false,

    },
    shareable:{
        type:Boolean,
        default:false,
    },
    encrypted:{
        type:Boolean,
        default:false,
            },
    passcode:{
        type:String,
        default:"",
    },
},
{  timestamps: true}
);

module.exports = mongoose.model("hisaab",hisaabSchema)